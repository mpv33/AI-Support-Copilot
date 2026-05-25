import Link from 'next/link'

export default function ProductCTA() {
  return (
    <section className="border-t border-zinc-800 bg-zinc-900 py-16 dark:bg-zinc-950 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          See every concept in action
        </h2>
        <p className="mt-4 text-zinc-400">
          Open the copilot chat. Example questions in the sidebar — hybrid retrieval,
          streaming, tools, and citations included.
        </p>
        <Link
          href="/chat"
          className="mt-8 inline-block rounded-lg bg-brand px-8 py-3.5 text-sm font-medium text-white no-underline transition hover:bg-brand-dark"
        >
          Launch Support Copilot
        </Link>
      </div>
    </section>
  )
}
