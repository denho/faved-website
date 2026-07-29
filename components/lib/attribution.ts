import { getCookie } from '@/components/lib/utils'

// First-party attribution snapshot shared across faved.to subdomains via a
// cookie scoped to .faved.to, so app.faved.to can read it at signup.
// NOTE: the cookie shape is read by faved-cloud/frontend/src/lib/attribution.ts
// (separate repo) - keep the two in sync.
export const ATTR_COOKIE_NAME = 'faved_attr'
const ATTR_COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days, matches Meta's click window

// Browsers silently drop a cookie over ~4KB, which would lose ALL attribution
// rather than just the overflow. Stay well under, leaving room for the name
// and attributes.
const ATTR_COOKIE_MAX_LEN = 3600

// Per-value caps. Tiered because the caps have to multiply out to under
// ATTR_COOKIE_MAX_LEN even in the worst case (5 UTMs + ref + click id + fbc +
// referrer + path, all maxed, twice over for first and last touch). Real UTM
// and ref values are tens of characters; click ids are the only field that is
// legitimately long and must survive intact to match on Meta's side.
const VALUE_MAX_LEN = 200
const CLICK_ID_MAX_LEN = 500

// A repeat visit only counts once per 30 minutes of inactivity - the usual
// sessionization window, so a reload or a second tab isn't a new visit.
const VISIT_GAP_MS = 30 * 60 * 1000

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const
export type UtmKey = (typeof UTM_KEYS)[number]

// Referral code params in priority order: `ref` is ours, `via` is what most
// affiliate tools (Rewardful, Tolt, PartnerStack) emit, `r` is the shorthand
// partners hand-write. First one present wins.
export const REF_PARAMS = ['ref', 'via', 'r'] as const

// Placement of the internal CTA that produced the click ("which button"), not
// an acquisition source. Recorded alongside attribution, never as part of it.
export const CTA_PARAM = 'cta'

// Our own CTA values, which used to ride on `?ref=` and are still out there in
// bookmarks, caches and links people have shared. Referrer suppression below
// misses those (external referrer, internal value), so they are also rejected
// by name. Keep in sync with the CTAs in components/sections/.
const INTERNAL_REF_VALUES = new Set([
  'hero-cta',
  'pricing-cta',
  'navbar-get-started',
  'navbar-signin',
  'navbar-open-app',
  'closing-cta',
])

// A referrer from our own site is navigation, not acquisition.
const INTERNAL_REFERRER_HOSTS = ['faved.to']

// One acquisition touch. The first one ever seen is stored at the top level of
// the cookie and frozen; the most recent one with a real signal is stored
// under `last`.
export interface Touch {
  utm: Partial<Record<UtmKey, string>>
  ref?: string
  fbclid?: string
  fbc?: string
  referrer_host?: string
  ts: number
  landing_path?: string
}

export interface AttributionData extends Touch {
  // Stays 1: every field added since is optional, and faved-cloud validates on
  // `v === 1`, so bumping this would make it discard every existing cookie.
  v: 1
  fbp?: string
  // Absent until a second signal-bearing visit - consumers should fall back to
  // the first-touch fields at the top level.
  last?: Touch
  // Unlike the other top-level fields this is NOT first-touch: it answers "which
  // button did they last click", so the newest value wins. Never a channel.
  entry_cta?: string
  visits?: number
  last_ts?: number
}

export function parseUtms(search: string): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(search)
  const utm: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value.slice(0, VALUE_MAX_LEN)
  }
  return utm
}

// Lowercased and trimmed so `?ref=ProductHunt` and `?ref=producthunt ` don't
// fragment into two rows in reporting. UTMs are deliberately left as-is so
// existing campaign reports stay comparable.
export function parseRef(search: string): string | undefined {
  const params = new URLSearchParams(search)
  for (const key of REF_PARAMS) {
    const value = params.get(key)?.trim().toLowerCase()
    if (value && !INTERNAL_REF_VALUES.has(value)) return value.slice(0, VALUE_MAX_LEN)
  }
  return undefined
}

// Internal CTA placement. Always read, including on internal navigation - it is
// the one thing an internal click legitimately tells us.
export function parseCta(search: string): string | undefined {
  const params = new URLSearchParams(search)
  const value = params.get(CTA_PARAM)?.trim().toLowerCase()
  if (value) return value.slice(0, VALUE_MAX_LEN)
  // Transitional: our CTAs used to ride on `?ref=`, and those links are still
  // in circulation. Recover the placement rather than dropping it.
  for (const key of REF_PARAMS) {
    const legacy = params.get(key)?.trim().toLowerCase()
    if (legacy && INTERNAL_REF_VALUES.has(legacy)) return legacy.slice(0, VALUE_MAX_LEN)
  }
  return undefined
}

