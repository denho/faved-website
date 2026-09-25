'use client'

import { CircleCheckBig, Sparkles } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { cn } from '@/components/lib/utils'

import { PricingColumn, PricingColumnProps } from '../../ui/pricing-column'
import { Section } from '../../ui/section'

import siteConfig from '@/data/siteMetadata'
import { Badge } from '@/components/ui/badge'

interface PricingPlan extends Omit<PricingColumnProps, 'price' | 'priceSubline'> {
  /** Price per month when billed monthly. A string ("Custom") renders as-is. */
  monthlyPrice: number | string
  /** Total price per year when billed yearly. Shown divided by 12. */
  yearlyPrice?: number
  /** The line under a plan with no yearly price. */
  customSubline?: string
}

interface PricingProps {
  title?: string | false
  description?: string | false
  plans?: PricingPlan[]
  className?: string
}

const TRIAL_NOTE = '14-day free trial · cancel anytime'
const CREDITS_NOTE = 'for AI extraction of data from web pages into your custom fields'

/**
 * The rows the Basic card carries: what a switcher picks a plan by, named the
 * way the app's own plan picker names them. Plus says "Everything in Basic"
 * and lists only what differs.
 */
const BASIC_FEATURES: ReactNode[] = [
  'Fetching page metadata and content, taking a screenshot and generating a summary are free: no credits',
  'Unlimited records, fields and types, fair usage applies',
  'Web archive: page content and screenshots',
  'Full-text search',
  'Priority support by email',
]

/**
 * What nobody picks a plan by, said once under the grid. Two lists rather
 * than one grid, so a long item does not leave a gap beside a short one; the
 * order is arranged so both columns end level.
 */
const SHARED_FEATURES: { text: string; icon?: ReactNode }[] = [
  {
    text: 'Top up any time: 100 AI credits for $5, 500 for $20. They never expire',
    icon: <Sparkles className="text-credit size-4 shrink-0" />,
  },
  { text: 'Custom record types and fields' },
  { text: 'Duplicate detection' },
  { text: 'Bulk actions' },
  {
    text: 'Capture from any browser or phone: Chrome extension, bookmarklet, Apple Shortcuts, Android share',
  },
  { text: 'Import and export: browsers, Raindrop.io, Pocket and bookmarks HTML' },
  { text: 'Lightning-fast access from anywhere, on any device' },
  { text: 'Daily backups' },
]

const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Basic',
    description: 'For extracting the pages that matter',
    monthlyPrice: 5,
    yearlyPrice: 48,
    promotionText: 'or $120 once for lifetime access · limited time',
    cta: {
      variant: 'glow',
      label: 'Start free trial',
      href: `${siteConfig.cloudUrl}?cta=pricing-basic`,
    },
    ctaNote: TRIAL_NOTE,
    stat: {
      figure: '100',
      label: 'AI credits a month',
      meter: 20,
      meterLabel: '100 AI credits a month, a fifth of Plus',
      note: CREDITS_NOTE,
    },
    features: BASIC_FEATURES,
    variant: 'glow',
  },
  {
    name: 'Plus',
    badge: <Badge variant="brand">Best value</Badge>,
    description: 'For extracting everything you save',
    monthlyPrice: 20,
    yearlyPrice: 192,
    cta: {
      variant: 'default',
      label: 'Start free trial',
      href: `${siteConfig.cloudUrl}?cta=pricing-plus`,
    },
    ctaNote: TRIAL_NOTE,
    stat: {
      figure: '500',
      label: 'AI credits a month',
      badge: <Badge className="bg-credit/15 text-credit border-transparent">5× Basic</Badge>,
      meter: 100,
      meterLabel: '500 AI credits a month, five times Basic',
      note: CREDITS_NOTE,
    },
    features: [
      <>
        <span className="text-foreground font-semibold">Everything in Basic</span>, plus
      </>,
      'Five times the AI credits, for extracting everything you save',
      'The best price per credit, cheaper than any top-up',
    ],
    variant: 'glow-brand',
    className: 'lg:-translate-y-2',
  },
  {
    name: 'Team',
    description: 'For teams and organizations',
    monthlyPrice: 'Custom',
    customSubline: 'Priced by team size and usage',
    cta: {
      variant: 'glow',
      label: 'Contact us',
      href: 'mailto:hello@faved.to?subject=Faved%20for%20Teams%20request',
    },
    stat: {
      label: 'Custom allowance',
      meterLabel: 'A custom AI credit allowance',
      note: 'AI credits sized for your team',
    },
    features: [
      'Everything in Plus',
      'Multi-user access',
      'Single Sign-On (SSO)',
      'User management',
      'Customizable branding',
      'Priority support',
    ],
    variant: 'default',
  },
]

