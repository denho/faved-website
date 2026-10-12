'use client'

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Command as Cmd } from 'cmdk'
import MiniSearch from 'minisearch'
import {
  ArrowRightIcon,
  ChevronRightIcon,
  FileTextIcon,
  HashIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { EDITIONS, Edition, editionOfPath } from '@/components/docs/editions'
import { cn } from '@/components/lib/utils'
import siteMetadata from '@/data/siteMetadata'
import { COMMAND_GROUPS, Command, SearchScope } from './commands'
import { Highlight, snippet } from './highlight'
import { useSearch } from './SearchContext'
import {
  SEARCH_OPTIONS,
  SearchIndex,
  SearchPage,
  SearchSection,
  searchWithFallback,
  useSearchIndex,
} from './useSearchIndex'

const MAX_PAGE_RESULTS = 8
const MAX_DOC_PAGES = 8
const MAX_SECTIONS_PER_PAGE = 3
const EDITION_BOOST = 1.5

const SCOPES: Record<SearchScope, { label: string; placeholder: string }> = {
  global: { label: '', placeholder: 'Type a command or search…' },
  docs: { label: 'Docs', placeholder: 'Search documentation…' },
  blog: { label: 'Blog', placeholder: 'Search blog…' },
}

interface ResultItem {
  id: string
  onSelect: () => void
  content: ReactNode
}

interface ResultGroup {
  heading: ReactNode
  items: ResultItem[]
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'border-border/60 dark:border-border/20 text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-sans text-[11px] font-medium',
        className
      )}
    >
      {children}
    </kbd>
  )
}

function CommandRow({ command }: { command: Command }) {
  const Icon = command.icon
  return (
    <>
      <Icon className="text-muted-foreground size-4 shrink-0" />
      <span className="flex-1 truncate">{command.name}</span>
    </>
  )
}

function PageRow({ page }: { page: SearchPage }) {
  return (
    <>
      <ArrowRightIcon className="text-muted-foreground size-4 shrink-0" />
      <span className="text-muted-foreground shrink-0">
        {page.type === 'docs' && page.edition
          ? `${EDITIONS[page.edition].label} docs`
          : 'Blog post'}
      </span>
      <ChevronRightIcon className="text-muted-foreground/60 size-3.5 shrink-0" />
      <span className="truncate">{page.title}</span>
    </>
  )
}

function SectionRow({ section, terms }: { section: SearchSection; terms: string[] }) {
  const isIntro = !section.url.includes('#')
  const Icon = isIntro ? FileTextIcon : HashIcon
  return (
    <>
      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0 self-start" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">
          <Highlight text={section.heading} terms={terms} />
        </span>
        {section.text && (
          <span className="text-muted-foreground mt-0.5 line-clamp-2 block text-[13px] leading-snug">
            <Highlight text={snippet(section.text, terms)} terms={terms} />
          </span>
        )}
      </span>
    </>
  )
}

