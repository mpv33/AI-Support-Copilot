import Link from 'next/link'
import { landingSkills } from '../data/siteConfig'

export default function CoreGenAIConcepts() {
  return (
    <section
      id="concepts"
      className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              Full Gen AI concept coverage
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Thirteen topics from LLM fundamentals to full-stack copilot architecture —
              each implemented with runnable code in this product.
            </p>
          </div>
          <Link
            href="/skills"
            className="shrink-0 text-sm font-medium text-brand no-underline hover:text-brand-dark"
          >
            Deep dive →
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {landingSkills.map((skill) => (
            <li
              key={skill.id}
              className="group rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-brand/40 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand/50"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand-dark dark:text-brand">
                  {skill.id}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 group-hover:text-brand-dark dark:text-zinc-100 dark:group-hover:text-brand">
                    {skill.name}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                    {skill.used}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
