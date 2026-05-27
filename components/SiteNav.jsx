'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { appNav } from '../data/siteConfig'
import ThemeToggle from './ThemeToggle'

export default function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            AI
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Support Copilot</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Product">
          {appNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm no-underline transition ${
                  active
                    ? 'font-medium text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/chat"
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white no-underline transition hover:bg-brand-dark sm:inline-block"
          >
            Open chat
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800 md:hidden">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Theme</span>
            <ThemeToggle />
          </div>
          {appNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm text-zinc-700 no-underline dark:text-zinc-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/chat"
            className="mt-2 block rounded-lg bg-brand py-2.5 text-center text-sm font-medium text-white no-underline"
            onClick={() => setOpen(false)}
          >
            Open chat
          </Link>
        </div>
      )}
    </header>
  )
}
