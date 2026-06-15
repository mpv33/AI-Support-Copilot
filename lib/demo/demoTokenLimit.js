/** Max OpenAI tokens per browser for unauthenticated demo chat (/chat). */
export const DEMO_GUEST_TOKEN_BUDGET = 100_000

export function normalizeDemoTokenUsage(value) {
  const raw = typeof value === 'object' && value != null ? value.totalTokens : value
  const n = Number(raw)
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : 0
}

export function isDemoTokenBudgetExceeded(used, budget = DEMO_GUEST_TOKEN_BUDGET) {
  return normalizeDemoTokenUsage(used) >= budget
}

export function getDemoTokenBudgetRemaining(used, budget = DEMO_GUEST_TOKEN_BUDGET) {
  return Math.max(0, budget - normalizeDemoTokenUsage(used))
}

export const DEMO_TOKEN_LIMIT_MESSAGE =
  'Free trial limit reached (100K tokens). This limit is tied to your device and network — clearing browser data will not reset it.'
