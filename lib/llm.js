/** LLM fundamentals helpers (token/context estimates for observability). */

export function estimateTokens(text) {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

export function estimateContextUsage({ system, user, chunks }) {
  const chunkText = chunks.map((c) => c.text).join('\n')
  const totalChars = (system?.length || 0) + (user?.length || 0) + chunkText.length

  return {
    estimatedTokens: estimateTokens(system) + estimateTokens(user) + estimateTokens(chunkText),
    chunkCount: chunks.length,
    approxChars: totalChars,
  }
}
