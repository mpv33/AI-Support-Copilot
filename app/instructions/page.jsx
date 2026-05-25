import PageShell from '../../components/PageShell'
import {
  docCard,
  docEyebrow,
  docHeading,
  docSubtext,
} from '../../components/DocPageStyles'

export const metadata = {
  title: 'Instructions | AI Support Copilot',
  description: 'Setup and demo instructions for the AI Support Copilot project.',
}

const steps = [
  { title: 'Install dependencies', command: 'npm install', text: 'Run in the project folder.' },
  { title: 'Environment file', command: 'cp .env.example .env.local', text: 'Never commit .env.local.' },
  {
    title: 'OpenAI keys',
    command:
      'OPENAI_API_KEY=your_key\nOPENAI_CHAT_MODEL=gpt-4o-mini\nOPENAI_EMBEDDING_MODEL=text-embedding-3-small',
    text: 'Required for chat and embeddings.',
  },
  { title: 'Start dev server', command: 'npm run dev', text: 'Open http://localhost:3010 and /chat' },
  { title: 'Production build', command: 'npm run build', text: 'Verify before deploy.' },
]

const demoQuestions = [
  'Can annual users get refunds after 30 days?',
  'Why do I see AUTH_403 on dashboard?',
  'Where is order 123?',
]

export default function InstructionsPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className={docEyebrow}>Setup</p>
        <h1 className={docHeading}>Run locally</h1>
        <p className={docSubtext}>
          Install, configure OpenAI, and open the copilot at /chat. Use the theme toggle for
          dark mode.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className={`${docCard} flex gap-4 p-5`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{step.text}</p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-xs text-zinc-100 dark:bg-zinc-950">
                  {step.command}
                </pre>
              </div>
            </article>
          ))}
        </div>

        <aside className={`${docCard} h-fit`}>
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Demo</span>
          <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Try these questions
          </h2>
          <div className="mt-3 space-y-2">
            {demoQuestions.map((q) => (
              <p
                key={q}
                className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              >
                {q}
              </p>
            ))}
          </div>
        </aside>
      </section>
    </PageShell>
  )
}
