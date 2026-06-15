import { applyRerankRules } from '../../platform/rerank.js'

/** Lightweight reranker: configurable keyword boosts on top of hybrid scores. */
export function rerankChunks(chunks, options) {
  return applyRerankRules(chunks, options)
}
