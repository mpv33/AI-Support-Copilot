import { AGENT_STEPS, createAgentRun } from '../../../lib/agent'
import { retrieveSupportChunks } from '../../../lib/hybridRetrieval'
import { estimateContextUsage } from '../../../lib/llm'
import { CHAT_MODEL, assertOpenAiKey, getOpenAI } from '../../../lib/openai'
import {
  buildReActSystemPrompt,
  buildRetrievalQuery,
  buildSupportPrompt,
  normalizeChatHistory,
  publicSources,
  shouldAnswerFromRetrieval,
} from '../../../lib/prompt'
import { detectPromptInjection } from '../../../lib/security'
import { openAiTools, runToolCall } from '../../../lib/tools'
import { logAiEvent, measure } from '../../../lib/telemetry'

export const runtime = 'nodejs'

export async function POST(req) {
  assertOpenAiKey()
  const openai = getOpenAI()

  const startedAt = performance.now()
  const traceId = crypto.randomUUID()
  const { question, tenantId = 'interviewpro', retrievalMode = 'hybrid', history = [] } =
    await req.json()

  if (!question || typeof question !== 'string') {
    return Response.json({ error: 'question is required' }, { status: 400 })
  }

  const chatHistory = normalizeChatHistory(history)
  const retrievalQuery = buildRetrievalQuery(question, chatHistory)

  const agent = createAgentRun({ question, traceId })

  const injection = detectPromptInjection(question)
  agent.record(AGENT_STEPS.SECURITY, injection)

  if (injection.blocked) {
    return Response.json({
      answer: injection.reason,
      sources: [],
      blocked: true,
      traceId,
    })
  }

  const retrieval = await measure('retrieval', () =>
    retrieveSupportChunks({ question: retrievalQuery, tenantId, k: 5, mode: retrievalMode }),
  )

  if (!retrieval.ok) {
    return Response.json({ error: retrieval.error.message }, { status: 500 })
  }

  const chunks = retrieval.result
  agent.record(AGENT_STEPS.RETRIEVE, {
    mode: retrievalMode,
    chunkIds: chunks.map((c) => c.id),
    topScore: chunks[0]?.score,
  })

  const sources = publicSources(chunks)
  const guardrailPass = shouldAnswerFromRetrieval(chunks)
  agent.record(AGENT_STEPS.GUARDRAIL, { pass: guardrailPass })

  if (!guardrailPass) {
    return Response.json({
      answer: 'I could not find trusted support documentation for this question.',
      sources,
      traceId,
      agent: agent.toJSON(),
    })
  }

  const systemPrompt = buildReActSystemPrompt()
  const userPrompt = buildSupportPrompt({
    question,
    chunks,
    style: 'cot',
    hasHistory: chatHistory.length > 0,
  })
  const contextUsage = estimateContextUsage({
    system: systemPrompt,
    user: userPrompt,
    chunks,
    history: chatHistory,
  })

  let messages = [{ role: 'system', content: systemPrompt }, ...chatHistory, { role: 'user', content: userPrompt }]

  const planning = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    tools: openAiTools,
    tool_choice: 'auto',
    temperature: 0.1,
  })

  const assistantMessage = planning.choices[0]?.message
  agent.record(AGENT_STEPS.PLAN, {
    toolCalls: assistantMessage?.tool_calls?.map((t) => t.function?.name) ?? [],
  })

  if (assistantMessage?.tool_calls?.length) {
    messages.push(assistantMessage)

    for (const toolCall of assistantMessage.tool_calls) {
      const result = await runToolCall(toolCall)
      agent.record(AGENT_STEPS.TOOL, {
        name: toolCall.function?.name,
        result,
      })
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      })
    }
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'meta',
              traceId,
              retrievalMode,
              contextUsage,
              agentSteps: agent.steps,
            })}\n\n`,
          ),
        )

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'sources', sources })}\n\n`),
        )

        agent.record(AGENT_STEPS.ANSWER, { streaming: true })

        const response = await openai.chat.completions.create({
          model: CHAT_MODEL,
          messages,
          temperature: 0.35,
          stream: true,
        })

        for await (const part of response) {
          const token = part.choices[0]?.delta?.content
          if (!token) continue

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'token', token })}\n\n`),
          )
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()

        logAiEvent({
          event: 'support_copilot_request',
          traceId,
          tenantId,
          question,
          retrievalMode,
          estimatedTokens: contextUsage.estimatedTokens,
          retrievedChunkIds: chunks.map((chunk) => chunk.id),
          topScore: sources[0]?.score ?? null,
          agentSteps: agent.steps.length,
          latencyMs: Math.round(performance.now() - startedAt),
        })
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`,
          ),
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}
