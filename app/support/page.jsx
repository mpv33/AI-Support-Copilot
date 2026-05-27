import SupportDocs from '../../components/SupportDocs'
import PageShell from '../../components/PageShell'

export const metadata = {
  title: 'Help Center | InterviewPro.info',
  description: 'Help articles for InterviewPro.info — the same content the support chat uses to answer your questions.',
}

export default function SupportPage() {
  return (
    <PageShell>
      <SupportDocs />
    </PageShell>
  )
}
