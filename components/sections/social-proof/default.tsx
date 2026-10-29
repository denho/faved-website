import { ReactNode } from 'react'

import Image from '@/components/Image'

import { Github, Reddit, Youtube } from '@/components/social-icons/icons'

import { ArrowRightIcon } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/components/lib/utils'

import { Button } from '../../ui/button'
import { Section } from '../../ui/section'
import { ShowMore } from '@/components/ui/show-more'
import { StatsRow } from '@/components/ui/stats-row'

// Cards shown on mobile before "Show more"; the rest are revealed on tap.
const MOBILE_VISIBLE = 4

type Source = 'github' | 'reddit' | 'youtube'

interface Praise {
  /** The quote, kept short (~120 chars). */
  quote: string
  /** Handle as shown on the platform, e.g. "denho" or "u/someone". */
  username: string
  /** Optional avatar image (path under /public); falls back to the handle's initial. */
  avatar?: string
  /** Where it was posted. */
  source: Source
  /** Permalink to the original comment. */
  href: string
}

interface SocialProofProps {
  title?: string
  description?: string
  items?: Praise[] | false
  className?: string
}

interface SourceMeta {
  label: string
  icon: ReactNode
  prefix: string
  /** Tint for the initial-letter avatar fallback. */
  tint: string
}

const SOURCE_META: Record<Source, SourceMeta> = {
  github: {
    label: 'GitHub',
    icon: <Github className="size-[18px] fill-current" />,
    prefix: '@',
    tint: 'var(--foreground)',
  },
  reddit: {
    label: 'Reddit',
    icon: <Reddit className="size-[18px] fill-current" />,
    prefix: 'u/',
    tint: '#ff4500',
  },
  youtube: {
    label: 'YouTube',
    icon: <Youtube className="size-[18px] fill-current" />,
    prefix: '@',
    tint: '#ff0033',
  },
}

const DEFAULT_PRAISE: Praise[] = [
  {
    quote:
      "I found your project some days ago and I think I've never wished so much to know how to deploy it to my web hosting! It looks really amazing, with a beautiful and simple interface and very promising.\n" +
      "Congrats for the great work! I'm already studying how to install it!",
    username: 'fre4kshow',
    source: 'reddit',
    href: 'https://www.reddit.com/r/BookmarkManagers/comments/1nwdfb1/comment/nhgryp1/',
  },
  {
    quote:
      'Just discovered faved and the organisation with hierarchical tags is perfect. I use Obsidian like that as well and find it to be very efficient.\n' +
      '…\n' +
      "Looking forward to how Faved will evolve, it's already one of the best bookmark managers I've used and will only get better.",
    username: 'styxbe',
    source: 'github',
    href: 'https://github.com/denho/faved/discussions/41',
  },
  {
    quote:
      'Hello! Just came across this app and really impressed by it, especially how lightweight it is. My Karakeep instance uses 410MB of RAM, whereas Faved is running on 32MB. Love it',
    username: 'UncleArya',
    avatar: '/static/images/avatars/UncleArya.png',
    source: 'github',
    href: 'https://github.com/denho/faved/issues/43',
  },
  {
    quote: "I'm using it in my homelab, it's an excellent, very lightweight tool, tks 🙏",
    username: 'Electrical_Swim4312',
    source: 'reddit',
    href: 'https://www.reddit.com/r/selfhosted/comments/1te0f87/comment/olz98jo/',
  },
  {
    quote:
      'Nested tags for bookmarks is such a smart way to organize. Flat folder systems fall apart once you have more than a few hundred links. Bookmarking this project to try out this weekend. Clean UI too. Nice work building something that actually scales.',
    username: 'ShineDigga',
    source: 'reddit',
    href: 'https://www.reddit.com/r/selfhosted/comments/1te0f87/comment/om0ae1m/',
  },
  {
    quote:
      'This is such a cool project! I remember the time i used pocket. So it is nice to see you’re giving the community a open source alternative! 👍🏻',
    username: 'lemsoe',
    source: 'reddit',
    href: 'https://www.reddit.com/r/SideProject/comments/1nx653n/comment/nhl7lez/',
  },
  {
    quote:
      'A bookmark manager that I genuinely should have installed a while ago... The way a bookmark manager is actually supposed to work',
    username: 'DBTechYT (David Burgess)',
    avatar: '/static/images/avatars/DBTechYT.jpg',
    source: 'youtube',
    href: 'https://www.youtube.com/@DBTechYT',
  },

  {
    quote:
      'Thank you for creating Faved! I have tried a few alternative in recent months and this is the most clean and easy-to-use solution I have came across.',
    username: 'Nyokinokonoko',
    avatar: '/static/images/avatars/Nyokinokonoko.jpg',
    source: 'github',
    href: 'https://github.com/denho/faved/issues/12',
  },
]

