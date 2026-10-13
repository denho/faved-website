import { ArrowRightIcon } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'

import { Button } from './ui/button'

interface CtaButtonProps {
  // Placement recorded as `?cta=` on signup, e.g. `blog-compare-products`.
  cta: string
  label?: string
}

// Signup button for MDX content. Self-closing on purpose: multi-line JSX
// children in MDX get wrapped in paragraphs, which breaks the layout.
export default function CtaButton({ cta, label = 'Start your free trial' }: CtaButtonProps) {
  return (
    <div className="not-prose my-6 flex">
      <Button variant="default" size="lg" asChild>
        <a href={`${siteMetadata.cloudUrl}?cta=${encodeURIComponent(cta)}`}>
          {label}
          <ArrowRightIcon />
        </a>
      </Button>
    </div>
  )
}
