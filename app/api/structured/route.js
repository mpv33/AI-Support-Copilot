import { retrieveSupportChunks } from '../../../lib/hybridRetrieval'
import { CHAT_MODEL, assertOpenAiKey, getOpenAI } from '../../../lib/openai'
import { buildSupportPrompt, shouldAnswerFromRetrieval } from '../../../lib/prompt'
import { detectPromptInjection } from '../../../lib/security'
import {
  parseSupportTicket,
  supportTicketJsonSchema,
} from '../../../lib/structuredOutput'
import { logAiEvent } from '../../../lib/telemetry'

export const runtime = 'nodejs'

export async function POST(req) {
  assertOpenAiKey()
  const openai = getOpenAI()
  const traceId = crypto.randomUUID()
  const startedAt = performance.now()

  const { question, tenantId = 'interviewpro' } = await req.json()

  if (!question || typeof question !== 'string') {
    return Response.json({ error: 'question is required' }, { status: 400 })
  }

  const injection = detectPromptInjection(question)
  if (injection.blocked) {
    return Response.json({ error: injection.reason, blocked: true }, { status: 400 })
  }

  const chunks = await retrieveSupportChunks({ question, tenantId, k: 4 })

  if (!shouldAnswerFromRetrieval(chunks)) {
    return Response.json({
      error: 'Insufficient retrieval confidence for structured summary.',
      traceId,
    }, { status: 422 })
  }

  const prompt = buildSupportPrompt({ question, chunks, style: 'cot' })

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'Summarize the support request as structured JSON. Use only provided context.',
      },
      { role: 'user', content: prompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: supportTicketJsonSchema,
    },
    temperature: 0.1,
  })

  const raw = completion.choices[0]?.message?.content || '{}'
  const ticket = parseSupportTicket(raw)

  logAiEvent({
    event: 'structured_output',
    traceId,
    question,
    latencyMs: Math.round(performance.now() - startedAt),
  })

  return Response.json({ traceId, ticket, citedChunks: chunks.map((c) => c.id) })
}
