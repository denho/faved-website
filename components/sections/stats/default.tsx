import { Section } from '../../ui/section'
import siteMetadata from '@/data/siteMetadata'
import { ExternalLink } from 'lucide-react'

interface StatItemProps {
  label?: string
  value: string | number
  suffix?: string
  description?: string
  href?: string
}

interface StatsProps {
  items?: StatItemProps[] | false
  className?: string
}

function formatToThousands(value: number) {
  return Math.round(value / 100) / 10
}

const DEFAULT_STATS: StatItemProps[] = [
  {
    label: 'clones + forks',
    value: formatToThousands(3000) + 'k+',
    // suffix: "k",
    description: 'on GitHub ', // Calculated as average from 8 measurements of clones from 14-day stats
    href: siteMetadata.github,
  },
  {
    label: 'stars',
    value: 989,
    description: 'on GitHub ',
    href: siteMetadata.github,
  },
  {
    label: 'image pulls',
    value: formatToThousands(10000) + 'k+',
    // suffix: "k",
    description: 'from DockerHub ',
    href: siteMetadata.dockerHub,
  },
  {
    label: 'users',
    value: 70 + '+',
    description: 'of Cloud version ',
    href: `${siteMetadata.cloudUrl}?ref=stats`,
  },
]

export default function Stats({ items = DEFAULT_STATS, className }: StatsProps) {
  return (
    <Section className={className}>
      <div className="container mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item) => {
              const content = (
                <>
                  <div className="flex items-center gap-2">
                    {item.label && (
                      <div className="text-muted-foreground text-sm font-semibold first-letter:uppercase">
                        {item.label}
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl">
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </>
              )

              return (
                <div
                  key={`${item.label}-${item.description}`}
                  className="flex flex-col items-start gap-3 text-left"
                >
                  {content}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Section>
  )
}
