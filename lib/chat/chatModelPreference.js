import { DEFAULT_CHAT_MODEL, isAllowedChatModel, resolveChatModel } from '../ai/chatModels.js'

const STORAGE_KEY = 'asc-chat-model'

export function loadChatModelPreference() {
  if (typeof window === 'undefined') return DEFAULT_CHAT_MODEL
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return resolveChatModel(stored)
  } catch {
    return DEFAULT_CHAT_MODEL
  }
}

export function saveChatModelPreference(model) {
  if (typeof window === 'undefined' || !isAllowedChatModel(model)) return
  try {
    localStorage.setItem(STORAGE_KEY, model)
  } catch {
    /* ignore quota / private mode */
  }
}
