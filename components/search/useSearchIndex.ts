'use client'

import { useEffect, useState } from 'react'
import MiniSearch, { type SearchOptions, type SearchResult } from 'minisearch'
import siteMetadata from '@/data/siteMetadata'
import { EDITIONS, type Edition } from '@/components/docs/editions'

// Shape of public/search-index.json, written by scripts/search-index.mjs
export interface SearchPage {
  id: string
  type: 'docs' | 'blog'
  url: string
  title: string
  description: string
  tags: string[]
  edition: Edition | null
  category: string
  order: number | null
  date: string
}

export interface SearchSection {
  id: string
  page: string
  url: string
  heading: string
  pageTitle: string
  edition: Edition
  category: string
  text: string
}

export interface SearchIndex {
  pages: SearchPage[]
  sections: SearchSection[]
  pagesSearch: MiniSearch<SearchPage>
  sectionsSearch: MiniSearch<SearchSection>
}

export const SEARCH_OPTIONS: SearchOptions = {
  prefix: true,
  fuzzy: (term) => (term.length > 3 ? 0.2 : false),
  combineWith: 'AND',
}

/** AND-match every word first; fall back to OR so a single unknown word doesn't empty the list. */
export function searchWithFallback<T>(index: MiniSearch<T>, query: string, options: SearchOptions) {
  const results = index.search(query, { ...SEARCH_OPTIONS, ...options })
  if (results.length > 0) return results
  return index.search(query, { ...SEARCH_OPTIONS, ...options, combineWith: 'OR' })
}

export type { SearchResult }

let indexPromise: Promise<SearchIndex> | null = null

function loadIndex(): Promise<SearchIndex> {
  if (!indexPromise) {
    indexPromise = fetch(siteMetadata.searchIndexPath as string)
      .then((res) => {
        if (!res.ok) throw new Error(`Search index request failed (${res.status})`)
        return res.json()
      })
      .then((data: { pages?: unknown; sections?: unknown }) => {
        if (!Array.isArray(data?.pages) || !Array.isArray(data?.sections)) {
          throw new Error('Search index has an unexpected format')
        }
        const pages = data.pages as SearchPage[]
        const sections = data.sections as SearchSection[]
        // The edition's name ("Faved Cloud", "Self-hosted") is searchable, so typing it finds its pages.
        const editionLabel = (edition: Edition | null) => (edition ? EDITIONS[edition].label : '')

        const pagesSearch = new MiniSearch<SearchPage>({
          fields: ['title', 'description', 'tags', 'edition'],
          storeFields: ['id'],
          extractField: (doc, field) => {
            if (field === 'tags') return doc.tags.join(' ')
            if (field === 'edition') return editionLabel(doc.edition)
            return doc[field as keyof SearchPage] as string
          },
          searchOptions: { boost: { title: 3, tags: 1.5 } },
        })
        pagesSearch.addAll(pages)

        const sectionsSearch = new MiniSearch<SearchSection>({
          fields: ['heading', 'pageTitle', 'text', 'edition'],
          storeFields: ['id', 'edition'],
          extractField: (doc, field) =>
            field === 'edition'
              ? editionLabel(doc.edition)
              : (doc[field as keyof SearchSection] as string),
          searchOptions: { boost: { heading: 3, pageTitle: 2 } },
        })
        sectionsSearch.addAll(sections)

        return { pages, sections, pagesSearch, sectionsSearch }
      })
      .catch((error) => {
        indexPromise = null
        throw error
      })
  }
  return indexPromise
}

/** Lazily loads the search index; `enabled` defers the request until search is first needed. */
export function useSearchIndex(enabled: boolean) {
  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!enabled || index) return
    let cancelled = false
    setError(false)
    loadIndex()
      .then((loaded) => !cancelled && setIndex(loaded))
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [enabled, index])

  return { index, error }
}

/** Warm the index while the browser is idle, so the first search is instant. */
export function prefetchSearchIndex() {
  const run = () => loadIndex().catch(() => {})
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2000)
}
