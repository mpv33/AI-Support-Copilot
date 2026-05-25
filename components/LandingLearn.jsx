import Link from 'next/link'
import { landingLearn } from '../data/siteConfig'

export default function LandingLearn() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 px-5 py-5 sm:flex-row sm:items-center sm:px-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{landingLearn.title}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{landingLearn.text}</p>
        </div>
        <Link
          href={landingLearn.href}
          className="shrink-0 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 no-underline transition hover:border-brand/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        >
          {landingLearn.cta} →
        </Link>
      </div>
    </section>
  )
}
