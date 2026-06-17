import Link from 'next/link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'

interface Props {
  text: string
  // Optional display override; `text` still drives the slug, colour and href.
  label?: string
  // When true renders a non-linking span with a brighter active style.
  isActive?: boolean
}

// Full, static class strings — no interpolation so Tailwind's JIT keeps them.
// Each entry: [inactive, active]
const namedColors: Record<string, [string, string]> = {
  update: [
    'bg-blue-500/15 text-blue-300 hover:bg-blue-500/25',
    'bg-blue-500/30 text-blue-200 cursor-default',
  ],
  announcement: [
    'bg-orange-500/15 text-orange-300 hover:bg-orange-500/25',
    'bg-orange-500/30 text-orange-200 cursor-default',
  ],
  tutorial: [
    'bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500/25',
    'bg-yellow-500/30 text-yellow-200 cursor-default',
  ],
}

const fallbackColors: [string, string][] = [
  [
    'bg-violet-500/15 text-violet-300 hover:bg-violet-500/25',
    'bg-violet-500/30 text-violet-200 cursor-default',
  ],
  [
    'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25',
    'bg-emerald-500/30 text-emerald-200 cursor-default',
  ],
  [
    'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25',
    'bg-rose-500/30 text-rose-200 cursor-default',
  ],
  [
    'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25',
    'bg-cyan-500/30 text-cyan-200 cursor-default',
  ],
  [
    'bg-fuchsia-500/15 text-fuchsia-300 hover:bg-fuchsia-500/25',
    'bg-fuchsia-500/30 text-fuchsia-200 cursor-default',
  ],
  [
    'bg-lime-500/15 text-lime-300 hover:bg-lime-500/25',
    'bg-lime-500/30 text-lime-200 cursor-default',
  ],
]

const tagOrder = Object.keys(tagData as Record<string, number>).sort()

function colorForTag(text: string, isActive = false) {
  const key = slug(text)
  const pair =
    namedColors[key] ??
    (() => {
      const index = tagOrder.filter((t) => !namedColors[t]).indexOf(key)
      return fallbackColors[Math.max(0, index) % fallbackColors.length]
    })()
  return pair[isActive ? 1 : 0]
}

const Tag = ({ text, label, isActive = false }: Props) => {
  const className = `mr-2 mb-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition-colors ${colorForTag(text, isActive)}`
  const display = label ?? text
  if (isActive) {
    return <span className={className}>{display}</span>
  }
  return (
    <Link href={`/tags/${slug(text)}`} className={className}>
      {display}
    </Link>
  )
}

export default Tag
