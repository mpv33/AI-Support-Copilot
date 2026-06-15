'use client'

import Link from 'next/link'
import { getChatContext, buildDemoExamplesFromDocuments } from '../platform/chat.js'
import { getDemoDocumentsForChat } from '../lib/demo/demoClient'
import { getDemoWorkspace } from '../platform/demo/index.js'
import { useChatStore } from '../stores/chatStore'
import DemoUploadPanel from './DemoUploadPanel'
import ThemeToggle from './ThemeToggle'

export default function ChatSidebar({ onNavigate }) {
  const status = useChatStore((s) => s.status)
  const demoUploads = useChatStore((s) => s.demoUploads)
  const demoTokenBudget = useChatStore((s) => s.demoTokenBudget)
  const submitQuestion = useChatStore((s) => s.submitQuestion)

  const demoTokenExceeded = Boolean(demoTokenBudget?.exceeded)

  const demoExampleList =
    demoUploads.length > 0 ? buildDemoExamplesFromDocuments(getDemoDocumentsForChat()) : null

  const ctx = getChatContext({
    demoMode: true,
    hasUploads: demoUploads.length > 0,
    demoExampleList,
  })

  const displayName = getDemoWorkspace().name

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
            {displayName[0]}
          </span>
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {displayName}
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <span className="mb-3 inline-flex w-fit rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand">
          Free trial · No account required
        </span>
        <DemoUploadPanel />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{ctx.sidebarCopy.intro}</p>

        {ctx.examples.length > 0 && (
          <>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {ctx.sidebarCopy.examplesTitle}
            </p>
            <ul className="mt-2 space-y-1">
              {ctx.examples.map((ex) => (
                <li key={ex.prompt}>
                  <button
                    type="button"
                    disabled={status === 'streaming' || demoTokenExceeded}
                    onClick={() => handleAsk(ex.prompt)}
                    className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {ex.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="border-t border-zinc-100 px-3 py-3 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        {ctx.sidebarCopy.tip}
        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/" className="font-medium text-brand no-underline hover:underline">
            Home
          </Link>
          <Link href="/usage" className="font-medium text-brand no-underline hover:underline">
            Usage
          </Link>
          <Link href="/docs" className="font-medium text-brand no-underline hover:underline">
            Guide
          </Link>
        </span>
      </p>
    </aside>
  )
}
