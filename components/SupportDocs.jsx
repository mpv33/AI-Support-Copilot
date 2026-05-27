import Link from 'next/link'
import { supportDocs } from '../data/supportDocs'
import { interviewProBrand } from '../data/siteConfig'

export default function SupportDocs() {
  return (
    <div className="pb-16">
      <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="text-sm font-medium text-brand">{interviewProBrand.name}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Help Center
        </h1>
        <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
          {interviewProBrand.tagline}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {interviewProBrand.description} Browse articles below — the same content mateshwari uses
          when you chat.
        </p>
        <Link
          href="/chat"
          className="mt-4 inline-block text-sm font-semibold text-brand no-underline hover:underline"
        >
          Ask in chat →
        </Link>
      </header>

      <ul className="mt-10 space-y-4">
        {supportDocs.map((doc) => (
          <li
            key={doc.id}
            id={doc.id}
            className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{doc.title}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {doc.text.trim()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
