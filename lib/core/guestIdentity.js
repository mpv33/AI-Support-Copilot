import crypto from 'crypto'

export const GUEST_ID_COOKIE = 'demo-guest-id'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function guestUsageSalt() {
  return process.env.GUEST_USAGE_SALT || 'ai-support-copilot-guest'
}

export function hashGuestKey(value) {
  return crypto
    .createHash('sha256')
    .update(`${value}:${guestUsageSalt()}`)
    .digest('hex')
    .slice(0, 24)
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || '127.0.0.1'
}

export function readGuestIdFromRequest(request) {
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.match(new RegExp(`${GUEST_ID_COOKIE}=([^;]+)`))
  return match?.[1] || null
}

export function createGuestId() {
  return crypto.randomUUID()
}

export function guestCookieHeader(guestId) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${GUEST_ID_COOKIE}=${guestId}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`
}

export function resolveGuestContextFromRequest(request) {
  const existingGuestId = readGuestIdFromRequest(request)
  const guestId = existingGuestId || createGuestId()
  const ipHash = hashGuestKey(getClientIp(request))

  return {
    guestId,
    ipHash,
    isNewGuest: !existingGuestId,
  }
}

export function appendGuestCookie(headers, guestCtx) {
  if (guestCtx?.isNewGuest && guestCtx.guestId) {
    headers.append('Set-Cookie', guestCookieHeader(guestCtx.guestId))
  }
}
