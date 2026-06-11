'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Docs } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'
import '../styles/prism.css'
import { ChevronDownIcon, RocketIcon, FolderIcon } from 'lucide-react'

const SECTION_ICONS: Record<string, React.ElementType> = {
  'getting-started': RocketIcon,
}

interface TocItem {
  value: string
  url: string
  depth: number
}

interface DocsLayoutProps {
  content: CoreContent<Docs>
  allDocs: CoreContent<Docs>[]
  children: ReactNode
}

const formatCategory = (category: string) =>
  category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export default function DocsLayout({ content, allDocs, children }: DocsLayoutProps) {
  const { title, description } = content
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (cat: string) =>
    setCollapsedSections((prev) => ({ ...prev, [cat]: !prev[cat] }))

  const toc = (content.toc as unknown as TocItem[]) || []
  const [activeId, setActiveId] = useState<string>('')
  const headingIds = useRef<string[]>([])

  useEffect(() => {
    headingIds.current = toc.map((item) => item.url.slice(1))

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost entry that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    headingIds.current.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])
  const category = content.slug.includes('/') ? content.slug.split('/')[0] : ''

  // Group docs by their directory structure
  const sortedDocs = allDocs
    .filter((doc) => !doc.draft)
    .sort((a, b) => (a.order || 999) - (b.order || 999))

  const groupedDocs = sortedDocs.reduce(
    (acc, doc) => {
      const pathParts = doc.slug.split('/')
      const docCategory = pathParts.length > 1 ? pathParts[0] : ''

      if (!acc[docCategory]) {
        acc[docCategory] = []
      }
      acc[docCategory].push(doc)
      return acc
    },
    {} as Record<string, CoreContent<Docs>[]>
  )

  // Flatten in sidebar order for prev/next navigation
  const flatDocs = Object.values(groupedDocs).flat()
  const currentIndex = flatDocs.findIndex((doc) => doc.slug === content.slug)
  const prevDoc = currentIndex > 0 ? flatDocs[currentIndex - 1] : null
  const nextDoc =
    currentIndex >= 0 && currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null

  const isActive = (docPath: string) => {
    return pathname === `/docs/${docPath}`
  }

  return (
    <div className="max-w-container mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 fixed right-4 bottom-4 z-50 rounded-full p-3 shadow-lg transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-background fixed top-15 left-0 z-40 h-screen w-64 flex-shrink-0 overflow-y-auto pt-10 pb-4 transition-transform md:sticky md:top-15 md:h-auto md:max-h-[calc(100vh-3.75rem)] md:translate-x-0 md:self-start md:bg-transparent`}
        >
          <nav className="space-y-6 px-4">
            <div className="mb-4">
              <h2 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                Documentation
              </h2>
            </div>

            {Object.entries(groupedDocs).map(([docCategory, docs]) => {
              const isCollapsed = !!collapsedSections[docCategory]
              const Icon = SECTION_ICONS[docCategory] ?? FolderIcon
              return (
                <div key={docCategory}>
                  {docCategory && (
                    <button
                      onClick={() => toggleSection(docCategory)}
                      className="text-sidebar-foreground hover:text-foreground mb-1 flex w-full items-center justify-between gap-2 rounded-md px-1 py-1 text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="text-muted-foreground h-4 w-4 shrink-0" />
                        {formatCategory(docCategory)}
                      </span>
                      <ChevronDownIcon
                        className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                      />
                    </button>
                  )}
                  {!isCollapsed && (
                    <ul className="space-y-1">
                      {docs.map((doc) => (
                        <li key={doc.slug}>
                          <Link
                            href={`/docs/${doc.slug}`}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              isActive(doc.slug)
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {doc.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
          <article className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
                <li>
                  <Link
                    href="/docs/getting-started/introduction"
                    className="hover:text-foreground transition-colors"
                  >
                    Docs
                  </Link>
                </li>
                {category && (
                  <>
                    <li aria-hidden="true">/</li>
                    <li>{formatCategory(category)}</li>
                  </>
                )}
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {title}
                </li>
              </ol>
            </nav>
            <header className={`${description ? 'border-border/20 mb-0 border-b pb-8' : 'mb-8'}`}>
              <h1 className="text-foreground mb-2 text-3xl font-bold tracking-tight">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-3 text-lg leading-relaxed font-light">
                  {description}
                </p>
              )}
            </header>
            {description && <div className="mb-8" />}
            <div
              className={[
                'prose prose-zinc dark:prose-invert max-w-none',
                'prose-headings:scroll-m-20 prose-headings:tracking-tight',
                'prose-img:rounded-md prose-img:border',
              ].join(' ')}
            >
              {children}
            </div>

            {/* Prev / next navigation */}
            {(prevDoc || nextDoc) && (
              <nav
                aria-label="Docs pages"
                className="border-border dark:border-border/10 mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row"
              >
                {prevDoc ? (
                  <Link
                    href={`/docs/${prevDoc.slug}`}
                    className="group border-border/10 hover:border-border/40 flex-1 rounded-lg border p-4 transition-colors"
                  >
                    <span className="text-muted-foreground text-xs">Previous</span>
                    <span className="text-foreground mt-1 block text-sm font-medium">
                      {prevDoc.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {nextDoc ? (
                  <Link
                    href={`/docs/${nextDoc.slug}`}
                    className="group border-border/10 hover:border-border/40 flex-1 rounded-lg border p-4 text-right transition-colors"
                  >
                    <span className="text-muted-foreground text-xs">Next</span>
                    <span className="text-foreground mt-1 block text-sm font-medium">
                      {nextDoc.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </nav>
            )}
          </article>
        </main>

        {/* Table of contents */}
        {toc.length > 0 && (
          <aside className="hidden w-56 flex-shrink-0 xl:block">
            <nav
              aria-label="On this page"
              className="sticky top-15 max-h-[calc(100vh-3.75rem)] overflow-y-auto py-10 pr-4"
            >
              <h2 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                On this page
              </h2>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.url} className={item.depth >= 3 ? 'pl-4' : ''}>
                    <a
                      href={item.url}
                      className={`block transition-colors ${
                        activeId === item.url.slice(1)
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  )
}
