import Link from 'next/link'
import { landing } from '../../content/landing'
import { cardBodyClass, cardClass, cardTitleClass, sectionClass } from './landingStyles'
import SectionHeader from './SectionHeader'

const { flow } = landing

export default function FlowSection() {
  return (
    <section id="how-it-works" className={sectionClass}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader eyebrow={flow.eyebrow} title={flow.title} subtitle={flow.subtitle} />

        <ol className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {flow.steps.map((item, i) => (
            <li key={item.step} className={cardClass}>
              <span className="text-xs font-medium text-zinc-400">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`mt-2 ${cardTitleClass}`}>{item.title}</h3>
              <p className={cardBodyClass}>{item.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 sm:grid-cols-1 sm:max-w-md">
          <article className={cardClass}>
            <p className="text-xs font-medium text-zinc-400">{flow.paths.demo.label}</p>
            <h3 className={`mt-1 ${cardTitleClass}`}>{flow.paths.demo.title}</h3>
            <ul className="mt-3 space-y-2">
              {flow.paths.demo.steps.map((step) => (
                <li key={step} className="text-sm text-zinc-500 dark:text-zinc-400">
                  {step}
                </li>
              ))}
            </ul>
            <Link
              href={flow.paths.demo.cta.href}
              className="mt-4 inline-block text-sm font-medium text-brand no-underline hover:underline"
            >
              {flow.paths.demo.cta.label} →
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
