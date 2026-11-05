import { notFound } from 'next/navigation'

import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { getUseCase, useCases } from '@/data/use-cases'
import UseCasePage from '@/components/use-cases/UseCasePage'

export const dynamicParams = false

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const useCase = getUseCase(slug)
  if (!useCase) return
  return genPageMetadata({
    title: useCase.metaTitle,
    description: useCase.metaDescription,
  })
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const useCase = getUseCase(slug)
  if (!useCase) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${siteMetadata.siteUrl}/use-cases/${useCase.slug}`,
    mainEntity: useCase.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <UseCasePage useCase={useCase} />
    </>
  )
}
