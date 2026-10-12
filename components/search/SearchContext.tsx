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
  /** Return focus to whatever had it before the palette opened. */
  restoreFocus: () => void
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

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

/** ⌘K on macOS, Ctrl+K elsewhere (Ctrl+K on a Mac is a text-editing shortcut). */
function isPaletteShortcut(event: KeyboardEvent) {
  if (typeof event.key !== 'string' || event.key.toLowerCase() !== 'k') return false
  if (event.shiftKey || event.altKey) return false
  return isMac() ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey
}

/** Another modal (e.g. the mobile navigation sheet) is open. */
const otherDialogOpen = () =>
  document.querySelector('[role="dialog"][data-state="open"]:not([data-search-palette])') !== null

const TOAST_DURATION = 2000

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpenState] = useState(false)
  const [scope, setScope] = useState<SearchScope>('global')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState<PageContext | null>(null)
  const [isAuthed, setIsAuthed] = useState(false)

  const [toast, setToast] = useState<string | null>(null)
  const opener = useRef<HTMLElement | null>(null)

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      // Remember the opener before the dialog moves focus into itself.
      if (document.activeElement instanceof HTMLElement) opener.current = document.activeElement
      setIsAuthed(getCookie('faved-logged-in') === '1')
    }
    setOpenState(next)
  }, [])

  const restoreFocus = useCallback(() => {
    const element = opener.current
    opener.current = null
    if (element?.isConnected && element !== document.body) element.focus({ preventScroll: true })
  }, [])

  const notify = useCallback((message: string) => setToast(message), [])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toast])

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
        notify,
      }),
    [navigate, isAuthed, page, notify]
  )

  // ⌘K / Ctrl+K toggles the palette; on docs pages it opens straight into docs search.
  const sectionScope = scopeForPath(pathname)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !isPaletteShortcut(event)) return
      if (!open && otherDialogOpen()) return
      event.preventDefault()
      if (open) setOpenState(false)
      else openSearch(sectionScope === 'docs' ? 'docs' : 'global')
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, openSearch, sectionScope])

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
      restoreFocus,
    }),
    [open, scope, query, commands, openSearch, setOpen, navigate, restoreFocus]
  )

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandPalette />
      <div
        role="status"
        aria-live="polite"
        className={`bg-popover text-foreground border-border dark:border-border/15 pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg border px-4 py-2 text-sm shadow-lg transition-opacity duration-200 ${toast ? 'opacity-100' : 'opacity-0'}`}
      >
        {toast}
      </div>
    </SearchContext.Provider>
  )
}
