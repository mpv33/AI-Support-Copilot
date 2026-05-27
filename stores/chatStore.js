import { create } from 'zustand'
import { askCopilot } from '../lib/chatClient'
import { STARTER_MESSAGES, buildHistoryFromMessages } from '../lib/chatHistory'

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
      const idx = messages.length - 1
      if (idx < 0) return state

      const current = messages[idx]

      if (event.type === 'meta') {
        messages[idx] = {
          ...current,
          meta: {
            traceId: event.traceId,
            retrievalMode: event.retrievalMode,
            contextUsage: event.contextUsage,
            agentSteps: event.agentSteps,
          },
        }
      }

      if (event.type === 'sources') {
        messages[idx] = { ...messages[idx], sources: event.sources }
      }

      if (event.type === 'token') {
        messages[idx] = {
          ...messages[idx],
          content: (messages[idx].content || '') + event.token,
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

    const history = buildHistoryFromMessages(get().messages)

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
        history,
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
