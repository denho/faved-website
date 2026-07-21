import { getCookie } from '@/components/lib/utils'

// NOTE: kept in sync with faved-cloud/frontend/src/lib/consent.ts (separate
// repo) - CookieChimp category/cookie/event names must change in both.
//
// Consent is managed by CookieChimp, loaded at the edge via Cloudflare Zaraz.
// CookieChimp exposes the vanilla-cookieconsent v3-compatible surface: a
// window.CookieConsent API, cc:onConsent / cc:onChange window events, and a
// persisted cc_cookie. None of that is bundled here — when the CMP is absent
// (dev, blocked script) every check fails closed.
export const MARKETING_CONSENT_CATEGORY = 'marketing'
const CONSENT_COOKIE_NAME = 'cc_cookie'

interface CookieConsentApi {
  acceptedCategory: (category: string) => boolean
}

function cmpApi(): CookieConsentApi | undefined {
  if (typeof window === 'undefined') return undefined
  const api = (window as { CookieConsent?: CookieConsentApi }).CookieConsent
  return api && typeof api.acceptedCategory === 'function' ? api : undefined
}

function consentCookieGrants(category: string): boolean {
  const raw = getCookie(CONSENT_COOKIE_NAME)
  if (!raw) return false
  try {
    const parsed = JSON.parse(decodeURIComponent(raw))
    return Array.isArray(parsed?.categories) && parsed.categories.includes(category)
  } catch {
    return false
  }
}

export function hasMarketingConsent(): boolean {
  const api = cmpApi()
  if (api) {
    try {
      return api.acceptedCategory(MARKETING_CONSENT_CATEGORY)
    } catch {
      return false
    }
  }
  return consentCookieGrants(MARKETING_CONSENT_CATEGORY)
}

// Runs the callback once marketing consent is granted — immediately if it
// already is, otherwise on the CMP's consent events. Returns an unsubscribe.
export function onMarketingConsent(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  if (hasMarketingConsent()) {
    callback()
    return () => {}
  }

  const handler = () => {
    if (hasMarketingConsent()) {
      unsubscribe()
      callback()
    }
  }
  const unsubscribe = () => {
    window.removeEventListener('cc:onConsent', handler)
    window.removeEventListener('cc:onChange', handler)
  }
  window.addEventListener('cc:onConsent', handler)
  window.addEventListener('cc:onChange', handler)
  return unsubscribe
}
