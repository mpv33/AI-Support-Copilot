'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { appNav, copilotHelp, questionGuides } from '../data/siteConfig'
import { useChatStore } from '../stores/chatStore'
import ThemeToggle from './ThemeToggle'

export default function ChatSidebar({ onNavigate }) {
  const pathname = usePathname()
  const status = useChatStore((s) => s.status)
  const submitQuestion = useChatStore((s) => s.submitQuestion)

  function handleAsk(prompt) {
    submitQuestion(prompt)
    onNavigate?.()
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-4 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={onNavigate}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            AI
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Support Copilot</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Support chat</p>
          </div>
        </Link>
        <ThemeToggle className="hidden lg:inline-flex" />
      </div>

      <nav className="border-b border-zinc-100 px-3 py-3 dark:border-zinc-800" aria-label="App">
        {appNav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`mb-0.5 block rounded-lg px-3 py-2 text-sm no-underline ${
                active
                  ? 'bg-brand-soft font-medium text-brand-dark dark:text-brand'
                  : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {copilotHelp.title}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{copilotHelp.intro}</p>

        <div className="mt-5 space-y-5">
          {questionGuides.map((group) => (
            <div key={group.id}>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">{group.title}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500">{group.hint}</p>
              <ul className="mt-2 space-y-1">
                {group.examples.map((ex) => (
                  <li key={ex.prompt}>
                    <button
                      type="button"
                      disabled={status === 'streaming'}
                      onClick={() => handleAsk(ex.prompt)}
                      className="w-full rounded-lg px-2 py-2 text-left text-xs text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{ex.label}</span>
                      <span className="mt-0.5 block line-clamp-2 text-[11px] text-zinc-500 dark:text-zinc-500">
                        {ex.prompt}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
        <ul className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-500">
          {copilotHelp.tips.map((tip) => (
            <li key={tip}>· {tip}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
