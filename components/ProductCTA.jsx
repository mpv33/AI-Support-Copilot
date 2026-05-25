import Link from 'next/link'

export default function ProductCTA() {
  return (
    <section className="border-t border-zinc-800 bg-zinc-900 py-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-lg font-medium text-white">Try it now — examples ready in chat.</p>
        <Link
          href="/chat"
          className="mt-5 inline-block rounded-lg bg-brand px-7 py-3 text-sm font-medium text-white no-underline hover:bg-brand-dark"
        >
          Open copilot
        </Link>
      </div>
    </section>
  )
}
