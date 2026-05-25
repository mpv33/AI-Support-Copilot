import { genAiPillars } from '../data/siteConfig'

export default function GenAICoverage() {
  return (
    <section id="capabilities" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Core Gen AI — built in
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Six engineering pillars. Every major concept production teams use for LLM
            applications — not a single API call.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {genAiPillars.map((pillar) => (
            <article
              key={pillar.id}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 transition hover:border-brand/30 hover:shadow-md hover:shadow-brand/5 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-brand/40"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{pillar.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {pillar.description}
              </p>

              <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Covers
                </p>
                <p className="mt-1 text-xs font-medium text-brand-dark dark:text-brand">
                  {pillar.concepts.join(' · ')}
                </p>
              </div>

              <ul className="mt-3 space-y-1">
                {pillar.features.map((f) => (
                  <li key={f} className="text-xs text-zinc-500 dark:text-zinc-500">
                    · {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
