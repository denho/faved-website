import { allLegals } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import SectionContainer from '@/components/SectionContainer'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Faved Bookmark Manager',
})

export default function PrivacyPage() {
  const legal = allLegals.find((p) => p.slug === 'privacy')

  if (!legal) {
    notFound()
  }

  return (
    <SectionContainer>
      <div className="prose dark:prose-invert mx-auto max-w-2xl py-12 tracking-tight">
        <MDXLayoutRenderer code={legal.body.code} components={components} />
      </div>
    </SectionContainer>
  )
}
