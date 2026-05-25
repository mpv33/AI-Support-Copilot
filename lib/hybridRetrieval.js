import { bm25Score, buildBm25Index, normalizeScores } from './bm25'
import { cacheGet, cacheSet } from './cache'
import { cosineSimilarity, embedText } from './embeddings'
import { rerankChunks } from './rerank'
import { getVectorIndex } from './vectorStore'

const VECTOR_WEIGHT = 0.6
const BM25_WEIGHT = 0.4

export async function retrieveSupportChunks({
  question,
  tenantId,
  k = 5,
  mode = 'hybrid',
}) {
  const index = await getVectorIndex()
  const tenantChunks = index.filter((chunk) => chunk.tenantId === tenantId)

  if (!tenantChunks.length) return []

  const cacheKey = `emb:${tenantId}:${question}`
  let queryEmbedding = cacheGet(cacheKey)
  if (!queryEmbedding) {
    queryEmbedding = await embedText(question)
    cacheSet(cacheKey, queryEmbedding)
  }

  const bm25Index = buildBm25Index(tenantChunks)

  let scored = tenantChunks.map((chunk, i) => {
    const vectorScore = cosineSimilarity(queryEmbedding, chunk.embedding)
    const lexicalScore = bm25Score(question, bm25Index.docs[i], bm25Index)

    return {
      ...chunk,
      vectorScore,
      lexicalScore,
      retrievalMode: mode,
    }
  })

  if (mode === 'vector') {
    scored = scored.map((c) => ({ ...c, score: c.vectorScore }))
  } else if (mode === 'bm25') {
    scored = scored.map((c) => ({ ...c, score: c.lexicalScore }))
  } else {
    const withVector = normalizeScores(scored, 'vectorScore')
    const withBoth = normalizeScores(withVector, 'lexicalScore')
    scored = withBoth.map((c) => ({
      ...c,
      score:
        VECTOR_WEIGHT * c.vectorScoreNorm + BM25_WEIGHT * c.lexicalScoreNorm,
    }))
  }

  scored.sort((a, b) => b.score - a.score)
  const top = scored.slice(0, k * 2)
  return rerankChunks(top, { question }).slice(0, k)
}
