'use client'

import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/components/lib/utils'
import { SearchScope } from './commands'
import { Kbd } from './CommandPalette'
import { useSearch } from './SearchContext'

const LABELS: Partial<Record<SearchScope, string>> = {
  docs: 'Search docs…',
  blog: 'Search blog…',
}

/**
 * Input-styled button that opens the command palette scoped to one section,
 * so it is clear the search belongs to the docs or the blog.
 */
export default function SearchField({
  scope,
  shortcut = '/',
  className,
}: {
  scope: Exclude<SearchScope, 'global'>
  /** Hint shown on the right: "/" or "mod+k" (rendered as ⌘K / Ctrl K). */
  shortcut?: '/' | 'mod+k'
  className?: string
}) {
  const { openSearch } = useSearch()
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  return (
    <button
      type="button"
      onClick={() => openSearch(scope)}
      aria-label={LABELS[scope]}
      className={cn(
        'border-border dark:border-border/15 bg-background/40 text-muted-foreground hover:border-border/60 dark:hover:border-border/40 hover:text-foreground flex h-9 w-full items-center gap-2 rounded-lg border px-3 text-sm transition-colors',
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0" />
      <span className="flex-1 truncate text-left">{LABELS[scope]}</span>
      <span className="hidden gap-1 md:flex">
        {shortcut === '/' ? (
          <Kbd>/</Kbd>
        ) : (
          <>
            <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
            <Kbd>K</Kbd>
          </>
        )}
      </span>
    </button>
  )
}
