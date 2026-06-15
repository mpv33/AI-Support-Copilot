import Link from 'next/link'
import { landing } from '../../content/landing'

const { cta } = landing

export default function CtaSection() {
  return (
    <section className="bg-zinc-950 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">{cta.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{cta.body}</p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Link
            href={cta.primary.href}
            className="rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white no-underline transition hover:bg-brand-dark sm:inline-flex"
          >
            {cta.primary.label}
          </Link>
          <Link
            href={cta.secondary.href}
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 no-underline transition hover:border-zinc-600 hover:text-white sm:inline-flex"
          >
            {cta.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
