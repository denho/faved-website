'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getCookie } from '@/components/lib/utils'
import { Command, PageContext, SearchScope, buildCommands } from './commands'
import CommandPalette from './CommandPalette'
import { prefetchSearchIndex } from './useSearchIndex'

interface SearchContextValue {
  open: boolean
  scope: SearchScope
  query: string
  commands: Command[]
  openSearch: (scope?: SearchScope, query?: string) => void
  setOpen: (open: boolean) => void
  setScope: (scope: SearchScope) => void
  setQuery: (query: string) => void
  navigate: (url: string) => void
  setPage: (page: PageContext | null) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used inside <SearchProvider>')
  return context
}

/** Lets a page add "This page" commands to the palette while it is mounted. */
export function useRegisterPageContext(page: PageContext) {
  const { setPage } = useSearch()
  const { slug, title, rawContent, editUrl } = page
  useEffect(() => {
    setPage({ slug, title, rawContent, editUrl })
    return () => setPage(null)
  }, [setPage, slug, title, rawContent, editUrl])
}

/** The section search the current page belongs to, if any. */
export function scopeForPath(pathname: string): SearchScope {
  if (pathname.startsWith('/docs')) return 'docs'
  if (pathname.startsWith('/blog') || pathname.startsWith('/tags')) return 'blog'
  return 'global'
}

const SEQUENCE_TIMEOUT = 1000

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
    target.closest('[role="dialog"]') !== null
  )
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpenState] = useState(false)
  const [scope, setScope] = useState<SearchScope>('global')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState<PageContext | null>(null)
  const [isAuthed, setIsAuthed] = useState(false)

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next)
    if (next) setIsAuthed(getCookie('faved-logged-in') === '1')
  }, [])

  const openSearch = useCallback(
    (nextScope: SearchScope = 'global', nextQuery = '') => {
      setScope(nextScope)
      setQuery(nextQuery)
      setOpen(true)
    },
    [setOpen]
  )

  const navigate = useCallback(
    (url: string) => {
      setOpenState(false)
      if (/^https?:\/\//.test(url)) window.location.assign(url)
      else router.push(url)
    },
    [router]
  )

  const commands = useMemo(
    () =>
      buildCommands({
        navigate,
        openScope: (next) => {
          setScope(next)
          setQuery('')
        },
        isAuthed,
        page,
      }),
    [navigate, isAuthed, page]
  )

  // Keyboard: ⌘K / Ctrl+K toggles the palette (scoped to the current section), "/" opens the
  // section search, and "G then <key>" runs navigation commands.
  const sectionScope = scopeForPath(pathname)
  const pending = useRef<{ key: string; at: number } | null>(null)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (key === 'k' && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault()
        if (open) setOpenState(false)
        else openSearch(sectionScope === 'docs' ? 'docs' : 'global')
        return
      }

      if (open || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) {
        return
      }

      if (key === '/' && sectionScope !== 'global') {
        event.preventDefault()
        openSearch(sectionScope)
        return
      }

      const now = Date.now()
      const prev = pending.current
      if (prev && now - prev.at < SEQUENCE_TIMEOUT) {
        const command = commands.find(
          (c) =>
            c.shortcut?.length === 2 &&
            c.shortcut[0].toLowerCase() === prev.key &&
            c.shortcut[1].toLowerCase() === key
        )
        pending.current = null
        if (command) {
          event.preventDefault()
          command.perform()
          return
        }
      }
      if (commands.some((c) => c.shortcut?.length === 2 && c.shortcut[0].toLowerCase() === key)) {
        pending.current = { key, at: now }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, openSearch, sectionScope, commands])

  useEffect(() => {
    prefetchSearchIndex()
  }, [])

  const value = useMemo(
    () => ({
      open,
      scope,
      query,
      commands,
      openSearch,
      setOpen,
      setScope,
      setQuery,
      navigate,
      setPage,
    }),
    [open, scope, query, commands, openSearch, setOpen, navigate]
  )

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandPalette />
    </SearchContext.Provider>
  )
}
