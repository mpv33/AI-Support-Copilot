/** Lightweight BM25 lexical scorer for hybrid search demos. */

export function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9_]+/g) || []).filter(Boolean)
}

export function buildBm25Index(chunks) {
  const docs = chunks.map((chunk) =>
    tokenize(`${chunk.title} ${chunk.text}`),
  )
  const N = docs.length || 1
  const df = new Map()

  for (const doc of docs) {
    for (const term of new Set(doc)) {
      df.set(term, (df.get(term) || 0) + 1)
    }
  }

  const avgdl = docs.reduce((sum, doc) => sum + doc.length, 0) / N || 1

  return { docs, df, N, avgdl }
}

export function bm25Score(query, docTokens, index, k1 = 1.5, b = 0.75) {
  const terms = tokenize(query)
  let score = 0

  for (const term of terms) {
    const tf = docTokens.filter((t) => t === term).length
    if (!tf) continue

    const docFreq = index.df.get(term) || 0
    const idf = Math.log(1 + (index.N - docFreq + 0.5) / (docFreq + 0.5))
    const denom = tf + k1 * (1 - b + (b * docTokens.length) / index.avgdl)
    score += idf * ((tf * (k1 + 1)) / denom)
  }

  return score
}

export function normalizeScores(items, key) {
  const values = items.map((item) => item[key])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min

  if (span === 0) {
    return items.map((item) => ({
      ...item,
      [`${key}Norm`]: item[key],
    }))
  }

  return items.map((item) => ({
    ...item,
    [`${key}Norm`]: (item[key] - min) / span,
  }))
}
