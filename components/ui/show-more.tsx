'use client'

import { ReactNode, useState } from 'react'

import { ChevronDown } from 'lucide-react'

import { cn } from '@/components/lib/utils'

import { Button } from './button'

interface ShowMoreProps {
  children: ReactNode
  /** Button text while collapsed. */
  label: string
  className?: string
}

// Collapses its content on mobile only. Children opt in to being hidden with
// `max-sm:group-data-[expanded=false]/show-more:hidden`; from `sm` up everything
// is always shown and the button is hidden.
export function ShowMore({ children, label, className }: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div data-expanded={expanded} className={cn('group/show-more flex flex-col', className)}>
      {children}
      {!expanded && (
        <Button
          variant="outline"
          aria-expanded={expanded}
          onClick={() => setExpanded(true)}
          className="mx-auto mt-2 sm:hidden"
        >
          {label}
          <ChevronDown aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
