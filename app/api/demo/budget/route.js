import { isDemoEnabled } from '../../../../platform/demo/index.js'
import { appendGuestCookie, resolveGuestContextFromRequest } from '../../../../lib/core/guestIdentity.js'
import { getGuestBudgetSnapshot } from '../../../../lib/core/guestUsageStore.js'

export const runtime = 'nodejs'

export async function GET(request) {
  if (!isDemoEnabled()) {
    return Response.json({ error: 'Demo is disabled.' }, { status: 404 })
  }

  const guestCtx = resolveGuestContextFromRequest(request)
  const snapshot = await getGuestBudgetSnapshot(guestCtx)
  const headers = new Headers({ 'Cache-Control': 'no-store' })
  appendGuestCookie(headers, guestCtx)

  return Response.json(snapshot, { headers })
}
