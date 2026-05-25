'use client'

import { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/chatStore'

const statusStyles = {
  idle: 'bg-zinc-300 dark:bg-zinc-600',
  streaming: 'bg-brand animate-pulse',
  stopped: 'bg-amber-400',
  error: 'bg-red-500',
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
    await submitQuestion(question)
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white dark:bg-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800 lg:px-6">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${statusStyles[status] || statusStyles.idle}`}
            title={status}
          />
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Copilot</span>
          <span className="hidden text-xs text-zinc-400 sm:inline">
            — answers from your support knowledge base
          </span>
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

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 lg:px-6">
        {messages.map((message, index) => (
          <article
            key={index}
            className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                message.role === 'assistant'
                  ? 'bg-brand text-white'
                  : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
              }`}
            >
              {message.role === 'assistant' ? 'AI' : 'U'}
            </div>
            <div className={`min-w-0 max-w-[85%] lg:max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-zinc-900 text-white dark:bg-brand dark:text-white'
                    : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                }`}
              >
                {message.content || (
                  <span className="text-zinc-400 dark:text-zinc-500">
                    Thinking
                    <span className="thinking-dot">.</span>
                    <span className="thinking-dot">.</span>
                    <span className="thinking-dot">.</span>
                  </span>
                )}

                {message.sources?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {message.sources.map((source) => (
                      <span
                        key={source.id}
                        className="rounded-md bg-white/80 px-2 py-0.5 text-[11px] text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-400 dark:ring-zinc-700"
                        title={source.url}
                      >
                        {source.id.split(':')[0]} · {source.score}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="border-t border-zinc-100 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 lg:px-6"
        onSubmit={handleSubmit}
      >
        <p className="mb-2 hidden text-xs text-zinc-500 dark:text-zinc-400 lg:block">
          Type your question — or choose an example from the sidebar.
        </p>
        <div className="mx-auto flex max-w-3xl gap-2">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about refunds, AUTH_403, order status…"
            rows={2}
            className="min-h-[48px] flex-1 resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:ring-1 focus:ring-brand/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={status === 'streaming' || !question.trim()}
            className="self-end rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-40"
          >
            Send
          </button>
        </div>
        {error && (
          <p className="mx-auto mt-2 max-w-3xl text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </form>
    </div>
  )
}
