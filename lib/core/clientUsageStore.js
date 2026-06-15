import { aggregateUsageEntries } from './usageAggregate.js'
import { calculateCost, DEFAULT_USD_TO_INR, getModelPricing, MODEL_PRICING } from './pricing.js'

const DB_NAME = 'ai-support-copilot-usage'
const DB_VERSION = 1
const STORE = 'usage_entries'

function openDb() {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB is not available'))
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE)) {
        const objectStore = db.createObjectStore(STORE, { keyPath: 'id' })
        objectStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

async function withStore(mode, fn) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const store = tx.objectStore(STORE)
    const result = fn(store)
    tx.oncomplete = () => resolve(result)
    tx.onerror = () => reject(tx.error)
  })
}

async function listAllEntries() {
  return withStore('readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  })
}

function filterByDays(entries, days) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return entries
    .filter((e) => new Date(e.timestamp).getTime() >= cutoff)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export async function recordClientUsage({
  endpoint,
  model,
  inputTokens = 0,
  outputTokens = 0,
  traceId,
  latencyMs,
  meta = {},
}) {
  const input = Math.max(0, Math.round(inputTokens))
  const output = Math.max(0, Math.round(outputTokens))
  if (input === 0 && output === 0) return null

  const cost = calculateCost({ inputTokens: input, outputTokens: output, model })
  const entry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    endpoint,
    model: model || 'unknown',
    inputTokens: input,
    outputTokens: output,
    totalTokens: input + output,
    costUsd: Number(cost.usd.toFixed(6)),
    costInr: Number(cost.inr.toFixed(4)),
    traceId: traceId || null,
    latencyMs: latencyMs ?? null,
    meta,
  }

  await withStore('readwrite', (store) => {
    store.put(entry)
  })

  return entry
}

export async function getClientUsageDashboard({ days = 30 } = {}) {
  const all = await listAllEntries()
  const entries = filterByDays(all, days)
  const { totals, byEndpoint, byModel, byDay } = aggregateUsageEntries(entries)

  const dailySeries = Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, stats]) => ({ date, ...stats }))

  const endpointBreakdown = Object.entries(byEndpoint)
    .map(([endpoint, stats]) => ({ endpoint, ...stats }))
    .sort((a, b) => b.costUsd - a.costUsd)

  const modelBreakdown = Object.entries(byModel)
    .map(([model, stats]) => ({
      model,
      ...stats,
      pricing: getModelPricing(model),
    }))
    .sort((a, b) => b.costUsd - a.costUsd)

  return {
    periodDays: days,
    usdToInr: DEFAULT_USD_TO_INR,
    storage: 'indexeddb',
    totals: {
      ...totals,
      costUsd: Number(totals.costUsd.toFixed(4)),
      costInr: Number(totals.costInr.toFixed(2)),
    },
    byEndpoint: endpointBreakdown,
    byModel: modelBreakdown,
    dailySeries,
    recent: entries.slice(0, 25),
    pricingTable: MODEL_PRICING,
  }
}

export async function clearClientUsage() {
  await withStore('readwrite', (store) => {
    store.clear()
  })
}
