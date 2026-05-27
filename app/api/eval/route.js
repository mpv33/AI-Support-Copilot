import { runRetrievalEval } from '../../../lib/eval'

export const runtime = 'nodejs'

export async function GET() {
  const report = await runRetrievalEval()
  return Response.json(report)
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const report = await runRetrievalEval({ tenantId: body.tenantId || 'interviewpro' })
  return Response.json(report)
}
