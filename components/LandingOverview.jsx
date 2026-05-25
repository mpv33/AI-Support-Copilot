import { landingOverview } from '../data/siteConfig'

export default function LandingOverview() {
  return (
    <section id="overview" className="scroll-mt-20 border-b border-zinc-200 py-12 dark:border-zinc-800 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {landingOverview.what}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">How to use</h2>
            <ol className="mt-3 space-y-3">
              {landingOverview.steps.map((step, i) => (
                <li key={step.title} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{step.title}</span>
                    <span className="text-zinc-500 dark:text-zinc-400"> — {step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Why it matters for Gen AI
            </h2>
            <ul className="mt-3 space-y-3">
              {landingOverview.why.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/80"
                >
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Flow:</span>
          {landingOverview.flow.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>→</span>}
              <span className="rounded-md border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                {step}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
