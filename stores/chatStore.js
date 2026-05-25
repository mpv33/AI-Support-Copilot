import { create } from 'zustand'
import { askCopilot } from '../lib/chatClient'

export const STARTER_MESSAGES = [
  {
    role: 'assistant',
    content:
      'Hi! Pick a suggested question from the sidebar, or type your own about refunds, errors, or orders.',
    sources: [],
  },
]

export const useChatStore = create((set, get) => ({
  messages: STARTER_MESSAGES,
  question: '',
  status: 'idle',
  error: '',
  abortController: null,

  setQuestion: (question) => set({ question }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: '' }),

  appendTurn: (userMessage, assistantMessage) =>
    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
    })),

  applyStreamEvent: (event) =>
    set((state) => {
      const messages = [...state.messages]
      const last = messages[messages.length - 1]
      if (!last) return state

      if (event.type === 'meta') {
        messages[messages.length - 1] = {
          ...last,
          meta: {
            traceId: event.traceId,
            retrievalMode: event.retrievalMode,
            contextUsage: event.contextUsage,
          },
        }
      }

      if (event.type === 'sources') {
        messages[messages.length - 1] = { ...last, sources: event.sources }
      }

      if (event.type === 'token') {
        messages[messages.length - 1] = {
          ...last,
          content: last.content + event.token,
        }
      }

      return { messages }
    }),

  stopGeneration: () => {
    get().abortController?.abort()
  },

  submitQuestion: async (text) => {
    const trimmed = text.trim()
    const { status, appendTurn, applyStreamEvent, setQuestion, setStatus, setError, clearError } =
      get()

    if (!trimmed || status === 'streaming') return

    const userMessage = { role: 'user', content: trimmed, sources: [] }
    const assistantMessage = { role: 'assistant', content: '', sources: [] }

    appendTurn(userMessage, assistantMessage)
    setQuestion('')
    setStatus('streaming')
    clearError()

    const controller = new AbortController()
    set({ abortController: controller })

    try {
      await askCopilot({
        question: trimmed,
        signal: controller.signal,
        onEvent: applyStreamEvent,
      })
      setStatus('idle')
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('stopped')
        return
      }
      setError(err.message)
      setStatus('error')
    } finally {
      set({ abortController: null })
    }
  },
}))
