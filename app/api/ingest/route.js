import { rebuildVectorIndex } from '../../../lib/vectorStore'

export const runtime = 'nodejs'

export async function POST() {
  const index = await rebuildVectorIndex()

  return Response.json({
    ok: true,
    chunks: index.length,
    message: 'Vector index rebuilt in memory.',
  })
}
