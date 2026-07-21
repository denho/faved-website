// Minimal Meta Pixel bootstrap (the standard fbevents.js loader, minus the
// inline-script wrapper so it can run consent-gated from a module).
interface FbqFunction {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: FbqFunction
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

let initialized = false

export function loadMetaPixel(pixelId: string): void {
  if (initialized || typeof window === 'undefined' || !pixelId) return
  initialized = true

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args)
      } else {
        fbq.queue.push(args)
      }
    } as FbqFunction
    fbq.queue = []
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')
}

export function isMetaPixelLoaded(): boolean {
  return initialized
}
