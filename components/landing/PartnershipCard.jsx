import { PARTNERSHIP_CONTACT_EMAIL, partnership } from '../../content/partnership'
import { sectionClass } from './landingStyles'
import SectionHeader from './SectionHeader'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-brand" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function PartnershipCard() {
  const mailto = partnership.cta.getHref()

  return (
    <section id="custom-solutions" className={`${sectionClass} relative overflow-hidden`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgb(16_163_127/0.08),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgb(16_163_127/0.12),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={partnership.eyebrow}
          title={partnership.title}
          subtitle={partnership.subtitle}
        />

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-lg shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none sm:mt-12">
          <div className="grid lg:grid-cols-[1fr_minmax(240px,280px)]">
            <div className="border-b border-zinc-100 p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-zinc-800">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                What we build
              </p>
              <ul className="mt-4 space-y-3">
                {partnership.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Hybrid RAG, cited answers, streaming chat, and deployment support — scoped to your product and
                timeline.
              </p>
            </div>

            <div className="flex flex-col justify-center bg-zinc-50 p-6 sm:p-8 dark:bg-zinc-900/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand dark:bg-brand/15">
                <MailIcon />
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {partnership.contactLabel}
              </p>
              <a
                href={mailto}
                className="mt-2 break-all text-sm font-medium text-brand no-underline transition hover:underline"
              >
                {PARTNERSHIP_CONTACT_EMAIL}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {partnership.contactHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
