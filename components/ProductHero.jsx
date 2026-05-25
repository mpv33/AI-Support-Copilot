import Link from 'next/link'
import { heroCapabilities, heroStats } from '../data/siteConfig'

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(16_163_127/0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(16_163_127/0.2),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
        <p className="text-center text-sm font-medium text-brand">Enterprise support intelligence</p>

        <h1 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          The Gen AI copilot that{' '}
          <span className="text-brand">grounds every answer</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Support Copilot ships the core Generative AI stack in one product — hybrid RAG,
          agents, streaming UX, guardrails, evals, and a backend you control.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {heroCapabilities.map((cap) => (
            <span
              key={cap}
              className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-medium text-brand-dark dark:border-brand/30 dark:text-brand"
            >
              {cap}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/chat"
            className="rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white no-underline shadow-sm shadow-brand/20 transition hover:bg-brand-dark"
          >
            Open copilot
          </Link>
          <Link
            href="/#concepts"
            className="rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 no-underline transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
          >
            Explore Gen AI stack
          </Link>
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200/80 bg-white/80 px-4 py-4 text-center backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80"
            >
              <dt className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{stat.value}</dt>
              <dd className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
