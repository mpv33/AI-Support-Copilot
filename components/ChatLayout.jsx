'use client'

import { useState } from 'react'
import ChatSidebar from './ChatSidebar'
import ThemeToggle from './ThemeToggle'

export default function ChatLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <div className="hidden w-72 shrink-0 lg:block">
        <ChatSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 dark:bg-black/70"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative h-full w-[min(100%,280px)] shadow-xl">
            <ChatSidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              aria-label="Open question guide"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Support Copilot</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
