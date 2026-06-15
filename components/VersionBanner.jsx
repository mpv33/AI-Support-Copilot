'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { versionBanner } from '../content/versionBanner'

const storageKey = (version) => `version-banner-dismissed-${version}`

function RoadmapDialog({ open, onClose }) {
  const { roadmap } = versionBanner

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-zinc-900/20 backdrop-blur-sm dark:bg-black/50"
        aria-label="Close"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="roadmap-title"
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Upcoming · {roadmap.nextVersion}
            </p>
            <h2 id="roadmap-title" className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {roadmap.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <p className="px-5 pt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{roadmap.intro}</p>

        <ul className="space-y-3 px-5 py-4">
          {roadmap.items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-zinc-100 bg-zinc-50/80 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.detail}</p>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/30">
          <span className="font-mono text-xs text-zinc-400">v{versionBanner.version} live</span>
          <Link
            href={versionBanner.docsHref}
            onClick={onClose}
            className="cursor-pointer text-xs font-medium text-brand no-underline hover:underline"
          >
            {versionBanner.docsLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VersionBanner() {
  const [visible, setVisible] = useState(false)
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const closeRoadmap = useCallback(() => setRoadmapOpen(false), [])

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(storageKey(versionBanner.version)) !== '1')
    } catch {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    try {
      localStorage.setItem(storageKey(versionBanner.version), '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
    setRoadmapOpen(false)
  }

  if (!visible) return null

  const { banner } = versionBanner

  return (
    <>
      <div className="relative z-[60] border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex h-10 max-w-6xl items-center px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setRoadmapOpen(true)}
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 text-xs text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-expanded={roadmapOpen}
          >
            <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
              v{versionBanner.version}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              |
            </span>
            <span>{banner.label}</span>
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              ·
            </span>
            <span className="font-medium text-brand">{banner.action}</span>
          </button>

          <button
            type="button"
            onClick={dismiss}
            className="ml-2 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Dismiss"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <RoadmapDialog open={roadmapOpen} onClose={closeRoadmap} />
    </>
  )
}