function Avatar({ item, tint }: { item: Praise; tint: string }) {
  if (item.avatar) {
    return (
      <Image
        src={item.avatar}
        alt=""
        width={44}
        height={44}
        className="size-10 shrink-0 rounded-full object-cover"
      />
    )
  }

  const initial = item.username.match(/[a-z0-9]/i)?.[0]?.toUpperCase() ?? '?'

  return (
    <span
      aria-hidden="true"
      style={{
        color: `color-mix(in oklch, ${tint} 85%, var(--foreground))`,
        background: `color-mix(in oklch, ${tint} 16%, transparent)`,
      }}
      className="flex size-10 shrink-0 items-center justify-center rounded-full text-base font-semibold"
    >
      {initial}
    </span>
  )
}

function PraiseCard({ item }: { item: Praise }) {
  const meta = SOURCE_META[item.source]
  const handle = item.username.startsWith(meta.prefix)
    ? item.username
    : `${meta.prefix}${item.username}`

  return (
    <figure className="border-border/[0.12] flex w-full flex-col gap-4 rounded-[16px] border bg-[linear-gradient(180deg,color-mix(in_oklch,var(--foreground)_4%,transparent),transparent)] p-6">
      <figcaption>
        <a
          href={item.href}
          target="_blank"
          rel="noopener nofollow ugc"
          aria-label={`Read ${handle}'s comment on ${meta.label}`}
          className="group/link focus-visible:ring-ring flex items-center gap-3 rounded-md outline-hidden focus-visible:ring-1"
        >
          <Avatar item={item} tint={meta.tint} />
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-semibold underline-offset-4 group-hover/link:underline">
              {handle}
            </span>
            <span className="text-muted-foreground truncate text-xs">{meta.label}</span>
          </div>
          <span className="text-muted-foreground/40 group-hover/link:text-muted-foreground ml-auto shrink-0 transition-colors">
            {meta.icon}
          </span>
        </a>
      </figcaption>
      <blockquote className="text-foreground/80 text-sm leading-relaxed text-pretty">
        {item.quote}
      </blockquote>
    </figure>
  )
}

export default function SocialProof({
  title = 'Join a community of organized, productive people',
  description = 'Why do people stick with Faved? We asked the internet.',
  items = DEFAULT_PRAISE,
  className,
}: SocialProofProps) {
  if (items === false || items.length === 0) return null

  return (
    <Section className={className} id="community">
      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="max-w-container mx-auto flex flex-col items-center gap-4 text-center sm:mb-4">
          <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
              {description}
            </p>
          )}
        </div>

        <ShowMore
          label={`Show all ${items.length} quotes`}
          className="max-w-container mx-auto w-full"
        >
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <div
                key={item.href + item.username}
                className={cn(
                  'mb-4 break-inside-avoid',
                  i >= MOBILE_VISIBLE && 'max-sm:group-data-[expanded=false]/show-more:hidden'
                )}
              >
                <PraiseCard item={item} />
              </div>
            ))}
          </div>
        </ShowMore>

        <div className="border-border/[0.12] mx-auto w-full max-w-[960px] border-t pt-12 sm:pt-16">
          <StatsRow />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="default" size="lg" asChild>
            <a href={`${siteMetadata.cloudUrl}?cta=social-proof`}>
              <ArrowRightIcon className="mr-2 size-4" />
              Try for free
            </a>
          </Button>
          <Button variant="glow" size="lg" asChild>
            <a href={siteMetadata.github} target="_blank" rel="noopener">
              <Github className="fill-current" />
              Star on GitHub
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
