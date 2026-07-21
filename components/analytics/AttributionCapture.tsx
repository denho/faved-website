'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/components/lib/attribution'
import { hasMarketingConsent, onMarketingConsent } from '@/components/lib/consent'

// Snapshots UTM params / fbclid into the cross-subdomain `faved_attr` cookie
// on landing so app.faved.to can attribute the signup later. Re-captures once
// marketing consent is granted to pick up the Pixel's _fbp/_fbc cookies
// (which are only set post-consent). Renders nothing.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution(hasMarketingConsent())

    return onMarketingConsent(() => {
      // Delay so the freshly-loaded Pixel has a chance to set its cookies
      setTimeout(() => captureAttribution(true), 2000)
    })
  }, [])

  return null
}
