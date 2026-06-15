import { AGENT_STEPS, createAgentRun } from '../ai/agent.js'
import { estimateContextUsage, estimateTokens } from '../ai/llm.js'
import { assertOpenAiKey, getOpenAI } from '../ai/openai.js'
import { resolveChatModel } from '../ai/chatModels.js'
import {
  buildReActSystemPrompt,
  buildRetrievalQuery,
  buildSupportPrompt,
  normalizeChatHistory,
  publicSources,
  shouldAnswerFromRetrieval,
} from '../ai/prompt.js'
import { detectPromptInjection } from '../core/security.js'
import { isDemoEnabled } from '../../platform/demo/index.js'
import { retrieveDemoChunks, validateDemoDocuments } from '../demo/demoRetrieval.js'
import {
  attachDemoTokenUsage,
  createDemoUsagePayload,
  DEMO_GUEST_TOKEN_BUDGET,
  normalizeDemoTokenUsage,
  rejectDemoIfBudgetExceeded,
} from './demoTokenBudget.js'
import { getAgentTools, runToolCall } from '../../platform/tools.js'
import { logAiEvent, measure } from '../core/telemetry.js'

function sseLine(payload) {
  return `data: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}\n\n`
}

export async function handleDemoChat(request) {
  assertOpenAiKey()
  const openai = getOpenAI()

  const body = await request.json()
  const {
    question,
    demoDocuments,
    demoTokenUsage,
    model: requestedModel,
    retrievalMode = 'hybrid',
    history = [],
  } = body

  const chatModel = resolveChatModel(requestedModel)
  const startedAt = performance.now()
  const traceId = crypto.randomUUID()
  const requestMeter = { inputTokens: 0, outputTokens: 0 }

  if (!question || typeof question !== 'string') {
    return Response.json({ error: 'question is required' }, { status: 400 })
  }

  if (!isDemoEnabled()) {
    return Response.json({ error: 'Demo is disabled.' }, { status: 400 })
  }

  const priorDemoTokens = normalizeDemoTokenUsage(demoTokenUsage)
  const budgetReject = rejectDemoIfBudgetExceeded(priorDemoTokens)
  if (budgetReject) {
    return Response.json({
      ...budgetReject,
      traceId,
      agent: createAgentRun({ question, traceId }).toJSON(),
    })
  }

  const demoCheck = validateDemoDocuments(demoDocuments)
  if (!demoCheck.ok) {
    return Response.json({
      answer: `${demoCheck.error} Upload a PDF, text, or JSON in the sidebar first.`,
      sources: [],
      traceId,
      agent: createAgentRun({ question, traceId }).toJSON(),
    })
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
    retrieveDemoChunks({
      documents: demoCheck.documents,
      question: retrievalQuery,
      k: 5,
      mode: retrievalMode,
      tokenMeter: requestMeter,
    }),
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
  const guardrailPass = shouldAnswerFromRetrieval(chunks, 0.12)
  agent.record(AGENT_STEPS.GUARDRAIL, { pass: guardrailPass })

  if (!guardrailPass) {
    const noDocs = chunks.length === 0
    return Response.json(
      attachDemoTokenUsage(
        {
          answer: noDocs
            ? 'I could not find anything in your uploaded file(s) for this question. Try rephrasing or ask about specific content in your document.'
            : 'I could not find a confident answer in your uploaded file(s). Try asking about specific content from that document.',
          sources,
          traceId,
          agent: agent.toJSON(),
        },
        { priorTokens: priorDemoTokens, requestMeter },
      ),
    )
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
    model: chatModel,
    messages,
    tools: getAgentTools(),
    tool_choice: 'auto',
    temperature: 0.1,
  })

  requestMeter.inputTokens += planning.usage?.prompt_tokens ?? estimateTokens(JSON.stringify(messages))
  requestMeter.outputTokens += planning.usage?.completion_tokens ?? 0

  const assistantMessage = planning.choices[0]?.message
  agent.record(AGENT_STEPS.PLAN, {
    toolCalls: assistantMessage?.tool_calls?.map((t) => t.function?.name) ?? [],
  })

  if (assistantMessage?.tool_calls?.length) {
    messages.push(assistantMessage)
    for (const toolCall of assistantMessage.tool_calls) {
      const result = await runToolCall(toolCall)
      agent.record(AGENT_STEPS.TOOL, { name: toolCall.function?.name, result })
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      })
    }
  }

  if (priorDemoTokens + requestMeter.inputTokens + requestMeter.outputTokens >= DEMO_GUEST_TOKEN_BUDGET) {
    return Response.json(
      attachDemoTokenUsage(
        {
          answer: 'Free trial limit reached during this request.',
          sources,
          traceId,
          agent: agent.toJSON(),
          demoTokenLimit: true,
        },
        { priorTokens: priorDemoTokens, requestMeter },
      ),
    )
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      const write = (payload) => controller.enqueue(encoder.encode(sseLine(payload)))

      try {
        write({
          type: 'meta',
          traceId,
          retrievalMode,
          contextUsage,
          agentSteps: agent.steps,
          chatModel,
        })
        write({ type: 'sources', sources })

        agent.record(AGENT_STEPS.ANSWER, { streaming: true })

        let streamUsage = null
        let replyText = ''

        const response = await openai.chat.completions.create({
          model: chatModel,
          messages,
          temperature: 0.35,
          stream: true,
          stream_options: { include_usage: true },
        })

        for await (const part of response) {
          const token = part.choices[0]?.delta?.content
          if (token) {
            replyText += token
            write({ type: 'token', token })
          }
          if (part.usage) streamUsage = part.usage
        }

        requestMeter.inputTokens += streamUsage?.prompt_tokens ?? estimateTokens(JSON.stringify(messages))
        requestMeter.outputTokens += streamUsage?.completion_tokens ?? estimateTokens(replyText)

        write({
          type: 'demoUsage',
          demoTokenUsage: createDemoUsagePayload({
            priorTokens: priorDemoTokens,
            requestMeter,
          }),
        })

        write('[DONE]')

        const latencyMs = Math.round(performance.now() - startedAt)
        logAiEvent({
          event: 'demo_chat_request',
          traceId,
          question,
          retrievalMode,
          estimatedTokens: contextUsage.estimatedTokens,
          inputTokens: streamUsage?.prompt_tokens,
          outputTokens: streamUsage?.completion_tokens,
          retrievedChunkIds: chunks.map((chunk) => chunk.id),
          topScore: sources[0]?.score ?? null,
          agentSteps: agent.steps.length,
          latencyMs,
        })
      } catch (error) {
        console.error('[chat]', error)
        write({ type: 'error', message: error.message || 'Chat failed' })
      } finally {
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
