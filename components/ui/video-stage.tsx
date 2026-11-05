import type { ReactNode } from 'react'

import { cn } from '@/components/lib/utils'

/*
 * Sweeping lines drawn over the stage, like the illustrated backdrops product
 * pages set their clips on. Plain strokes in white, kept faint by the opacity
 * below, so they read as texture rather than a picture.
 */
const LINES = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' preserveAspectRatio='none' fill='none' stroke='white' stroke-width='2'>
    <path d='M-50 180 C 250 60, 520 300, 820 170 S 1180 40, 1260 120'/>
    <path d='M-50 330 C 230 220, 560 460, 860 320 S 1180 200, 1260 280'/>
    <path d='M-50 520 C 280 400, 540 660, 840 520 S 1170 380, 1260 470'/>
    <path d='M-50 700 C 260 600, 580 820, 880 690 S 1180 580, 1260 650'/>
  </svg>`
)}")`

interface VideoStageProps {
  children: ReactNode
  className?: string
}

/**
 * A product clip set on a coloured stage: a large rounded panel in the brand
 * blue with faint drawn lines, and the clip inset in it as a window with
 * smaller corners, a hairline edge and a soft shadow.
 */
export default function VideoStage({ children, className }: VideoStageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] p-3 sm:rounded-[28px] sm:p-8 lg:rounded-[32px] lg:p-12',
        className
      )}
      style={{
        background:
          'radial-gradient(120% 90% at 50% 0%, #3d86ff 0%, #0062ff 38%, #0a3fb0 72%, #0a2470 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: LINES, backgroundSize: '100% 100%' }}
      />
      <div className="relative overflow-hidden rounded-lg shadow-[0_24px_60px_-12px_rgba(0,10,40,0.55)] ring-1 ring-white/15 sm:rounded-xl">
        {children}
      </div>
    </div>
  )
}
