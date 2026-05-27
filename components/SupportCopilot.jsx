'use client'

import { useEffect, useRef } from 'react'
import { chatWelcome, supportAssistant } from '../data/chatGuide'
import { formatMessageMeta } from '../lib/chatMeta'
import { formatTokenCount } from '../lib/llm'
import { useChatStore } from '../stores/chatStore'
import ChatMarkdown from './ChatMarkdown'
import ChatWelcome from './ChatWelcome'

const statusStyles = {
  idle: 'bg-zinc-300 dark:bg-zinc-600',
  streaming: 'bg-brand animate-pulse',
  stopped: 'bg-amber-400',
  error: 'bg-red-500',
}

function MessageMetaFooter({ message }) {
  const meta = formatMessageMeta({
    contextUsage: message.meta?.contextUsage,
    replyContent: message.content,
    agentSteps: message.meta?.agentSteps,
    retrievalMode: message.meta?.retrievalMode,
  })

  if (!meta) return null

  const { tokens, steps } = meta
  const hasDetails =
    tokens.context != null || tokens.reply > 0 || steps.length > 0

  return (
    <div className="mt-4 flex items-center gap-1.5 border-t border-zinc-200/80 pt-3 dark:border-zinc-700/80">
      <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{meta.headline}</p>

      {hasDetails && (
        <div className="group relative">
          <button
            type="button"
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="View token usage and processing steps"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-3.25a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75ZM7.25 7.5a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-1.5 0V7.5Z" />
            </svg>
          </button>

          <div
            role="tooltip"
            className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-2 w-72 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white p-3 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {(tokens.context != null || tokens.reply > 0) && (
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400">
                <p className="mb-1.5 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                  Tokens (est.)
                </p>
                <ul className="space-y-0.5">
                  {tokens.context != null && (
                    <li className="flex justify-between gap-3">
                      <span>Read</span>
                      <span className="font-mono text-zinc-800 dark:text-zinc-200">
                        {formatTokenCount(tokens.context)}
                      </span>
                    </li>
                  )}
                  {tokens.reply > 0 && (
                    <li className="flex justify-between gap-3">
                      <span>Wrote</span>
                      <span className="font-mono text-zinc-800 dark:text-zinc-200">
                        {formatTokenCount(tokens.reply)}
                      </span>
                    </li>
                  )}
                  {tokens.total > 0 && (
                    <li className="flex justify-between gap-3 border-t border-zinc-100 pt-1 dark:border-zinc-800">
                      <span className="font-medium">Total</span>
                      <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                        {formatTokenCount(tokens.total)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {steps.length > 0 && (
              <div
                className={
                  tokens.context != null || tokens.reply > 0
                    ? 'mt-3 border-t border-zinc-100 pt-3 dark:border-zinc-800'
                    : ''
                }
              >
                <p className="mb-1.5 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                  Processing steps
                </p>
                <ol className="space-y-1">
                  {steps.map((step) => (
                    <li
                      key={step.id}
                      className="text-[10px] leading-relaxed text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {step.id}. {step.label}
                      </span>
                      {step.detail && <span className="text-zinc-500"> — {step.detail}</span>}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <p className="mt-2 text-[9px] leading-snug text-zinc-400 dark:text-zinc-500">
              {meta.tooltip}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function SourceChips({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="mt-4 border-t border-zinc-200/80 pt-3 dark:border-zinc-700/80">
      <p className="mb-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Sources</p>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <span
            key={source.id}
            className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] text-zinc-600 ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700"
            title={source.url || source.id}
          >
            {source.title || source.id.split(':')[0]}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SupportCopilot() {
  const messages = useChatStore((s) => s.messages)
  const question = useChatStore((s) => s.question)
  const status = useChatStore((s) => s.status)
  const error = useChatStore((s) => s.error)
  const setQuestion = useChatStore((s) => s.setQuestion)
  const submitQuestion = useChatStore((s) => s.submitQuestion)
  const stopGeneration = useChatStore((s) => s.stopGeneration)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'streaming' || !question.trim()) return
    await submitQuestion(question)
  }

  function handleKeyDown(event) {
    if (event.key !== 'Enter' || event.shiftKey) return
    event.preventDefault()
    if (status === 'streaming' || !question.trim()) return
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white dark:bg-zinc-900">
      <header className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800 lg:px-6">
        <div className="flex items-center gap-3">
          <span
            className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${statusStyles[status] || statusStyles.idle}`}
            title={status}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {supportAssistant.name}
              </span>
              <span className="text-xs text-zinc-400">· {supportAssistant.role}</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              InterviewPro.info support
              {status === 'streaming' ? ' · typing…' : ' · online'}
            </p>
          </div>
        </div>
        {status === 'streaming' && (
          <button
            type="button"
            onClick={stopGeneration}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Stop
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 lg:px-6">
          {messages.length === 0 && (
            <ChatWelcome
              disabled={status === 'streaming'}
              onAsk={(prompt) => submitQuestion(prompt)}
            />
          )}

          <div className="space-y-8">
            {messages.map((message, index) => {
              const isUser = message.role === 'user'

              if (isUser) {
                return (
                  <article key={index} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white dark:bg-brand">
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </article>
                )
              }

              return (
                <article key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                    {supportAssistant.name[0]}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {supportAssistant.name}
                    </p>

                    {message.content ? (
                      <ChatMarkdown content={message.content} />
                    ) : (
                      <p className="text-sm text-zinc-400 dark:text-zinc-500">
                        {supportAssistant.name} is typing
                        <span className="thinking-dot">.</span>
                        <span className="thinking-dot">.</span>
                        <span className="thinking-dot">.</span>
                      </p>
                    )}

                    <SourceChips sources={message.sources} />
                    {message.content && <MessageMetaFooter message={message} />}
                  </div>
                </article>
              )
            })}
          </div>

          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        className="shrink-0 border-t border-zinc-100 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 lg:px-6"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 hidden text-xs text-zinc-500 dark:text-zinc-400 lg:block">
            {chatWelcome.inputHint}
          </p>
          <div className="flex gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatWelcome.placeholder}
              rows={2}
              className="min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={status === 'streaming' || !question.trim()}
              className="self-end rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-40"
            >
              Send
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </form>
    </div>
  )
}