// Host only - smaller than the full URL, and it avoids snapshotting someone
// else's path and query string. Returns undefined for our own hosts and for
// direct arrivals (empty referrer).
export function externalReferrerHost(referrer: string): string | undefined {
  const host = referrerHost(referrer)
  if (!host) return undefined
  return isInternalHost(host) ? undefined : host.slice(0, VALUE_MAX_LEN)
}

// True only for a referrer we can parse AND recognize as ours. An absent or
// malformed referrer is NOT internal - a direct hit on an ad URL has no
// referrer and must still be captured.
export function isInternalReferrer(referrer: string): boolean {
  const host = referrerHost(referrer)
  return !!host && isInternalHost(host)
}

function referrerHost(referrer: string): string | undefined {
  if (!referrer) return undefined
  try {
    return new URL(referrer).hostname.replace(/^www\./, '')
  } catch {
    // Malformed referrer - treat as direct
    return undefined
  }
}

function isInternalHost(host: string): boolean {
  return INTERNAL_REFERRER_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))
}

// Crawlers and synthetic runs (Lighthouse, CI, uptime checks) would otherwise
// land in the first-touch data and inflate channel counts.
const AUTOMATED_UA =
  /bot|crawler|spider|slurp|bingpreview|headlesschrome|lighthouse|pagespeed|gtmetrix|phantomjs|puppeteer|playwright|prerender/i

export function isAutomatedClient(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver) return true
  return AUTOMATED_UA.test(navigator.userAgent || '')
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

  let value = encodeURIComponent(JSON.stringify(data))
  if (value.length > ATTR_COOKIE_MAX_LEN && data.last) {
    // Pathological URLs only (every value is already capped). First touch is
    // the half worth keeping, so shed last-touch rather than let the browser
    // drop the entire cookie.
    value = encodeURIComponent(JSON.stringify({ ...data, last: undefined }))
  }

  const secure = document.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ATTR_COOKIE_NAME}=${value}; Path=/; Max-Age=${ATTR_COOKIE_MAX_AGE}; SameSite=Lax${cookieDomainAttribute()}${secure}`
}

function readTouch(now: number): Touch {
  // Internal navigation is never acquisition. A link from our own site carrying
  // ?ref= or ?utm_* is either CTA metadata or a forwarded duplicate of what the
  // cookie already holds, so every URL signal is ignored on those hits -
  // otherwise clicking our own "Get started" button rewrites where the visitor
  // actually came from.
  const search = isInternalReferrer(document.referrer) ? '' : document.location.search
  const fbclid = new URLSearchParams(search).get('fbclid')?.slice(0, CLICK_ID_MAX_LEN) || undefined

  return {
    utm: parseUtms(search),
    ref: parseRef(search),
    fbclid,
    fbc: fbclid ? buildFbc(fbclid, now) : undefined,
    referrer_host: externalReferrerHost(document.referrer),
    ts: now,
    landing_path: document.location.pathname.slice(0, VALUE_MAX_LEN),
  }
}

// A touch worth attributing to. A bare visit with no params and no external
// referrer is "direct" and must not overwrite a known source.
function hasSignal(touch: Touch): boolean {
  return Object.keys(touch.utm).length > 0 || !!touch.ref || !!touch.fbclid || !!touch.referrer_host
}

// First-touch wins for acquisition credit: the original utm/ref/fbclid/
// referrer/landing is kept once set and never overwritten. Last-touch is
// tracked alongside it under `last`, refreshed on every later visit that
// carries a signal, so "who introduced them" and "what converted them" are
// both available. Only URL- and referrer-derived data is captured — the
// Pixel's own _fbp/_fbc cookies live on .faved.to and are read live by the app
// at signup.
//
// The CTA placement is deliberately not a signal: on its own it can neither
// create the cookie nor qualify a touch, which keeps the invariant that a
// cookie always carries a real first touch.
export function captureAttribution(now: number = Date.now()): AttributionData | null {
  if (typeof document === 'undefined') return null
  if (isAutomatedClient()) return null

  const existing = readAttrCookie()
  const touch = readTouch(now)
  const entryCta = parseCta(document.location.search)

  if (!existing) {
    // Nothing to record — don't set an empty cookie
    if (!hasSignal(touch)) return null

    const next: AttributionData = { v: 1, ...touch, entry_cta: entryCta, visits: 1, last_ts: now }
    writeAttrCookie(next)
    return next
  }

  const isNewVisit = now - (existing.last_ts ?? existing.ts) > VISIT_GAP_MS
  const next: AttributionData = {
    ...existing,
    entry_cta: entryCta ?? existing.entry_cta,
    visits: (existing.visits ?? 1) + (isNewVisit ? 1 : 0),
    last_ts: now,
  }
  if (hasSignal(touch)) next.last = touch

  writeAttrCookie(next)
  return next
}
