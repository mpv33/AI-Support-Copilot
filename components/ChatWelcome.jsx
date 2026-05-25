'use client'

import { chatWelcome, quickStartPrompts } from '../data/chatGuide'

export default function ChatWelcome({ onAsk, disabled }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12 text-center">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{chatWelcome.title}</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{chatWelcome.body}</p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {quickStartPrompts.map((item) => (
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
    </div>
  )
}
