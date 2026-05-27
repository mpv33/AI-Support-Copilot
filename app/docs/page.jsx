import GenAiDocs from '../../components/GenAiDocs'
import PageShell from '../../components/PageShell'

export const metadata = {
  title: 'Technical guide | AI Support Copilot',
  description:
    'Architecture, RAG pipeline, API routes, and code map for the InterviewPro.info AI support copilot.',
}

export default function DocsPage() {
  return (
    <PageShell wide>
      <GenAiDocs />
    </PageShell>
  )
}