const perMonth = (yearlyPrice: number) => Math.round((yearlyPrice / 12) * 100) / 100

/** What a yearly plan saves against paying monthly, as a whole percent. */
const yearlySavings = (monthlyPrice: number, yearlyPrice: number) =>
  Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100)

export default function Pricing({
  title = 'Simple, flexible pricing',
  description = 'Unlimited records, fields and types on every plan. Pay only for AI extraction; everything else is free. Start with a 14-day free trial.',
  plans = DEFAULT_PRICING_PLANS as PricingPlan[],
  className = '',
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(true)
  const savings = yearlySavings(5, 48)
  const half = Math.ceil(SHARED_FEATURES.length / 2)
  const sharedColumns = [SHARED_FEATURES.slice(0, half), SHARED_FEATURES.slice(half)]

  return (
    <Section className={cn(className)} id="pricing">
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-12">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center">
            {title && <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>}
            {description && (
              <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Monthly / Yearly segmented toggle */}
        <div
          role="tablist"
          aria-label="Billing period"
          className="glass-2 dark:glass-3 inline-flex items-center rounded-full p-1"
        >
          {(['monthly', 'yearly'] as const).map((period) => {
            const selected = period === 'yearly' ? isYearly : !isYearly
            return (
              <button
                key={period}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setIsYearly(period === 'yearly')}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors sm:px-5',
                  selected
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {period}
                {period === 'yearly' && (
                  <Badge variant={selected ? 'brand' : 'brand-secondary'} size="sm">
                    Save {savings}%
                  </Badge>
                )}
              </button>
            )
          })}
        </div>

        {plans.length > 0 && (
          <div className="max-w-container mx-auto grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => {
              const hasYearly = typeof plan.yearlyPrice === 'number' && plan.yearlyPrice > 0
              const price =
                isYearly && hasYearly ? perMonth(plan.yearlyPrice as number) : plan.monthlyPrice
              const priceSubline = hasYearly ? (
                isYearly ? (
                  <>${plan.yearlyPrice} billed yearly</>
                ) : (
                  'Billed monthly'
                )
              ) : (
                plan.customSubline
              )
              return (
                <PricingColumn
                  key={plan.name}
                  name={plan.name}
                  badge={plan.badge}
                  description={plan.description}
                  price={price}
                  priceSubline={priceSubline}
                  promotionText={plan.promotionText}
                  cta={plan.cta}
                  ctaNote={plan.ctaNote}
                  stat={plan.stat}
                  features={plan.features}
                  variant={plan.variant}
                  className={plan.className}
                />
              )
            })}
          </div>
        )}

        {/* What nobody picks a plan by, said once */}
        <div className="glass-1 dark:glass-3 w-full max-w-[960px] rounded-2xl p-6 sm:p-8">
          <p className="text-muted-foreground mb-5 text-center text-xs font-semibold tracking-wide uppercase">
            On every plan
          </p>
          <div className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {sharedColumns.map((items, column) => (
              <ul key={column} className="flex flex-col gap-2.5">
                {items.map(({ text, icon }) => (
                  <li
                    key={text}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-5"
                  >
                    <span className="mt-0.5 shrink-0">
                      {icon ?? <CircleCheckBig className="size-4" />}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground max-w-[640px] text-center text-sm text-balance">
          <span className="text-foreground font-semibold">Prefer self-hosting?</span> The
          open-source Faved bookmark manager is free to run on your own server. Read the{' '}
          <a href="/docs/getting-started/installation" className="text-foreground underline">
            install guide
          </a>
          .
        </p>
      </div>
    </Section>
  )
}
