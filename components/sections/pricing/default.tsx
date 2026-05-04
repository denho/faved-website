'use client'

import { useState } from 'react'
import { Cloud, Users } from 'lucide-react'

import { cn } from '@/components/lib/utils'

import { PricingColumn, PricingColumnProps } from '../../ui/pricing-column'
import { Section } from '../../ui/section'
import { Switch } from '@/components/ui/switch'

import { Label } from '@/components/ui/label'
import siteConfig from '@/data/siteMetadata'
import { Badge } from '@/components/ui/badge'

interface PricingPlan extends Omit<PricingColumnProps, 'price'> {
  monthlyPerMonthPrice: number | string
  yearlyPerMonthPrice: number | string
}

interface PricingProps {
  title?: string | false
  description?: string | false
  plans?: PricingPlan[]
  className?: string
}

const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Self-hosted',
    description: 'Faved is open-source and free to self-host',
    monthlyPerMonthPrice: 'Free',
    yearlyPerMonthPrice: 'Free',
    priceNote: 'No external dependencies. Free forever',
    cta: {
      variant: 'glow',
      label: 'Get started',
      href: '/docs/getting-started/installation',
    },
    features: ['Unlimited bookmarks', 'Full control over your data', 'Community support'],
    variant: 'default',
    // className: 'hidden lg:flex',
  },
  {
    name: 'Cloud',
    // icon: <Cloud className="size-4" />,
    // description: "The hassle-free option — no technical knowledge required for setup, no time spent on maintenance, updates, or backups.",
    description: 'Zero setup — start in under 60 seconds',
    monthlyPerMonthPrice: 5,
    yearlyPerMonthPrice: 2.5,
    priceNote: '15-day money-back guarantee',
    cta: {
      variant: 'default',
      label: 'Get started',
      href: `${siteConfig.cloudUrl}?ref=pricing-cta`,
    },
    features: [
      '50,000 bookmarks',
      'Lightning-fast access from anywhere',
      'Strong encryption for your data',
      'Automatic data backups',
      'Automatic updates',
      'Early access to new features',
      'Dedicated email support',
    ],
    variant: 'glow-brand',
  },
  {
    name: 'Cloud Team',
    // icon: <Users className="size-4" />,
    description: 'For teams and organizations. Collaborate securely',
    monthlyPerMonthPrice: 'Custom',
    yearlyPerMonthPrice: 'Custom',
    priceNote: 'Flexible pricing based on team size and usage',
    cta: {
      variant: 'glow',
      label: 'Contact us',
      href: 'mailto:hello@faved.cloud?subject=Faved%20for%20Teams%20request',
    },
    features: [
      'Unlimited bookmarks',
      'Multi-user access',
      'Single Sign-On (SSO)',
      'User management',
      'Customizable branding',
      'Priority support',
    ],
    variant: 'glow',
  },
]

export default function Pricing({
  title = 'Simple, Flexible Pricing',
  description = 'From self-hosted to fully managed cloud. Choose what fits your workflow.',
  plans = DEFAULT_PRICING_PLANS as PricingPlan[],
  className = '',
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <Section className={cn(className)} id="pricing">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {title && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center gap-3">
          <Label
            htmlFor="yearly-monthly"
            className={cn(
              'text-sm font-medium',
              !isYearly ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Monthly
          </Label>

          <Switch
            id="yearly-monthly"
            checked={isYearly}
            onCheckedChange={() => setIsYearly((prev) => !prev)}
            className={isYearly ? 'bg-brand-foreground transition' : 'bg-input'}
          />

          <Label
            htmlFor="yearly-monthly"
            className={cn(
              'text-sm font-medium',
              isYearly ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Yearly
            <Badge variant="secondary">
              Save 50%
            </Badge>
          </Label>
        </div>

        {plans.length > 0 && (
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingColumn
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
                price={isYearly ? plan.yearlyPerMonthPrice : plan.monthlyPerMonthPrice}
                originalPrice={plan.originalPrice}
                priceSubline={
                  !isNaN(Number(plan.yearlyPerMonthPrice)) && Number(plan.yearlyPerMonthPrice) > 0
                    ? isYearly
                      ? `Billed yearly ($${Number(plan.yearlyPerMonthPrice) * 12}/year)`
                      : 'Cancel anytime'
                    : undefined
                }
                promotionText={plan.promotionText}
                priceNote={plan.priceNote}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
