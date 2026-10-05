import Link from '@/components/Link'
import { EDITIONS, type Edition } from './editions'

/** The row of edition tabs under the navbar on docs pages. */
export default function DocsTabs({ edition }: { edition: Edition }) {
  return (
    <div className="border-border/60 dark:border-border/15 relative -mx-4 border-b px-4">
      <nav aria-label="Documentation" className="max-w-container mx-auto flex h-11 gap-6">
        {(Object.keys(EDITIONS) as Edition[]).map((key) => {
          const active = key === edition
          return (
            <Link
              key={key}
              href={EDITIONS[key].intro}
              aria-current={active ? 'page' : undefined}
              className={`relative flex items-center text-sm font-medium whitespace-nowrap transition-colors ${
                active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {EDITIONS[key].label}
              {active && (
                <span className="bg-foreground absolute inset-x-0 -bottom-px h-0.5 rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
