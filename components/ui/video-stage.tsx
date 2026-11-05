import type { ReactNode } from 'react'

import { cn } from '@/components/lib/utils'
import StageBeams, { STAGE_BG } from './stage-beams'

interface VideoStageProps {
  children: ReactNode
  className?: string
}

/**
 * A product clip set on the same stage as the docs screenshots: a near-black
 * rounded panel lit by soft beams of light, with the clip inset in it as a
 * window with smaller corners, a hairline edge and a deep shadow.
 */
export default function VideoStage({ children, className }: VideoStageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] p-3 sm:rounded-[28px] sm:p-8 lg:rounded-[32px] lg:p-12',
        STAGE_BG,
        className
      )}
    >
      <StageBeams />
      <div className="relative overflow-hidden rounded-lg shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:rounded-xl">
        {children}
      </div>
    </div>
  )
}
