import { supportDocs } from '../data/supportDocs'
import { chunkByParagraph } from './chunking'
import { cosineSimilarity, embedText } from './embeddings'

let vectorIndex = null

export async function rebuildVectorIndex() {
  const chunks = supportDocs.flatMap((doc) => chunkByParagraph(doc))

  vectorIndex = await Promise.all(
    chunks.map(async (chunk) => ({
      ...chunk,
      embedding: await embedText(chunk.text),
      indexVersion: 'support-v1',
      createdAt: new Date().toISOString(),
    })),
  )

  return vectorIndex
}

export async function getVectorIndex() {
  if (!vectorIndex) {
    await rebuildVectorIndex()
  }

  return vectorIndex
}

export async function retrieveSupportChunks({ question, tenantId, k = 5 }) {
  const [queryEmbedding, index] = await Promise.all([
    embedText(question),
    getVectorIndex(),
  ])

  return index
    .filter((chunk) => chunk.tenantId === tenantId)
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}
