/**
 * Generic HR keyword boosts for demo retrieval — optional, safe for any employer fork.
 */
export const rerankRules = [
  { question: /PTO|TIME OFF|VACATION|LEAVE|SICK/i, haystack: /pto|paid time off|sick leave|leave/i, boost: 0.06 },
  { question: /REMOTE|WFH|WORK FROM HOME|HYBRID/i, haystack: /remote|work from home|hybrid/i, boost: 0.06 },
  { question: /BENEFIT|INSURANCE|401K|HEALTH/i, haystack: /benefit|insurance|401k|health/i, boost: 0.06 },
  { question: /EXPENSE|REIMBURSE|RECEIPT/i, haystack: /expense|reimburs|receipt/i, boost: 0.06 },
  { question: /PASSWORD|IT SUPPORT|LAPTOP|VPN/i, haystack: /password|it support|laptop|vpn/i, boost: 0.06 },
  { question: /ONBOARD|NEW HIRE|DAY ONE/i, haystack: /onboard|new hire|day one/i, boost: 0.05 },
  { question: /HR HUB|ACME EXPENSE|INTERNAL TOOL/i, haystack: /hr hub|acme expense|internal tool/i, boost: 0.05 },
]

export function applyRerankRules(chunks, { question, skipRules = false }) {
  if (skipRules) {
    return [...chunks].sort((a, b) => b.score - a.score)
  }

  const upper = question.toUpperCase()

  return chunks
    .map((chunk) => {
      let boost = 0
      const haystack = `${chunk.title} ${chunk.text}`.toUpperCase()

      for (const rule of rerankRules) {
        const qMatch = rule.question instanceof RegExp ? rule.question.test(upper) : upper.includes(String(rule.question).toUpperCase())
        const hMatch = rule.haystack instanceof RegExp ? rule.haystack.test(haystack) : haystack.includes(String(rule.haystack).toUpperCase())
        if (qMatch && hMatch) boost += rule.boost
      }

      return {
        ...chunk,
        rerankBoost: boost,
        score: Number((chunk.score + boost).toFixed(4)),
      }
    })
    .sort((a, b) => b.score - a.score)
}
