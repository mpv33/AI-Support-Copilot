/** In-memory TTL cache — production would use Redis. */

const store = new Map()

export function cacheGet(key) {
  const entry = store.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return null
  }
  return entry.value
}

export function cacheSet(key, value, ttlMs = 1000 * 60 * 30) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}

export function cacheStats() {
  return { size: store.size }
}
