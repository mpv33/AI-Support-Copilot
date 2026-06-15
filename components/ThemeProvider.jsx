'use client'

import { useLayoutEffect } from 'react'
import { applyTheme, getStoredTheme, THEME_STORAGE_KEY } from '../lib/core/theme'

export default function ThemeProvider({ children }) {
  useLayoutEffect(() => {
    applyTheme(getStoredTheme())

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (!stored || stored === 'system') {
        applyTheme('system')
      }
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [])

  return children
}
