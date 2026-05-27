'use client'

import Link from 'next/link'
import { sidebarCopy, sidebarExamples, supportAssistant } from '../data/chatGuide'
import { useChatStore } from '../stores/chatStore'
import ThemeToggle from './ThemeToggle'

export default function ChatSidebar({ onNavigate }) {
  const status = useChatStore((s) => s.status)
  const submitQuestion = useChatStore((s) => s.submitQuestion)

  function handleAsk(prompt) {
    submitQuestion(prompt)
    onNavigate?.()
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-3 py-3 dark:border-zinc-800">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 no-underline"
          onClick={onNavigate}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {supportAssistant.name[0]}
          </span>
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {supportAssistant.name} · Support
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{sidebarCopy.intro}</p>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {sidebarCopy.examplesTitle}
        </p>
        <ul className="mt-2 space-y-1">
          {sidebarExamples.map((ex) => (
            <li key={ex.prompt}>
              <button
                type="button"
                disabled={status === 'streaming'}
                onClick={() => handleAsk(ex.prompt)}
                className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {ex.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-zinc-100 px-3 py-3 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        {sidebarCopy.tip}
      </p>
    </aside>
  )
}
