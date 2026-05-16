'use client'

import { Github } from '@/components/social-icons/icons'
import { Star } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'
import { Button } from './ui/button'

const hoverCls =
  'transition-colors group-hover/stars:bg-accent group-hover/stars:text-accent-foreground'

export default function GithubStars() {
  const stars = 989

  return (
    <Button
      variant="outline"
      size="default"
      className="group/stars flex h-7 items-stretch gap-0 overflow-hidden px-0 py-0"
      asChild
    >
      <a href={siteMetadata.github} target="_blank" rel="noopener">
        <div className={`flex items-center gap-1.5 px-2.5 ${hoverCls}`}>
          <Github className="h-3.5! w-3.5! fill-current" />
          <span className="text-[11px] font-semibold tracking-wider">Star</span>
        </div>
        <div
          className={`border-input bg-muted/50 flex h-full items-center gap-1.5 border-l px-2.5 text-[10px] font-bold tabular-nums ${hoverCls}`}
        >
          <Star className="size-3! fill-orange-400 text-orange-400" />
          {stars.toLocaleString()}
        </div>
      </a>
    </Button>
  )
}
