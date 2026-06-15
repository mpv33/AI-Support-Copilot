import { create } from 'zustand'
import { askCopilot } from '../lib/chat/chatClient'
import { getDemoDocumentsForChat, listDemoDocumentsForUi } from '../lib/demo/demoClient'
import { buildHistoryFromMessages, getStarterMessages } from '../lib/chat/chatHistory'
import {
  applyDemoTokenUsageFromServer,
  getDemoGuestBudgetSnapshot,
  isDemoGuestBudgetExceeded,
} from '../lib/demo/demoTokenBudget.js'
import { DEMO_TOKEN_LIMIT_MESSAGE } from '../lib/demo/demoTokenLimit.js'
import { recordClientUsage } from '../lib/core/clientUsageStore.js'
import { loadChatModelPreference, saveChatModelPreference } from '../lib/chat/chatModelPreference'
import { resolveChatModel } from '../lib/ai/chatModels'

async function persistUsageFromChat({ demoTokenUsage, traceId, model }) {
  if (!demoTokenUsage?.requestTokens) return
  await recordClientUsage({
    endpoint: 'chat',
    model: model || 'gpt-4o-mini',
    inputTokens: demoTokenUsage.inputTokens,
    outputTokens: demoTokenUsage.outputTokens,
    traceId,
  })
}

export const useChatStore = create((set, get) => ({
  messages: getStarterMessages({ demoMode: true }),
  question: '',
  chatModel: loadChatModelPreference(),
  demoUploads: [],
  demoUploadStatus: 'idle',
  demoUploadError: '',
  demoTokenBudget: null,
  status: 'idle',
  error: '',
  abortController: null,

  configureDemo: () => {
    set({
      demoUploads: listDemoDocumentsForUi(),
      messages: getStarterMessages({ demoMode: true }),
      question: '',
      status: 'idle',
      error: '',
      demoUploadError: '',
      demoTokenBudget: getDemoGuestBudgetSnapshot(),
    })
  },

  refreshDemoTokenBudget: () => set({ demoTokenBudget: getDemoGuestBudgetSnapshot() }),

  setDemoUploads: (demoUploads) => set({ demoUploads }),
  setDemoUploadStatus: (demoUploadStatus) => set({ demoUploadStatus }),
  setDemoUploadError: (demoUploadError) => set({ demoUploadError }),

  setQuestion: (question) => set({ question }),
  setChatModel: (chatModel) => {
    const resolved = resolveChatModel(chatModel)
    saveChatModelPreference(resolved)
    set({ chatModel: resolved })
  },
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
            chatModel: event.chatModel,
          },
        }
      }

      if (event.type === 'demoUsage') {
        const budget = applyDemoTokenUsageFromServer(event.demoTokenUsage)
        const meta = messages[idx]?.meta
        void persistUsageFromChat({
          demoTokenUsage: event.demoTokenUsage,
          traceId: meta?.traceId,
          model: meta?.chatModel,
        })
        return { messages, demoTokenBudget: budget }
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
    const { status, appendTurn, applyStreamEvent, setQuestion, setStatus, setError, clearError, chatModel } =
      get()

    if (!trimmed || status === 'streaming') return

    if (isDemoGuestBudgetExceeded()) {
      setError(DEMO_TOKEN_LIMIT_MESSAGE)
      setStatus('error')
      return
    }

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
      const result = await askCopilot({
        question: trimmed,
        history,
        model: chatModel,
        demoDocuments: getDemoDocumentsForChat(),
        demoTokenUsage: getDemoGuestBudgetSnapshot().used,
        signal: controller.signal,
        onEvent: applyStreamEvent,
      })
      if (result?.demoTokenUsage) {
        set({ demoTokenBudget: applyDemoTokenUsageFromServer(result.demoTokenUsage) })
        const last = get().messages.at(-1)
        await persistUsageFromChat({
          demoTokenUsage: result.demoTokenUsage,
          traceId: result.traceId || last?.meta?.traceId,
          model: result.chatModel || last?.meta?.chatModel || chatModel,
        })
      }
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
