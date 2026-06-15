import {
  DEMO_GUEST_TOKEN_BUDGET,
  DEMO_TOKEN_LIMIT_MESSAGE,
  isDemoTokenBudgetExceeded,
  normalizeDemoTokenUsage,
} from '../demo/demoTokenLimit.js'

export function createDemoUsagePayload({ priorTokens, requestMeter }) {
  const inputTokens = requestMeter?.inputTokens ?? 0
  const outputTokens = requestMeter?.outputTokens ?? 0
  const requestTokens = inputTokens + outputTokens
  const sessionTokens = priorTokens + requestTokens

  return {
    requestTokens,
    inputTokens,
    outputTokens,
    sessionTokens,
    budget: DEMO_GUEST_TOKEN_BUDGET,
    remaining: Math.max(0, DEMO_GUEST_TOKEN_BUDGET - sessionTokens),
    exceeded: sessionTokens >= DEMO_GUEST_TOKEN_BUDGET,
  }
}

export function attachDemoTokenUsage(body, { priorTokens, requestMeter }) {
  return {
    ...body,
    demoTokenUsage: createDemoUsagePayload({ priorTokens, requestMeter }),
  }
}

export function rejectDemoIfBudgetExceeded(priorTokens) {
  if (!isDemoTokenBudgetExceeded(priorTokens)) return null
  return {
    answer: DEMO_TOKEN_LIMIT_MESSAGE,
    sources: [],
    demoTokenLimit: true,
    demoTokenUsage: {
      requestTokens: 0,
      inputTokens: 0,
      outputTokens: 0,
      sessionTokens: priorTokens,
      budget: DEMO_GUEST_TOKEN_BUDGET,
      remaining: 0,
      exceeded: true,
    },
  }
}

export { DEMO_GUEST_TOKEN_BUDGET, DEMO_TOKEN_LIMIT_MESSAGE, normalizeDemoTokenUsage }
