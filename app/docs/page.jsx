import ProductDocs from '../../components/ProductDocs'
import PageShell from '../../components/PageShell'

export const metadata = {
  title: 'Product guide | AI Support Copilot',
  description:
    'Upload any file and chat with AI Support Copilot — grounded RAG answers with source citations.',
}

export default function DocsPage() {
  return (
    <PageShell wide>
      <ProductDocs />
    </PageShell>
  )
}
