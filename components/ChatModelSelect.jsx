'use client'

import { CHAT_MODEL_OPTIONS } from '../lib/ai/chatModels'
import { useChatStore } from '../stores/chatStore'

export default function ChatModelSelect({ compact = false }) {
  const chatModel = useChatStore((s) => s.chatModel)
  const setChatModel = useChatStore((s) => s.setChatModel)
  const status = useChatStore((s) => s.status)
  const disabled = status === 'streaming'

  const selected = CHAT_MODEL_OPTIONS.find((o) => o.id === chatModel)

  return (
    <label
      className={`flex items-center gap-2 ${compact ? '' : 'rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-800/50'}`}
    >
      <span className="sr-only">Chat model</span>
      {!compact && (
        <span className="shrink-0 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Model</span>
      )}
      <select
        value={chatModel}
        disabled={disabled}
        onChange={(e) => setChatModel(e.target.value)}
        title={selected?.hint}
        className={`max-w-[11rem] cursor-pointer truncate bg-transparent text-xs font-medium text-zinc-800 outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-200 sm:max-w-[13rem] ${
          compact ? 'rounded-md border border-zinc-200 px-2 py-1 dark:border-zinc-700' : ''
        }`}
      >
        {CHAT_MODEL_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
