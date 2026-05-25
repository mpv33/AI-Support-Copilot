import { EMBEDDING_MODEL, getOpenAI } from './openai'

export async function embedText(text) {
  const openai = getOpenAI()

  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
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
