import { allLegals } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import SectionContainer from '@/components/SectionContainer'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for Faved Bookmark Manager',
})

export default function TermsPage() {
  const legal = allLegals.find((p) => p.slug === 'terms')

  if (!legal) {
    notFound()
  }

  return (
    <SectionContainer>
      <div className="prose dark:prose-invert max-w-2xl mx-auto py-12 tracking-tight">
        <MDXLayoutRenderer code={legal.body.code} components={components} />
      </div>
    </SectionContainer>
  )
}
