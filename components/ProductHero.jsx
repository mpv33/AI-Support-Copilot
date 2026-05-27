import Link from 'next/link'
import { interviewProBrand, landingOverview } from '../data/siteConfig'
import LandingChatPreview from './LandingChatPreview'

const { hero } = landingOverview

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgb(16_163_127/0.14),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgb(16_163_127/0.2),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pt-16 text-center sm:pt-20 lg:pt-24">
          <p className="inline-flex items-center rounded-full border border-brand/25 bg-brand/5 px-3.5 py-1 text-xs font-medium text-brand dark:bg-brand/10">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl sm:leading-[1.12] lg:text-[3.35rem]">
            {hero.title}
            <br />
            <span className="bg-gradient-to-r from-brand to-emerald-600 bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {hero.tagline}
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            Built for{' '}
            <a
              href="https://www.interviewpro.info/"
              className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-2 transition hover:text-brand dark:text-zinc-300 dark:decoration-zinc-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {interviewProBrand.name}
            </a>
            <span className="mx-2 text-zinc-300">·</span>
            <span className="text-zinc-400">{interviewProBrand.tagline}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/chat"
              className="rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-brand/20 transition hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25"
            >
              {hero.ctaPrimary}
            </Link>
            <Link
              href={hero.ctaSecondaryHref}
              className="rounded-xl border border-zinc-200 bg-white px-7 py-3 text-sm font-semibold text-zinc-700 no-underline transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <a href="#features" className="no-underline transition hover:text-brand">
              Why trust it
            </a>
            <a href="#chat-flow" className="no-underline transition hover:text-brand">
              How chat works
            </a>
            <a href="#try-asking" className="no-underline transition hover:text-brand">
              Try a question
            </a>
            <Link href="/docs" className="no-underline transition hover:text-brand">
              Technical guide
            </Link>
          </div>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-4 py-4 text-center dark:bg-zinc-950 sm:py-5"
            >
              <dt className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 sm:text-xl">
                {stat.value}
              </dt>
              <dd className="mt-0.5 text-[11px] leading-snug text-zinc-500 sm:text-xs">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-14 max-w-lg pb-16 sm:pb-20 lg:max-w-md lg:pb-24">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-zinc-400">
            Live preview
          </p>
          <LandingChatPreview />
        </div>
      </div>
    </section>
  )
}
