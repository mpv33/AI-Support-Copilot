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
  title: 'Features | AI Support Copilot',
  description: 'Feature list for the AI Support Copilot project.',
}

const features = [
  { title: 'Hybrid RAG', text: 'Vector + BM25 fusion with reranking for accurate retrieval.' },
  { title: 'Streaming Chat', text: 'SSE token streaming with citations and stop control.' },
  { title: 'Tool Calling', text: 'Safe order-status tool with backend validation.' },
  { title: 'Guardrails', text: 'Injection block and weak-retrieval refusal.' },
  { title: 'Dark Mode', text: 'Full-app light/dark theme with persisted preference.' },
  { title: 'Structured Output', text: 'JSON schema support ticket summaries via API.' },
  { title: 'Eval Suite', text: 'Golden-question retrieval regression tests.' },
  { title: 'Telemetry', text: 'Trace IDs, latency, and chunk logs for debugging.' },
]

export default function FeaturesPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className={docEyebrow}>Features</p>
        <h1 className={docHeading}>Built for production-style AI support</h1>
        <p className={docSubtext}>
          Retrieval, agents, streaming, security, and observability in one copilot product.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className={docCard}>
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Feature</span>
            <h2 className={`${docCardTitle} mt-2 text-lg`}>{feature.title}</h2>
            <p className={docCardText}>{feature.text}</p>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