// Post dates are calendar dates stored as UTC midnight; format them in UTC so visitors west of
// UTC don't see the previous day.
const formatPostDate = (date: string) =>
  new Date(date).toLocaleDateString(siteMetadata.locale as string, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

function BlogRow({ page, terms }: { page: SearchPage; terms: string[] }) {
  return (
    <>
      <FileTextIcon className="text-muted-foreground mt-0.5 size-4 shrink-0 self-start" />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-3">
          <span className="flex-1 truncate font-medium">
            <Highlight text={page.title} terms={terms} />
          </span>
          <time className="text-muted-foreground shrink-0 text-xs" dateTime={page.date}>
            {formatPostDate(page.date)}
          </time>
        </span>
        {page.description && (
          <span className="text-muted-foreground mt-0.5 line-clamp-1 block text-[13px] leading-snug">
            <Highlight text={page.description} terms={terms} />
          </span>
        )}
      </span>
    </>
  )
}

function useCommandSearch(commands: Command[]) {
  return useMemo(() => {
    const search = new MiniSearch<Command>({
      fields: ['name', 'keywords', 'group'],
      storeFields: ['id'],
      searchOptions: { boost: { name: 3 } },
    })
    search.addAll(commands)
    return search
  }, [commands])
}

export default function CommandPalette() {
  const { open, setOpen, scope, setScope, query, setQuery, commands, navigate, restoreFocus } =
    useSearch()
  const { index, error } = useSearchIndex(open)
  const commandSearch = useCommandSearch(commands)
  const [selected, setSelected] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const trimmed = query.trim()
  const pathname = usePathname()
  // On a docs page, its edition (Faved Cloud or Self-hosted) leads the docs results.
  const edition = pathname.startsWith('/docs') ? editionOfPath(pathname) : null

  const groups = useMemo<ResultGroup[]>(() => {
    const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]))

    if (scope === 'global') {
      return globalResults({ trimmed, commands, commandSearch, index, navigate, setOpen, setScope })
    }
    if (!index) return []
    if (scope === 'docs') return docsResults({ trimmed, index, edition, navigate, byId })
    return blogResults({ trimmed, index, navigate })
  }, [scope, trimmed, edition, commands, commandSearch, index, navigate, setOpen, setScope])

  // Select the first result (and scroll to it) whenever the palette opens or the results change,
  // so Enter never runs an item highlighted in an earlier session.
  const firstId = groups[0]?.items[0]?.id ?? ''
  useEffect(() => {
    if (!open) return
    setSelected(firstId)
    listRef.current?.scrollTo({ top: 0 })
  }, [open, firstId, scope, trimmed])

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && query === '' && scope !== 'global') {
      event.preventDefault()
      setScope('global')
    }
  }

  const isLoading = scope !== 'global' && !index && !error

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content
          data-search-palette
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            // Focus the input, not the first focusable element (the scope chip).
            event.preventDefault()
            inputRef.current?.focus()
          }}
          onCloseAutoFocus={(event) => {
            // Radix has no trigger to return to (the palette opens from many places).
            event.preventDefault()
            restoreFocus()
          }}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] bg-popover border-border dark:border-border/15 fixed top-[10vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border shadow-2xl sm:top-[12vh]"
        >
          <Dialog.Title className="sr-only">Search Faved</Dialog.Title>
          <Cmd
            shouldFilter={false}
            loop
            value={selected}
            onValueChange={setSelected}
            label="Search Faved"
            className="flex flex-col"
            onMouseDown={(event) => {
              // Clicks keep focus in the input, so typing after a click still searches.
              if (event.target !== inputRef.current) event.preventDefault()
            }}
          >
            <div className="border-border dark:border-border/15 flex items-center gap-2 border-b px-4">
              {scope === 'global' ? (
                <SearchIcon className="text-muted-foreground size-4 shrink-0" />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setScope('global')
                    inputRef.current?.focus()
                  }}
                  onKeyDown={(event) => {
                    // Keep Enter/Space on the chip from reaching cmdk, which would open the
                    // highlighted result instead of leaving the scope.
                    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation()
                  }}
                  className="bg-accent/60 text-foreground hover:bg-accent inline-flex shrink-0 items-center gap-1 rounded-md py-0.5 pr-1 pl-2 text-xs font-medium transition-colors"
                  aria-label={`Leave ${SCOPES[scope].label} search`}
                >
                  {SCOPES[scope].label}
                  <XIcon className="size-3" />
                </button>
              )}
              <Cmd.Input
                ref={inputRef}
                value={query}
                onValueChange={setQuery}
                onKeyDown={onInputKeyDown}
                placeholder={SCOPES[scope].placeholder}
                className="placeholder:text-muted-foreground h-14 flex-1 bg-transparent text-base outline-none"
              />
            </div>

            <Cmd.List
              ref={listRef}
              className="max-h-[min(60vh,28rem)] scroll-py-2 overflow-y-auto overscroll-contain p-2"
            >
              {isLoading && <Cmd.Loading>{statusLine('Loading…')}</Cmd.Loading>}
              {error && scope !== 'global' && statusLine('Search is unavailable right now.')}
              {!isLoading && !error && (
                <Cmd.Empty>{statusLine(`No results for “${trimmed}”`)}</Cmd.Empty>
              )}
              {groups.map((group, i) => (
                <Cmd.Group
                  key={i}
                  heading={group.heading}
                  className="[&_[cmdk-group-heading]]:text-muted-foreground mb-1 [&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:gap-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
                >
                  {group.items.map((item) => (
                    <Cmd.Item
                      key={item.id}
                      value={item.id}
                      onSelect={item.onSelect}
                      className="data-[selected=true]:bg-accent/60 text-foreground flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                    >
                      {item.content}
                    </Cmd.Item>
                  ))}
                </Cmd.Group>
              ))}
            </Cmd.List>

            <div className="border-border dark:border-border/15 text-muted-foreground hidden items-center gap-4 border-t px-4 py-2.5 text-xs sm:flex">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>↵</Kbd> to open
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>esc</Kbd> to close
              </span>
              {scope !== 'global' && (
                <span className="ml-auto flex items-center gap-1.5">
                  <Kbd>⌫</Kbd> all commands
                </span>
              )}
            </div>
          </Cmd>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const statusLine = (text: string) => (
  <div className="text-muted-foreground px-3 py-8 text-center text-sm">{text}</div>
)

