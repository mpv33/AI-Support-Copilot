import PageShell from '../../components/PageShell'
import {
  docCard,
  docCode,
  docEyebrow,
  docHeading,
  docSubtext,
} from '../../components/DocPageStyles'
import { portfolioSkills } from '../../data/skillsMatrix'

export const metadata = {
  title: 'Skills Map | AI Support Copilot',
  description: 'Technologies and capabilities behind Support Copilot.',
}

export default function SkillsPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className={docEyebrow}>Under the hood</p>
        <h1 className={docHeading}>Capabilities & technology</h1>
        <p className={docSubtext}>
          How Support Copilot is built — from retrieval and agents to streaming and security.
        </p>
      </section>

      <div className="space-y-5">
        {portfolioSkills.map((skill) => (
          <article key={skill.id} className={docCard}>
            <div>
              <span className="text-xs font-bold text-brand">#{skill.id}</span>
              <h2 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {skill.topic}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {skill.explore}
              </p>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {skill.inProject.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {skill.code.map((file) => (
                <code key={file} className={docCode}>
                  {file}
                </code>
              ))}
            </div>

            <blockquote className="mt-4 rounded-2xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
              {skill.interview}
            </blockquote>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
