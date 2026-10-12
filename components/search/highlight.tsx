import { ReactNode } from 'react'

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function termsPattern(terms: string[]) {
  const unique = [...new Set(terms.filter(Boolean))].sort((a, b) => b.length - a.length)
  if (unique.length === 0) return null
  // Match terms at the start of a word, so "guid" highlights the start of "guide".
  return new RegExp(`(?<![\\p{L}\\p{N}])(${unique.map(escapeRegExp).join('|')})`, 'giu')
}

/** Wrap occurrences of the matched terms in <mark>, without using innerHTML. */
export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const pattern = termsPattern(terms)
  if (!pattern) return <>{text}</>

  const parts: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0
    if (start > last) parts.push(text.slice(last, start))
    parts.push(
      <mark key={start} className="text-foreground bg-transparent font-semibold">
        {match[0]}
      </mark>
    )
    last = start + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

/** Pick a short window of `text` around the first matched term. */
export function snippet(text: string, terms: string[], length = 160) {
  if (text.length <= length) return text
  const pattern = termsPattern(terms)
  const first = pattern ? text.search(pattern) : -1
  if (first < 0) return text.slice(0, length).replace(/\s+\S*$/, '') + '…'

  let start = Math.max(0, first - 40)
  if (start > 0) start = text.indexOf(' ', start) + 1 || start
  let end = Math.min(text.length, start + length)
  if (end < text.length) end = text.lastIndexOf(' ', end) || end

  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}
