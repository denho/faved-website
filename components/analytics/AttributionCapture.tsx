'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/components/lib/attribution'

// Snapshots UTM params / ref / fbclid / referrer host into the cross-subdomain
// `faved_attr` cookie on landing so app.faved.to can attribute the signup later
// (first-touch wins for acquisition credit, last-touch tracked alongside it).
// Only URL- and referrer-derived data is captured, so no consent gating is
// needed here — the Pixel identifiers are read live by the app at signup, gated
// on consent there. Renders nothing.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
