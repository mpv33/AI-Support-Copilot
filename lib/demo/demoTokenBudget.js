import {
  DEMO_GUEST_TOKEN_BUDGET,
  getDemoTokenBudgetRemaining,
  isDemoTokenBudgetExceeded,
  normalizeDemoTokenUsage,
} from './demoTokenLimit.js'

const STORAGE_KEY = 'demo-guest-token-usage'

function readRecord() {
  if (typeof window === 'undefined') return { totalTokens: 0 }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { totalTokens: 0 }
    const parsed = JSON.parse(raw)
    return { totalTokens: normalizeDemoTokenUsage(parsed?.totalTokens) }
  } catch {
    return { totalTokens: 0 }
  }
}

function writeRecord(totalTokens) {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      totalTokens: normalizeDemoTokenUsage(totalTokens),
      updatedAt: new Date().toISOString(),
    }),
  )
}

export function getDemoTokenUsage() {
  return readRecord().totalTokens
}

export function addDemoTokenUsage(delta) {
  const added = Math.max(0, Math.round(Number(delta) || 0))
  const next = getDemoTokenUsage() + added
  writeRecord(next)
  return next
}

export function isDemoGuestBudgetExceeded() {
  return isDemoTokenBudgetExceeded(getDemoTokenUsage())
}

export function getDemoGuestBudgetRemaining() {
  return getDemoTokenBudgetRemaining(getDemoTokenUsage())
}

export function getDemoGuestBudgetSnapshot() {
  const used = getDemoTokenUsage()
  return {
    used,
    budget: DEMO_GUEST_TOKEN_BUDGET,
    remaining: getDemoTokenBudgetRemaining(used),
    exceeded: isDemoTokenBudgetExceeded(used),
  }
}

export function applyDemoTokenUsageFromServer(payload) {
  if (!payload) return getDemoGuestBudgetSnapshot()

  if (typeof payload.sessionTokens === 'number') {
    writeRecord(payload.sessionTokens)
    return getDemoGuestBudgetSnapshot()
  }

  const requestTotal = normalizeDemoTokenUsage(payload.requestTokens ?? payload.totalTokens)
  if (requestTotal > 0) addDemoTokenUsage(requestTotal)
  return getDemoGuestBudgetSnapshot()
}
