import { ArrowRightIcon } from 'lucide-react'

import siteConfig from '@/data/siteMetadata'
import { cn } from '@/components/lib/utils'

import { Button } from '../../ui/button'
import Glow from '../../ui/glow'
import { Section } from '../../ui/section'

interface ClosingCtaProps {
  title?: string
  description?: string
  className?: string
}

export default function ClosingCta({
  title = 'Ready to organize your bookmarks?',
  description = 'Start free in under 60 seconds — no credit card required.',
  className,
}: ClosingCtaProps) {
  return (
    <Section className={cn('group relative overflow-hidden', className)} id="get-started">
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        <p className="text-md text-muted-foreground max-w-[600px] font-medium text-balance sm:text-xl">
          {description}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button variant="default" size="lg" asChild>
            <a href={`${siteConfig.cloudUrl}?ref=closing-cta`}>
              <ArrowRightIcon className="mr-2 size-4" />
              Try for free
            </a>
          </Button>
          <p className="text-muted-foreground mt-4 text-sm">
            <span className="font-semibold"> Prefer self-hosting?</span> Read the{' '}
            <a href="/docs/getting-started/installation" className="text-foreground underline">
              guide
            </a>{' '}
            to get started
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  )
}
