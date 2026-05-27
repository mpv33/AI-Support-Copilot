import Link from 'next/link'
import { landingOverview } from '../data/siteConfig'

const { cta } = landingOverview

export default function ProductCTA() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-16 dark:bg-zinc-950 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgb(16_163_127/0.25),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{cta.title}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400">{cta.text}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/chat"
            className="rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
          >
            {cta.primary}
          </Link>
          <Link
            href={cta.secondaryHref}
            className="rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-3 text-sm font-semibold text-zinc-100 no-underline transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            {cta.secondary}
          </Link>
          <Link
            href={cta.tertiaryHref}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-zinc-400 no-underline transition hover:text-white"
          >
            {cta.tertiary}
          </Link>
        </div>
      </div>
    </section>
  )
}
