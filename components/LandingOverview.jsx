import Link from 'next/link'
import { landingOverview } from '../data/siteConfig'
import LandingSectionHeader from './LandingSectionHeader'

const layerStyles = {
  Client: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900',
  Server: 'bg-brand/10 text-brand ring-brand/20 dark:bg-brand/15 dark:text-emerald-300 dark:ring-brand/30',
}

const featureIcons = [
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
]

export default function LandingOverview() {
  const {
    features,
    technology,
    genAiTopicsSection,
    pipelineTitle,
    pipelineSubtitle,
    pipeline,
    topics,
    demoExamples,
    demoSection,
  } = landingOverview

  return (
    <>
      {/* Why trust it */}
      <section
        id="features"
        className="scroll-mt-20 border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <LandingSectionHeader
            eyebrow={features.eyebrow}
            title={features.title}
            subtitle={features.subtitle}
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.items.map((item, i) => (
              <li
                key={item.title}
                className="group rounded-2xl border border-zinc-200/80 bg-white p-5 transition hover:border-brand/30 hover:shadow-md hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand/25 dark:hover:shadow-none"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white dark:bg-brand/15">
                  {featureIcons[i]}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chat flow */}
      <section id="chat-flow" className="scroll-mt-20 border-b border-zinc-200 py-16 dark:border-zinc-800 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <LandingSectionHeader title={pipelineTitle} subtitle={pipelineSubtitle} />

          <div className="mt-10 hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner sm:block">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[11px] text-zinc-500">request flow</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-300">
              {`You (/chat)  →  POST { question, history }
       ↓
/api/chat     →  Security · Hybrid RAG · Guardrail · ReAct + tools
       ↓
OpenAI SSE    →  Markdown reply · source chips · token info on hover`}
            </pre>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((item, i) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${layerStyles[item.layer] || layerStyles.Server}`}
                  >
                    {item.layer}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.step}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.detail}
                </p>
                <p className="mt-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                  {item.tech}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link
              href="/chat"
              className="inline-flex rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-brand/20 transition hover:bg-brand-dark"
            >
              Try the live chat flow
            </Link>
          </div>
        </div>
      </section>

      {/* Try asking — engagement */}
      <section
        id="try-asking"
        className="scroll-mt-20 border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <LandingSectionHeader
                align="left"
                eyebrow={demoSection.eyebrow}
                title={demoSection.title}
                subtitle={demoSection.subtitle}
              />
              <ul className="mt-8 space-y-2.5">
                {demoExamples.map((item) => (
                  <li key={item.prompt}>
                    <Link
                      href="/chat"
                      className="group flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm no-underline transition hover:border-brand/40 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand/30"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </span>
                      <span className="text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                        {item.prompt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 lg:mt-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {topics.title}
              </h3>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {topics.items.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                href="/support"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand no-underline hover:underline"
              >
                Browse Help Center
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology stack */}
      <section id="technology" className="scroll-mt-20 border-b border-zinc-200 py-16 dark:border-zinc-800 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <LandingSectionHeader title={technology.title} subtitle={technology.subtitle} />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {technology.groups.map((group) => (
              <div
                key={group.name}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">
                  {group.name}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name} className="border-l-2 border-zinc-100 pl-3 dark:border-zinc-800">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {item.role}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Architecture diagrams and code paths in{' '}
            <Link href="/docs" className="font-semibold text-brand no-underline hover:underline">
              Technical guide
            </Link>
          </p>
        </div>
      </section>

      {/* Gen AI topics */}
      <section
        id="gen-ai-topics"
        className="scroll-mt-20 border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <LandingSectionHeader
            eyebrow="Gen AI curriculum"
            title={genAiTopicsSection.title}
            subtitle={genAiTopicsSection.subtitle}
          >
            <Link
              href="/docs"
              className="shrink-0 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-brand no-underline transition hover:border-brand/30 dark:border-zinc-700 dark:bg-zinc-950"
            >
              Full guide →
            </Link>
          </LandingSectionHeader>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {genAiTopicsSection.topics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/docs#topic-${topic.id}`}
                  className="group flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 no-underline transition hover:border-brand/40 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-emerald-600 text-xs font-bold text-white shadow-sm">
                    {topic.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 group-hover:text-brand dark:text-zinc-100">
                      {topic.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {topic.summary}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
