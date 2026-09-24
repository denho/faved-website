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
          "glass-3 from-card/100 to-card/100 dark:glass-4 ring-brand/40 ring-1 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
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
  /** One brand-coloured line under the price block. Its slot is always reserved so buttons line up. */
  promotionText?: ReactNode
  cta: {
    variant: 'glow' | 'default'
    label: string
    href: string
  }
  /** The reassurance under the button. Its slot is always reserved. */
  ctaNote?: string
  /** The tile between the button and the list: the number a plan is picked by. */
  stat: {
    value: string
    unit?: string
    badge?: ReactNode
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
              <span className="text-5xl font-bold tracking-tight">{price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </>
          ) : (
            <span className="text-3xl font-bold tracking-tight">{price}</span>
          )}
        </div>
        <div className="text-muted-foreground min-h-5 text-sm">{priceSubline}</div>
      </section>

      <div className="text-brand-foreground -mt-3 h-6 text-sm font-medium">{promotionText}</div>

      <div className="flex flex-col gap-2.5">
        <Button variant={cta.variant} size="lg" asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
        <p className="text-muted-foreground h-[18px] text-center text-xs">{ctaNote}</p>
      </div>

      <hr className="border-input" />

      <div className="glass-3 dark:glass-1 flex items-start gap-3 rounded-xl px-4 py-3">
        <span className="bg-brand/15 text-brand-foreground ring-brand/30 mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ring-1 ring-inset">
          <Sparkles className="size-3.5" />
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-base font-semibold">{stat.value}</span>
            {stat.unit && <span className="text-muted-foreground text-sm">{stat.unit}</span>}
            {stat.badge}
          </div>
          <p className="text-muted-foreground text-xs leading-5">{stat.note}</p>
        </div>
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
