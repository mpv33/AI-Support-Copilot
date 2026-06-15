'use client'

import { portalChatWelcome, portalExamples, portalAssistant } from '../platform/chat.js'

export default function ChatWelcome({
  onAsk,
  disabled,
  title,
  description,
  assistantInitial,
  quickStartPrompts,
}) {
  const displayTitle = title || portalChatWelcome.title
  const displayBody = description || portalChatWelcome.body
  const initial = assistantInitial || portalAssistant.name[0]
  const prompts = quickStartPrompts || portalExamples.slice(0, 4)

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-2 py-8 text-center sm:px-4 sm:py-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white">
        {initial}
      </div>
      <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{displayTitle}</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{displayBody}</p>

      {prompts.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {prompts.map((item) => (
            <button
              key={item.prompt}
              type="button"
              disabled={disabled}
              onClick={() => onAsk(item.prompt)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-brand/40 hover:bg-brand-soft/40 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
