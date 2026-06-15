import Link from 'next/link'
import { landing } from '../../content/landing'
import ChatPreview from './ChatPreview'

const { hero } = landing

export default function HeroSection() {
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
        <div className="mx-auto max-w-3xl pt-12 text-center sm:pt-16 lg:pt-20">
          <p className="inline-flex items-center rounded-full border border-brand/25 bg-brand/5 px-3.5 py-1 text-xs font-medium text-brand dark:bg-brand/10">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:mt-6 sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-brand bg-clip-text text-transparent dark:from-zinc-50 dark:via-zinc-100 dark:to-emerald-400">
              {hero.title}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-5 sm:text-base">
            {hero.headline}
          </p>

          <p className="mt-3 text-xs text-zinc-500 sm:text-sm">{hero.trustLine}</p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href={hero.ctaPrimary.href}
              className="rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-brand/20 transition hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 sm:inline-flex sm:justify-center"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="rounded-xl border border-zinc-200 bg-white px-7 py-3 text-sm font-semibold text-zinc-700 no-underline transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:inline-flex sm:justify-center"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            {hero.quickLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link key={link.href} href={link.href} className="no-underline transition hover:text-brand">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="no-underline transition hover:text-brand">
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:mt-12 sm:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-3 py-4 text-center dark:bg-zinc-950 sm:px-4 sm:py-5"
            >
              <dt className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">{stat.value}</dt>
              <dd className="mt-0.5 text-[10px] leading-snug text-zinc-500 sm:text-xs">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-10 max-w-lg pb-12 sm:mt-14 sm:pb-16 lg:max-w-md lg:pb-20">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-zinc-400">
            Live preview
          </p>
          <ChatPreview />
        </div>
      </div>
    </section>
  )
}
