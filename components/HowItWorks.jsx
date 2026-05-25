import { howItWorksSteps } from '../data/siteConfig'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-zinc-200 py-16 dark:border-zinc-800 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">How it works</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            From question to grounded answer — every step runs on your backend, not in the
            browser.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item, index) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              {index < howItWorksSteps.length - 1 && (
                <span
                  className="absolute -right-3 top-8 hidden text-zinc-300 dark:text-zinc-600 lg:inline"
                  aria-hidden
                >
                  →
                </span>
              )}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {parseInt(item.step, 10)}
              </span>
              <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          Backend owns API keys · retrieval · prompts · tools · telemetry
        </div>
      </div>
    </section>
  )
}
