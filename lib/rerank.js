/** Lightweight reranker: exact-token boost on top of hybrid scores. */

export function rerankChunks(chunks, { question }) {
  const upper = question.toUpperCase()

  return chunks
    .map((chunk) => {
      let boost = 0
      const haystack = `${chunk.title} ${chunk.text}`.toUpperCase()

      if (upper.includes('AUTH_403') && haystack.includes('AUTH_403')) boost += 0.08
      if (/order\s*\d+/i.test(question) && chunk.text.toLowerCase().includes('order'))
        boost += 0.04

      return {
        ...chunk,
        rerankBoost: boost,
        score: Number((chunk.score + boost).toFixed(4)),
      }
    })
    .sort((a, b) => b.score - a.score)
}
