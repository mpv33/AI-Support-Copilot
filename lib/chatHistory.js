import { supportAssistant } from '../data/chatGuide'

/** Extract completed user/assistant turns for multi-turn chat context. */

export const STARTER_MESSAGES = [
  {
    role: 'assistant',
    content: supportAssistant.greeting,
    sources: [],
  },
]

export function buildHistoryFromMessages(messages, maxTurns = 6) {
  const history = []

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    if (msg.role !== 'user') continue

    const next = messages[i + 1]
    if (next?.role === 'assistant' && next.content?.trim()) {
      history.push({ role: 'user', content: msg.content })
      history.push({ role: 'assistant', content: next.content })
    }
  }

  return history.slice(-maxTurns * 2)
}
