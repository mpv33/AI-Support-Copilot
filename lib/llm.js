/** LLM fundamentals helpers (token/context estimates for observability). */

export function estimateTokens(text) {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

export function formatTokenCount(n) {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString()
}

export function estimateReplyTokens(content) {
  return estimateTokens(content)
}

export function estimateContextUsage({ system, user, chunks, history = [] }) {
  const chunkText = chunks.map((c) => c.text).join('\n')
  const historyText = history.map((m) => m.content).join('\n')
  const totalChars =
    (system?.length || 0) + (user?.length || 0) + chunkText.length + historyText.length

  return {
    estimatedTokens:
      estimateTokens(system) +
      estimateTokens(user) +
      estimateTokens(chunkText) +
      estimateTokens(historyText),
    chunkCount: chunks.length,
    historyTurns: history.length,
    approxChars: totalChars,
  }
}
