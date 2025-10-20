'use client'

import { ReactNode, useState } from 'react'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Docs } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'

interface DocsLayoutProps {
  content: CoreContent<Docs>
  allDocs: CoreContent<Docs>[]
  children: ReactNode
}

export default function DocsLayout({ content, allDocs, children }: DocsLayoutProps) {
  const { title, description, path } = content
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Group docs by their directory structure
  const groupedDocs = allDocs
    .filter((doc) => !doc.draft)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .reduce(
      (acc, doc) => {
        const pathParts = doc.slug.split('/')
        const category = pathParts.length > 1 ? pathParts[0] : ''

        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(doc)
        return acc
      },
      {} as Record<string, CoreContent<Docs>[]>
    )

  const isActive = (docPath: string) => {
    return pathname === `/docs/${docPath}`
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-primary-600 hover:bg-primary-500 fixed right-4 bottom-4 z-50 rounded-full p-3 text-white shadow-lg md:hidden"
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
          className={` ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-40 h-screen w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white pt-10 pb-4 transition-transform md:sticky md:top-0 md:h-[calc(100vh)] md:translate-x-0 dark:border-gray-700 dark:bg-gray-950`}
        >
          <nav className="space-y-6 px-4">
            <div className="mb-4">
              <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Documentation
              </h2>
            </div>

            {Object.entries(groupedDocs).map(([category, docs]) => (
              <div key={category}>
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {category
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </h3>
                <ul className="space-y-1">
                  {docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive(doc.slug)
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                        } `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
          <article className="mx-auto max-w-3xl">
            <header className="mb-8">
              <h1 className="mb-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-gray-500 dark:text-gray-400">{description}</p>
              )}
            </header>
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </article>
        </main>
      </div>
    </div>
  )
}
