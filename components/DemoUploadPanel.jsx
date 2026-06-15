'use client'

import { useRef, useState } from 'react'
import { ACCEPTED_EXTENSIONS } from '../lib/knowledge/documentTypes'
import { formatCompactTokenCount } from '../lib/ai/llm'
import { DEMO_GUEST_TOKEN_BUDGET } from '../lib/demo/demoTokenLimit.js'
import { MAX_DEMO_UPLOADS_PER_SESSION } from '../platform/demo/session.js'
import { addDemoDocument, listDemoDocumentsForUi, removeDemoDocument } from '../lib/demo/demoClient'
import { DEMO_TOKEN_LIMIT_MESSAGE } from '../lib/demo/demoTokenLimit.js'
import { useChatStore } from '../stores/chatStore'

const acceptAttr = ACCEPTED_EXTENSIONS.join(',')

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DemoUploadPanel() {
  const inputRef = useRef(null)
  const demoUploads = useChatStore((s) => s.demoUploads)
  const demoUploadStatus = useChatStore((s) => s.demoUploadStatus)
  const demoUploadError = useChatStore((s) => s.demoUploadError)
  const demoTokenBudget = useChatStore((s) => s.demoTokenBudget)
  const setDemoUploads = useChatStore((s) => s.setDemoUploads)
  const setDemoUploadStatus = useChatStore((s) => s.setDemoUploadStatus)
  const setDemoUploadError = useChatStore((s) => s.setDemoUploadError)
  const chatStatus = useChatStore((s) => s.status)

  const [dragOver, setDragOver] = useState(false)
  const atLimit = demoUploads.length >= MAX_DEMO_UPLOADS_PER_SESSION
  const busy = demoUploadStatus === 'uploading' || demoUploadStatus === 'deleting'
  const tokenExceeded = demoTokenBudget?.exceeded
  const tokenUsed = demoTokenBudget?.used ?? 0
  const tokenBudget = demoTokenBudget?.budget ?? DEMO_GUEST_TOKEN_BUDGET
  const tokenPct = tokenBudget > 0 ? Math.min(100, (tokenUsed / tokenBudget) * 100) : 0

  async function handleFiles(files) {
    if (!files?.length || atLimit) return
    setDemoUploadStatus('uploading')
    setDemoUploadError('')

    try {
      let current = listDemoDocumentsForUi()
      for (const file of files) {
        if (current.length >= MAX_DEMO_UPLOADS_PER_SESSION) break
        await addDemoDocument({ file })
        current = listDemoDocumentsForUi()
        setDemoUploads(current)
      }
      setDemoUploadStatus('idle')
    } catch (err) {
      setDemoUploadError(err.message)
      setDemoUploadStatus('error')
    }
  }

  function handleRemove(id) {
    setDemoUploadStatus('deleting')
    setDemoUploadError('')
    try {
      setDemoUploads(removeDemoDocument(id))
      setDemoUploadStatus('idle')
    } catch (err) {
      setDemoUploadError(err.message)
      setDemoUploadStatus('error')
    }
  }

  return (
    <div className="mb-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-700 dark:bg-zinc-800/40">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Upload
      </p>
      <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-400">
        Upload any file — PDF, text, JSON, and more. Chat with AI Support Copilot about it.
      </p>

      {demoTokenBudget && (
        <div className="mt-3 rounded-lg bg-white px-2.5 py-2 dark:bg-zinc-900">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Free trial tokens</span>
            <span
              className={`font-mono text-[11px] tabular-nums ${
                tokenExceeded
                  ? 'text-red-600 dark:text-red-400'
                  : tokenPct >= 80
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-zinc-700 dark:text-zinc-300'
              }`}
              title="OpenAI tokens used in this browser"
            >
              {formatCompactTokenCount(tokenUsed)} / {formatCompactTokenCount(tokenBudget)}
            </span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full transition-all ${
                tokenExceeded ? 'bg-red-500' : tokenPct >= 80 ? 'bg-amber-500' : 'bg-brand'
              }`}
              style={{ width: `${tokenPct}%` }}
            />
          </div>
          {tokenExceeded && (
            <p className="mt-2 text-[10px] leading-relaxed text-red-600 dark:text-red-400">
              {DEMO_TOKEN_LIMIT_MESSAGE}
            </p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        className="hidden"
        multiple
        disabled={busy || atLimit || chatStatus === 'streaming'}
        onChange={(e) => {
          handleFiles(Array.from(e.target.files || []))
          e.target.value = ''
        }}
      />

      <button
        type="button"
        disabled={busy || atLimit || chatStatus === 'streaming'}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(Array.from(e.dataTransfer.files || []))
        }}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
          dragOver
            ? 'border-brand bg-brand/5 text-brand'
            : 'border-zinc-200 bg-white text-zinc-700 hover:border-brand/40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300'
        } disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {busy ? 'Processing…' : atLimit ? 'Upload limit reached' : 'Upload file'}
      </button>

      <p className="mt-2 text-[10px] text-zinc-400">
        {demoUploads.length}/{MAX_DEMO_UPLOADS_PER_SESSION} files · max 5 MB each
      </p>

      {demoUploadError && (
        <p className="mt-2 text-[11px] text-red-600 dark:text-red-400">{demoUploadError}</p>
      )}

      {demoUploads.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {demoUploads.map((doc) => (
            <li
              key={doc.id}
              className="flex items-start justify-between gap-2 rounded-lg bg-white px-2.5 py-2 dark:bg-zinc-900"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">{doc.title}</p>
                <p className="text-[10px] text-zinc-400">{formatBytes(doc.sizeBytes || 0)}</p>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => handleRemove(doc.id)}
                className="shrink-0 text-[10px] font-medium text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
