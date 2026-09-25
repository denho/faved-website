import { cva, type VariantProps } from 'class-variance-authority'
import { CircleCheckBig, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/components/lib/utils'

import { Button } from './button'

const pricingColumnVariants = cva(
  'max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-7 shadow-xl sm:p-8',
  {
    variants: {
      variant: {
        default: 'glass-1 to-transparent dark:glass-3',
        glow: "glass-2 to-transparent dark:glass-3 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] dark:after:bg-foreground/30 after:blur-[72px]",
        'glow-brand':
          "glass-3 from-card/100 to-card/100 dark:glass-4 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface PricingColumnProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pricingColumnVariants> {
  name: string
  /** Shown beside the name, e.g. a "Best value" badge. */
  badge?: ReactNode
  description: string
  /** A number renders as "$n /month"; a string ("Custom") renders as-is, smaller. */
  price: number | string
  /** The line under the price: what is billed, and when. */
  priceSubline?: ReactNode
  /** A small pill under the price block. Its slot is always reserved so buttons line up. */
  promotionText?: ReactNode
  cta: {
    variant: 'glow' | 'default'
    label: string
    href: string
  }
  /** The reassurance under the button. Its slot is always reserved. */
  ctaNote?: string
  /** The credit panel between the button and the list: the number a plan is picked by. */
  stat: {
    /** The allowance as a figure ("100"), set in the credit colour. */
    figure?: string
    label: string
    badge?: ReactNode
    /** How full the meter is, 0–100. Left out, the track is dashed: a custom allowance. */
    meter?: number
    /** What the meter says to a screen reader. */
    meterLabel: string
    note: string
  }
  features: ReactNode[]
}

export function PricingColumn({
  name,
  badge,
  description,
  price,
  priceSubline,
  promotionText,
  cta,
  ctaNote,
  stat,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  const isNumericPrice = typeof price === 'number'

  return (
    <div className={cn(pricingColumnVariants({ variant, className }))} {...props}>
      <hr
        className={cn(
          'via-foreground/60 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent',
          variant === 'glow-brand' && 'via-brand'
        )}
      />
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          {badge}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </header>

      <section className="flex h-[88px] flex-col justify-center gap-1.5">
        <div className="flex items-baseline gap-1.5">
          {isNumericPrice ? (
            <>
              <span className="text-muted-foreground text-2xl font-bold">$</span>
              <span className="font-mono text-5xl font-medium tracking-tighter">{price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </>
          ) : (
            <span className="text-3xl font-bold tracking-tight">{price}</span>
          )}
        </div>
        <div className="text-muted-foreground min-h-5 text-sm">{priceSubline}</div>
      </section>

      <div className="-mt-3 flex h-7 items-center">
        {promotionText && (
          <span className="border-foreground/15 bg-foreground/[0.04] text-foreground/85 inline-flex items-center rounded-full border px-3 py-1 text-[13px] leading-[18px] font-medium">
            {promotionText}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Button variant={cta.variant} size="lg" asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
        <p className="text-muted-foreground h-[18px] text-center text-xs">{ctaNote}</p>
      </div>

      <hr className="border-input" />

      <div className="border-foreground/10 bg-foreground/[0.03] flex flex-col gap-3 rounded-xl border p-4">
        <div className="flex min-h-8 flex-wrap items-center gap-x-2.5 gap-y-1">
          <Sparkles className="text-credit size-[18px] shrink-0" />
          {stat.figure && (
            <span className="text-credit font-mono text-[28px] leading-8 font-semibold">
              {stat.figure}
            </span>
          )}
          <span
            className={cn(
              'text-sm',
              stat.figure ? 'text-foreground/85' : 'text-foreground text-base font-semibold'
            )}
          >
            {stat.label}
          </span>
          {stat.badge && <span className="ml-auto">{stat.badge}</span>}
        </div>
        {stat.meter !== undefined ? (
          <div
            role="img"
            aria-label={stat.meterLabel}
            className="bg-foreground/10 h-2 overflow-hidden rounded-full"
          >
            <div
              className="bg-credit h-full rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, stat.meter))}%` }}
            />
          </div>
        ) : (
          <div
            role="img"
            aria-label={stat.meterLabel}
            className="border-credit/55 h-2 rounded-full border border-dashed"
          />
        )}
        <p className="text-muted-foreground text-[13px] leading-5">{stat.note}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-2.5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <CircleCheckBig className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <span className="leading-5">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { pricingColumnVariants }
