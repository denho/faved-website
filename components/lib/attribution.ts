import {getCookie} from '@/components/lib/utils'

// First-party attribution snapshot shared across faved.to subdomains via a
// cookie scoped to .faved.to, so app.faved.to can read it at signup.
// NOTE: the cookie shape is read by faved-cloud/frontend/src/lib/attribution.ts
// (separate repo) - keep the two in sync.
export const ATTR_COOKIE_NAME = 'faved_attr'
const ATTR_COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days, matches Meta's click window

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const
export type UtmKey = (typeof UTM_KEYS)[number]

export interface AttributionData {
  v: 1
  utm: Partial<Record<UtmKey, string>>
  fbclid?: string
  fbc?: string
  fbp?: string
  ts: number
  landing_path?: string
}

export function parseUtms(search: string): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(search)
  const utm: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value.slice(0, 500)
  }
  return utm
}

// Meta's format for a click-derived _fbc when the Pixel hasn't set the cookie:
// fb.1.{ms timestamp}.{fbclid}
export function buildFbc(fbclid: string, now: number = Date.now()): string {
  return `fb.1.${now}.${fbclid}`
}

export function readAttrCookie(): AttributionData | null {
  const raw = getCookie(ATTR_COOKIE_NAME)
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw))
    if (parsed && parsed.v === 1 && typeof parsed.utm === 'object') {
      return parsed as AttributionData
    }
  } catch {
    // Corrupt cookie — treat as absent so it gets rewritten
  }
  return null
}

// Cookies scoped to .faved.to are readable by app.faved.to; on any other host
// (localhost, previews) fall back to a host-only cookie so dev still works.
function cookieDomainAttribute(): string {
  if (typeof document === 'undefined') return ''
  const host = document.location.hostname
  return host === 'faved.to' || host.endsWith('.faved.to') ? '; Domain=.faved.to' : ''
}

export function writeAttrCookie(data: AttributionData): void {
  if (typeof document === 'undefined') return
  const value = encodeURIComponent(JSON.stringify(data))
  const secure = document.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ATTR_COOKIE_NAME}=${value}; Path=/; Max-Age=${ATTR_COOKIE_MAX_AGE}; SameSite=Lax${cookieDomainAttribute()}${secure}`
}

// First-touch policy: the original acquisition context (utm/fbclid/landing)
// is kept once set and never overwritten by later visits. Only URL-derived
// data is captured — the Pixel's own _fbp/_fbc cookies live on .faved.to and
// are read live by the app at signup, so snapshotting them here would be
// redundant (and racy against the Pixel's consent-gated load).
export function captureAttribution(now: number = Date.now()): AttributionData | null {
  if (typeof document === 'undefined') return null

  const existing = readAttrCookie()
  if (existing && (Object.keys(existing.utm).length > 0 || existing.fbclid)) {
    return existing
  }

  const utm = parseUtms(document.location.search)
  // Capped like the UTMs: an oversized value (also duplicated into fbc)
  // could push the encoded cookie past the ~4KB browser limit, where the
  // write is silently dropped and ALL attribution would be lost.
  const fbclid = new URLSearchParams(document.location.search).get('fbclid')?.slice(0, 500) || undefined

  // Nothing to record — don't set an empty cookie
  if (Object.keys(utm).length === 0 && !fbclid) return null

  const next: AttributionData = {
    v: 1,
    utm,
    fbclid,
    fbc: fbclid ? buildFbc(fbclid, now) : undefined,
    ts: now,
    landing_path: document.location.pathname,
  }

  writeAttrCookie(next)
  return next
}
