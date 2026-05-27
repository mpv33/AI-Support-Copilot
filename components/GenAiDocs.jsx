'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { docsMeta, genAiTopics } from '../data/skillsMatrix'

const topicMap = Object.fromEntries(genAiTopics.map((t) => [t.id, t]))

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'request-flow', label: 'Request flow' },
  { id: 'api', label: 'API reference' },
  ...docsMeta.topicGroups.map((g) => ({ id: `group-${g.id}`, label: g.label })),
  { id: 'try-it', label: 'Try it' },
]

export default function GenAiDocs() {
  const {
    title,
    subtitle,
    stack,
    howToRead,
    architecture,
    bigPicture,
    topicGroups,
    endpoints,
    demoPrompts,
    commands,
  } = docsMeta

  const [activeId, setActiveId] = useState('overview')

  useEffect(() => {
    const headings = navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pb-20 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
      {/* Sidebar TOC */}
      <aside className="hidden lg:block">
        <nav className="sticky top-20 space-y-1" aria-label="On this page">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">On this page</p>
          {navSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block rounded-md px-2 py-1.5 text-sm no-underline transition ${
                activeId === item.id
                  ? 'bg-brand/10 font-medium text-brand'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <Link href="/chat" className="block text-sm font-medium text-brand no-underline hover:underline">
              Open chat →
            </Link>
            <Link href="/support" className="block text-sm text-zinc-600 no-underline hover:text-brand dark:text-zinc-400">
              Help Center →
            </Link>
          </div>
        </nav>
      </aside>

      <div className="min-w-0">
        {/* Header */}
        <header id="overview" className="scroll-mt-24 border-b border-zinc-200 pb-10 dark:border-zinc-800">
          <p className="text-sm font-medium text-brand">AI Support Copilot</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Reading guide</p>
            <ul className="mt-2 space-y-1">
              {howToRead.map((line) => (
                <li key={line} className="text-sm text-zinc-600 dark:text-zinc-400">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile jump links */}
          <nav className="mt-6 flex flex-wrap gap-2 lg:hidden" aria-label="Jump to section">
            {navSections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 no-underline dark:border-zinc-700 dark:text-zinc-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        {/* Architecture */}
        <section id="architecture" className="scroll-mt-24 mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{architecture.title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Four layers — client, API, retrieval, and trust — with OpenAI calls only on the server.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {architecture.layers.map((layer) => (
              <article
                key={layer.name}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{layer.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{layer.detail}</p>
                <ul className="mt-3 space-y-1">
                  {layer.files.map((file) => (
                    <li key={file}>
                      <code className="font-mono text-[11px] text-brand">{file}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Request flow */}
        <section id="request-flow" className="scroll-mt-24 mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{bigPicture.title}</h2>
          <ol className="mt-6 space-y-0">
            {bigPicture.steps.map((step, i) => (
              <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                {i < bigPicture.steps.length - 1 && (
                  <span
                    className="absolute left-[11px] top-7 h-full w-px bg-zinc-200 dark:bg-zinc-800"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step}</p>
              </li>
            ))}
          </ol>

          <pre className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300 dark:border-zinc-800">
            {`Browser (/chat)
  │  POST /api/chat { question, history }
  ▼
Security check → Hybrid RAG → Guardrail
  │                      │
  │                      ├─ low score → refuse
  ▼                      ▼
ReAct + tools ──► OpenAI stream (SSE)
  │
  ▼
UI: tokens + source chips`}
          </pre>
        </section>

        {/* API */}
        <section id="api" className="scroll-mt-24 mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">API reference</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Server routes called by the chat UI and dev tooling.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">Method</th>
                  <th className="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">Path</th>
                  <th className="hidden px-4 py-2.5 font-medium text-zinc-700 sm:table-cell dark:text-zinc-300">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                {endpoints.map((ep) => (
                  <tr key={ep.path}>
                    <td className="px-4 py-3">
                      <code className="rounded bg-brand/10 px-1.5 py-0.5 font-mono text-xs text-brand">
                        {ep.method}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-800 dark:text-zinc-200">{ep.path}</td>
                    <td className="hidden px-4 py-3 text-zinc-600 sm:table-cell dark:text-zinc-400">
                      {ep.simple}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Topics by group */}
        {topicGroups.map((group) => (
          <section key={group.id} id={`group-${group.id}`} className="scroll-mt-24 mt-14">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{group.label}</h2>
            <div className="mt-6 space-y-6">
              {group.topics.map((topicId) => {
                const topic = topicMap[topicId]
                if (!topic) return null

                return (
                  <article
                    key={topic.id}
                    id={`topic-${topic.id}`}
                    className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-xs font-bold text-white">
                        {topic.id}
                      </span>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{topic.topic}</h3>
                    </div>

                    <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">What it is</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {topic.simpleWhat}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">In this app</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {topic.usedHere}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800 sm:px-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Flow</p>
                      <ul className="mt-2 space-y-1.5">
                        {topic.steps.map((step) => (
                          <li key={step} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="text-brand">→</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800 sm:px-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Key files</p>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                        {topic.code.map((file) => (
                          <li
                            key={file.path}
                            className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
                          >
                            <code className="font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200">
                              {file.path}
                            </code>
                            <p className="mt-0.5 text-xs text-zinc-500">{file.note}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}

        {/* Try it */}
        <section id="try-it" className="scroll-mt-24 mt-14 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Try it</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Validate retrieval, tools, and guardrails in{' '}
            <Link href="/chat" className="font-medium text-brand no-underline hover:underline">
              Chat
            </Link>
            .
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ul className="space-y-2">
              {demoPrompts.map((item) => (
                <li
                  key={item.label}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <p className="text-xs font-semibold text-brand">{item.label}</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">&ldquo;{item.prompt}&rdquo;</p>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              {commands.map((item) => (
                <div
                  key={item.cmd}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</p>
                  <code className="mt-1 block font-mono text-xs text-zinc-600 dark:text-zinc-400">{item.cmd}</code>
                </div>
              ))}
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Re-index after editing{' '}
                <code className="font-mono text-zinc-600 dark:text-zinc-300">data/supportDocs.js</code>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
