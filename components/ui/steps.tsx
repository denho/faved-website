import { Children, cloneElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

interface StepProps {
  title?: string
  children: ReactNode
  /** Injected by <Steps>; do not set manually. */
  number?: number
  /** Injected by <Steps>; do not set manually. */
  isLast?: boolean
}

export function Step({ title, children, number, isLast }: StepProps) {
  return (
    <div
      className={`border-border dark:border-border/15 relative ml-3 border-l pl-9 ${
        isLast ? 'pb-1' : 'pb-10'
      }`}
    >
      {/* Numbered badge straddling the connector line; its background masks the line behind it */}
      <div className="bg-card dark:bg-muted dark:border-border/15 absolute top-0 -left-4 flex size-8 items-center justify-center rounded-md border font-mono text-xs font-medium shadow-md">
        {number}
      </div>
      <div className="pt-1 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {title && <h4 className="mt-0 mb-3 text-base font-semibold">{title}</h4>}
        {children}
      </div>
    </div>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement) as ReactElement<StepProps>[]

  return (
    <div className="my-6">
      {steps.map((step, i) =>
        cloneElement(step, { number: i + 1, isLast: i === steps.length - 1 })
      )}
    </div>
  )
}
