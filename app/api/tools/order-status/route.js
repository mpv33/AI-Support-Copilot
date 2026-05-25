export const runtime = 'nodejs'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return Response.json({ error: 'orderId is required' }, { status: 400 })
  }

  return Response.json({
    orderId,
    status: 'shipped',
    eta: 'Tomorrow',
    carrier: 'DemoExpress',
  })
}
