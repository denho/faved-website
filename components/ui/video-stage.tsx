import type { ReactNode } from 'react'

import { cn } from '@/components/lib/utils'

interface VideoStageProps {
  children: ReactNode
  className?: string
}

/**
 * A product clip shown at full width with rounded corners and a gentle,
 * light hairline border that sets it off from the page.
 */
export default function VideoStage({ children, className }: VideoStageProps) {
  return (
    <div
      className={cn(
        'ring-foreground/20 relative overflow-hidden rounded-lg shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] ring-1 sm:rounded-xl',
        className
      )}
    >
      {children}
    </div>
  )
}
