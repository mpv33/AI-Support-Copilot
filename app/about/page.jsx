import PageShell from '../../components/PageShell'
import {
  docCard,
  docCardText,
  docCardTitle,
  docEyebrow,
  docHeading,
  docSubtext,
} from '../../components/DocPageStyles'

export const metadata = {
  title: 'About | AI Support Copilot',
  description: 'Architecture overview for the AI Support Copilot project.',
}

const flow = [
  'User asks a support question',
  'Backend embeds the question',
  'Retriever searches tenant-safe support chunks',
  'Prompt builder creates grounded context',
  'OpenAI streams the answer',
  'UI renders tokens and citations',
]

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className={docEyebrow}>About</p>
        <h1 className={docHeading}>Production-style Gen AI architecture</h1>
        <p className={docSubtext}>
          The browser handles user experience, while the backend owns prompts, retrieval,
          tools, validation, and OpenAI calls.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className={`${docCard} md:col-span-2`}>
          <h2 className={docCardTitle}>System Flow</h2>
          <div className="mt-4 space-y-3">
            {flow.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </article>

        {[
          {
            title: 'Frontend',
            text: 'React chat UI with Tailwind CSS, dark mode, and Zustand for streaming state.',
          },
          {
            title: 'Backend',
            text: 'Next.js API routes for retrieval, prompts, tools, and telemetry.',
          },
          {
            title: 'AI Layer',
            text: 'OpenAI embeddings and chat completions with grounded context.',
          },
        ].map((card) => (
          <article key={card.title} className={docCard}>
            <h2 className={docCardTitle}>{card.title}</h2>
            <p className={docCardText}>{card.text}</p>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