function globalResults({
  trimmed,
  commands,
  commandSearch,
  index,
  navigate,
  setOpen,
  setScope,
}: {
  trimmed: string
  commands: Command[]
  commandSearch: MiniSearch<Command>
  index: SearchIndex | null
  navigate: (url: string) => void
  setOpen: (open: boolean) => void
  setScope: (scope: SearchScope) => void
}): ResultGroup[] {
  const commandItem = (command: Command): ResultItem => ({
    id: `command:${command.id}`,
    onSelect: () => {
      if (!command.keepOpen) setOpen(false)
      command.perform()
    },
    content: <CommandRow command={command} />,
  })

  if (!trimmed) {
    return COMMAND_GROUPS.map((group) => ({
      heading: group,
      items: commands.filter((c) => c.group === group).map(commandItem),
    })).filter((group) => group.items.length > 0)
  }

  const groups: ResultGroup[] = []
  const commandsById = new Map(commands.map((c) => [c.id, c]))
  const matchedCommands = commandSearch
    .search(trimmed, { ...SEARCH_OPTIONS, fuzzy: false })
    .slice(0, 6)
    .map((r) => commandsById.get(String(r.id)))
    .filter((c): c is Command => Boolean(c))
  if (matchedCommands.length)
    groups.push({ heading: 'Commands', items: matchedCommands.map(commandItem) })

  if (index) {
    const pagesById = new Map(index.pages.map((p) => [p.id, p]))
    const pages = searchWithFallback(index.pagesSearch, trimmed, {})
      .slice(0, MAX_PAGE_RESULTS)
      .map((r) => pagesById.get(String(r.id)))
      .filter((p): p is SearchPage => Boolean(p))
    if (pages.length) {
      groups.push({
        heading: 'Pages',
        items: pages.map((page) => ({
          id: `page:${page.id}`,
          onSelect: () => navigate(page.url),
          content: <PageRow page={page} />,
        })),
      })
    }
  }

  groups.push({
    heading: 'Full-text search',
    items: [
      {
        id: 'search-docs-for',
        onSelect: () => setScope('docs'),
        content: (
          <>
            <SearchIcon className="text-muted-foreground size-4 shrink-0" />
            <span className="truncate">
              Search docs for <span className="font-medium">“{trimmed}”</span>
            </span>
          </>
        ),
      },
    ],
  })
  return groups
}

