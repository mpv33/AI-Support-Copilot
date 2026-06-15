import { getChatContext } from '../../platform/chat.js'

export function getStarterMessages({ demoMode = false, portalMode = false } = {}) {
  const { assistant } = getChatContext({ demoMode, portalMode })
  return [{ role: 'assistant', content: assistant.greeting, sources: [] }]
}

export function buildHistoryFromMessages(messages) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim() }))
}
