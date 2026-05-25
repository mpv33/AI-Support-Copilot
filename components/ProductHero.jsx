import Link from 'next/link'

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(16_163_127/0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(16_163_127/0.2),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          AI support that{' '}
          <span className="text-brand">cites your docs</span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Ask a question. Get a grounded answer. Explore how real Gen AI products are built.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/chat"
            className="rounded-lg bg-brand px-6 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-brand-dark"
          >
            Try copilot
          </Link>
          <Link
            href="/#overview"
            className="rounded-lg border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-800 no-underline transition hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-200"
          >
            Overview
          </Link>
        </div>
      </div>
    </section>
  )
}
