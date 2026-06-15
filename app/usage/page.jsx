import UsageDashboard from '../../components/UsageDashboard'
import PageShell from '../../components/PageShell'

export const metadata = {
  title: 'Usage | AI Support Copilot',
  description: 'Token usage and estimated OpenAI cost for your chat sessions.',
}

export default function UsagePage() {
  return (
    <PageShell wide>
      <UsageDashboard />
    </PageShell>
  )
}
