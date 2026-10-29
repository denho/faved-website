import { ExternalLink } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'

export interface StatItemProps {
  label?: string
  value: string | number
  suffix?: string
  description?: string
  href?: string
}

function formatToThousands(value: number) {
  return Math.round(value / 100) / 10
}

export const DEFAULT_STATS: StatItemProps[] = [
  {
    label: 'stars',
    value: formatToThousands(siteMetadata.stats.githubStars as number) + 'k+',
    description: 'on GitHub ',
    href: siteMetadata.github,
  },
  {
    label: 'clones + forks',
    value: formatToThousands(siteMetadata.stats.githubClonesForks as number) + 'k+',
    description: 'on GitHub ',
    href: siteMetadata.github,
  },
  {
    label: 'image pulls',
    value: formatToThousands(siteMetadata.stats.dockerHubPulls as number) + 'k+',
    description: 'from DockerHub ',
    href: siteMetadata.dockerHub,
  },
]

export function StatsRow({ stats = DEFAULT_STATS }: { stats?: StatItemProps[] }) {
  if (stats.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-12">
        {stats.map((item) => (
          <div
            key={`${item.label}-${item.description}`}
            className="flex flex-col items-start gap-3 text-left"
          >
            <div className="flex items-center gap-2">
              {item.label && (
                <div className="text-muted-foreground text-sm font-semibold first-letter:uppercase">
                  {item.label}
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <div className="from-foreground to-foreground dark:to-brand selection:bg-brand bg-linear-to-r bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 selection:text-gray-100 sm:text-5xl md:text-6xl">
                {item.value}
              </div>
              {item.suffix && (
                <div className="text-brand text-2xl font-semibold">{item.suffix}</div>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold text-pretty">
              {item.description}
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${item.label ?? ''} ${item.description ?? ''}`.trim()}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