function docsResults({
  trimmed,
  index,
  edition,
  navigate,
  byId,
}: {
  trimmed: string
  index: SearchIndex
  edition: Edition | null
  navigate: (url: string) => void
  byId: <T extends { id: string }>(items: T[]) => Map<string, T>
}): ResultGroup[] {
  // Name the edition wherever it isn't the one being read, since both have pages of the same name.
  const breadcrumb = (pageEdition: Edition, ...parts: string[]) => (
    <>
      {[pageEdition !== edition ? EDITIONS[pageEdition].label : '', ...parts]
        .filter(Boolean)
        .map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRightIcon className="size-3 opacity-60" />}
            {part}
          </span>
        ))}
    </>
  )

  if (!trimmed) {
    const docsPages = index.pages.filter(
      (p) => p.type === 'docs' && (!edition || p.edition === edition)
    )
    const sections = [...new Set(docsPages.map((p) => `${p.edition}:${p.category}`))]
    return sections.map((key) => {
      const pages = docsPages.filter((p) => `${p.edition}:${p.category}` === key)
      const { edition: pageEdition, category } = pages[0]
      return {
        heading: breadcrumb(pageEdition ?? 'self-hosted', category || 'Docs'),
        items: pages.map((page) => ({
          id: `doc:${page.id}`,
          onSelect: () => navigate(page.url),
          content: (
            <>
              <FileTextIcon className="text-muted-foreground size-4 shrink-0" />
              <span className="truncate">{page.title}</span>
            </>
          ),
        })),
      }
    })
  }

  const sections = byId(index.sections)
  // Favour the edition being read without letting weak matches there bury strong ones elsewhere.
  // (`edition` is stored as its label, since stored fields go through extractField.)
  const currentLabel = edition ? EDITIONS[edition].label : null
  const hits = searchWithFallback(index.sectionsSearch, trimmed, {
    boostDocument: (_id, _term, stored) =>
      currentLabel && stored?.edition === currentLabel ? EDITION_BOOST : 1,
  })
    .map((result) => ({ section: sections.get(String(result.id)), terms: result.terms }))
    .filter((hit): hit is { section: SearchSection; terms: string[] } => Boolean(hit.section))

  const grouped = new Map<string, { section: SearchSection; terms: string[] }[]>()
  for (const hit of hits) {
    const page = hit.section.page
    if (!grouped.has(page)) {
      if (grouped.size >= MAX_DOC_PAGES) continue
      grouped.set(page, [])
    }
    const pageHits = grouped.get(page)!
    if (pageHits.length < MAX_SECTIONS_PER_PAGE) pageHits.push(hit)
  }

  return [...grouped.values()].map((pageHits) => {
    const { pageTitle, category, edition: pageEdition } = pageHits[0].section
    return {
      heading: breadcrumb(pageEdition, category, pageTitle),
      items: pageHits.map(({ section, terms }) => ({
        id: `section:${section.id}`,
        onSelect: () => navigate(section.url),
        content: <SectionRow section={section} terms={terms} />,
      })),
    }
  })
}

function blogResults({
  trimmed,
  index,
  navigate,
}: {
  trimmed: string
  index: SearchIndex
  navigate: (url: string) => void
}): ResultGroup[] {
  const posts = index.pages.filter((p) => p.type === 'blog')
  const postsById = new Map(posts.map((p) => [p.id, p]))

  const hits = trimmed
    ? searchWithFallback(index.pagesSearch, trimmed, { filter: (r) => postsById.has(String(r.id)) })
        .map((r) => ({ page: postsById.get(String(r.id)), terms: r.terms }))
        .filter((hit): hit is { page: SearchPage; terms: string[] } => Boolean(hit.page))
    : posts.map((page) => ({ page, terms: [] as string[] }))

  if (!hits.length) return []
  return [
    {
      heading: trimmed ? 'Blog posts' : 'Latest posts',
      items: hits.map(({ page, terms }) => ({
        id: `post:${page.id}`,
        onSelect: () => navigate(page.url),
        content: <BlogRow page={page} terms={terms} />,
      })),
    },
  ]
}
