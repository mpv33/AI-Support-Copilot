'use client'

import { useLayoutEffect, useState } from 'react'
import { applyTheme, getStoredTheme, isDarkMode } from '../lib/core/theme'

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    applyTheme(getStoredTheme())
    setIsDark(isDarkMode())
    setReady(true)
  }, [])

  function toggle() {
    const next = isDarkMode() ? 'light' : 'dark'
    applyTheme(next)
    setIsDark(next === 'dark')
  }

  return (
    <button
      type="button"
      onClick={ready ? toggle : undefined}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {ready && isDark ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M21 14.5A8.5 8.5 0 1110 3.5a6.5 6.5 0 1011 11z" />
        </svg>
      )}
    </button>
  )
}
