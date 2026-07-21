'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/components/lib/attribution'

// Snapshots UTM params / fbclid into the cross-subdomain `faved_attr` cookie
// on landing so app.faved.to can attribute the signup later. Renders nothing.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
