const STORAGE_KEY = 'demo-session-id'

export function getOrCreateDemoSessionId() {
  if (typeof window === 'undefined') return null

  let id = localStorage.getItem(STORAGE_KEY)
  if (id && /^[0-9a-f-]{36}$/i.test(id)) return id

  id = crypto.randomUUID()
  localStorage.setItem(STORAGE_KEY, id)
  return id
}
