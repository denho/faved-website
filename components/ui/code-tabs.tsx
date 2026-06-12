'use client'

import { Children, isValidElement, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

interface CodeTabProps {
  label: string
  children: ReactNode
}

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>
}

export function CodeTabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<CodeTabProps>[]
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div className="my-6">
      <div className="border-border/60 flex gap-1 border-b" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active === i
                ? 'border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="mt-3 [&>div>pre]:mt-0">{tabs[active]}</div>
    </div>
  )
}
