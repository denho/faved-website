'use client'

import { useEffect } from 'react'
import { onMarketingConsent } from '@/components/lib/consent'
import { loadMetaPixel } from '@/components/lib/metaPixelCore'

// Loads the Meta Pixel only after CookieChimp grants marketing consent.
// Without a pixel id or without consent this renders and does nothing.
export default function MetaPixel() {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
    if (!pixelId) return

    return onMarketingConsent(() => loadMetaPixel(pixelId))
  }, [])

  return null
}
