import { allDocs } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { components } from '@/components/MDXComponents'
import DocsLayout from '@/layouts/DocsLayout'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const doc = allDocs.find((d) => d.slug === slug)

  if (!doc) {
    return
  }

  return genPageMetadata({
    title: doc.title,
    description: doc.description,
  })
}

export const generateStaticParams = async () => {
  return allDocs.map((doc) => ({
    slug: doc.slug.split('/'),
  }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const doc = allDocs.find((d) => d.slug === slug)

  if (!doc || doc.draft) {
    notFound()
  }

  const mainContent = coreContent(doc)
  const allDocsContent = allCoreContent(allDocs)

  return (
    <DocsLayout content={mainContent} allDocs={allDocsContent}>
      <MDXLayoutRenderer code={doc.body.code} components={components} toc={doc.toc} />
    </DocsLayout>
  )
}
