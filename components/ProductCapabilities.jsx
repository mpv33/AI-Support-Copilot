import { productCapabilities } from '../data/siteConfig'

export default function ProductCapabilities() {
  return (
    <section className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            What makes it production-grade
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Patterns you would ship at scale — demonstrated end-to-end in Support Copilot.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productCapabilities.map((item, i) => (
            <article
              key={item.title}
              className={`rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800 ${
                i === 0
                  ? 'border-brand/20 bg-brand-soft/50 dark:border-brand/30 dark:bg-brand/10 sm:col-span-2 lg:col-span-1'
                  : 'bg-white dark:bg-zinc-950'
              }`}
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
