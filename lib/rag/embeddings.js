import { EMBEDDING_MODEL, getOpenAI } from '../ai/openai'
import { logUsage } from '../core/telemetry'

export async function embedText(text, { tokenMeter } = {}) {
  const openai = getOpenAI()

  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  })

  const inputTokens = res.usage?.total_tokens ?? Math.ceil((text?.length || 0) / 4)
  if (tokenMeter) tokenMeter.inputTokens += inputTokens

  await logUsage({
    endpoint: 'embedding',
    model: EMBEDDING_MODEL,
    inputTokens,
    outputTokens: 0,
  })

  return res.data[0]?.embedding ?? []
}

export function cosineSimilarity(a, b) {
  if (a.length !== b.length) throw new Error('Vector dimensions must match')

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  if (normA === 0 || normB === 0) return 0
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}
