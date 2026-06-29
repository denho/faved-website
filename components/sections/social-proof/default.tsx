import { ReactNode } from 'react'

import Image from '@/components/Image'

import { Github, Reddit, Youtube } from '@/components/social-icons/icons'

import Marquee from '../../ui/marquee'
import { Section } from '../../ui/section'

type Source = 'github' | 'reddit' | 'youtube'

interface Praise {
  /** The quote, kept short (~120 chars). */
  quote: string
  /** Handle as shown on the platform, e.g. "denho" or "u/someone". */
  username: string
  /** Optional ISO date (YYYY-MM-DD) of the original comment. */
  date?: string
  /** Optional avatar image (path under /public, e.g. "/static/images/testimonials/x.jpg"). */
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

const SOURCE_META: Record<Source, { label: string; icon: ReactNode; prefix: string }> = {
  github: { label: 'GitHub', icon: <Github className="size-[18px] fill-current" />, prefix: '@' },
  reddit: { label: 'Reddit', icon: <Reddit className="size-[18px] fill-current" />, prefix: 'u/' },
  youtube: {
    label: 'YouTube',
    icon: <Youtube className="size-[18px] fill-current" />,
    prefix: '@',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const DEFAULT_PRAISE: Praise[] = [
  {
    quote:
      'Hello! Just came across this app and really impressed by it, especially how lightweight it is. My Karakeep instance uses 410MB of RAM, whereas Faved is running on 32MB. Love it',
    username: 'UncleArya',
    avatar: '/static/images/avatars/UncleArya.png',
    date: '',
    source: 'github',
    href: 'https://github.com/denho/faved/issues/43',
  },
  {
    quote:
      'Thank you for creating Faved! I have tried a few alternative in recent months and this is the most clean and easy-to-use solution I have came across.',
    username: 'Nyokinokonoko',
    avatar: '/static/images/avatars/Nyokinokonoko.jpg',
    date: '',
    source: 'github',
    href: 'https://github.com/denho/faved/issues/12',
  },
  {
    quote:
      'Nested tags for bookmarks is such a smart way to organize. Flat folder systems fall apart once you have more than a few hundred links. Bookmarking this project to try out this weekend. Clean UI too. Nice work building something that actually scales.',
    username: 'ShineDigga',
    date: '',
    source: 'reddit',
    href: 'https://www.reddit.com/r/selfhosted/comments/1te0f87/comment/om0ae1m/',
  },
  {
    quote: "I'm using it in my homelab, it's an excellent, very lightweight tool, tks 🙏",
    username: 'Electrical_Swim4312',
    date: '',
    source: 'reddit',
    href: 'https://www.reddit.com/r/selfhosted/comments/1te0f87/comment/olz98jo/',
  },
  {
    quote:
      'Just discovered faved and the organisation with hierarchical tags is perfect. I use Obsidian like that as well and find it to be very efficient.\n' +
      '…\n' +
      "Looking forward to how Faved will evolve, it's already one of the best bookmark managers I've used and will only get better.",
    username: 'styxbe',
    date: '',
    source: 'github',
    href: 'https://github.com/denho/faved/discussions/41',
  },
  {
    quote:
      'This is such a cool project! I remember the time i used pocket. So it is nice to see you’re giving the community a open source alternative! 👍🏻',
    username: 'lemsoe',
    date: '',
    source: 'reddit',
    href: 'https://www.reddit.com/r/SideProject/comments/1nx653n/comment/nhl7lez/',
  },
  {
    quote:
      "I found your project some days ago and I think I've never wished so much to know how to deploy it to my web hosting! It looks really amazing, with a beautiful and simple interface and very promising.\n" +
      "Congrats for the great work! I'm already studying how to install it!",
    username: 'fre4kshow',
    date: '',
    source: 'reddit',
    href: 'https://www.reddit.com/r/BookmarkManagers/comments/1nwdfb1/comment/nhgryp1/',
  },
  {
    quote:
      'A bookmark manager that I genuinely should have installed a while ago... The way a bookmark manager is actually supposed to work',
    username: 'DBTechYT (David Burgess)',
    avatar: '/static/images/avatars/DBTechYT.jpg',
    source: 'youtube',
    href: 'https://www.youtube.com/@DBTechYT',
  },
]

function PraiseCard({ item }: { item: Praise }) {
  const meta = SOURCE_META[item.source]
  const handle = item.username.startsWith(meta.prefix)
    ? item.username
    : `${meta.prefix}${item.username}`

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener nofollow ugc"
      aria-label={`Read ${handle}'s comment on ${meta.label}`}
      className="group/card border-border/[0.12] hover:border-border/25 flex h-full w-[330px] shrink-0 flex-col gap-4 rounded-[16px] border bg-[linear-gradient(180deg,color-mix(in_oklch,var(--foreground)_4%,transparent),transparent)] p-6 transition-colors sm:w-[380px]"
    >
      <div className="flex items-center gap-3">
        {item.avatar && (
          <Image
            src={item.avatar}
            alt=""
            width={44}
            height={44}
            className="size-10 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-semibold">{handle}</span>
          <span className="text-muted-foreground truncate text-xs">
            {meta.label}
            {item.date && ` · ${formatDate(item.date)}`}
          </span>
        </div>
        <span className="text-muted-foreground/40 group-hover/card:text-muted-foreground ml-auto shrink-0 transition-colors">
          {meta.icon}
        </span>
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed text-pretty">{item.quote}</p>
    </a>
  )
}

export default function SocialProof({
  title = 'Loved by the community',
  description = 'What people are saying on GitHub, Reddit, and YouTube.',
  items = DEFAULT_PRAISE,
  className,
}: SocialProofProps) {
  if (items === false || items.length === 0) return null

  // Split into two rows scrolling in opposite directions.
  const mid = Math.ceil(items.length / 2)
  const rows = [items.slice(0, mid), items.slice(mid)].filter((row) => row.length > 0)

  return (
    <Section className={className}>
      <div className="flex flex-col gap-12">
        <div className="max-w-container mx-auto flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-balance sm:text-5xl">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="fade-x max-w-container mx-auto w-full overflow-hidden">
          {/* Two rows scrolling in opposite directions */}
          <div className="flex flex-col gap-4">
            {rows.map((row, i) => (
              <Marquee key={i} pauseOnHover reverse={i % 2 === 1} className="[--duration:50s]">
                {row.map((item) => (
                  <PraiseCard key={item.href + item.username} item={item} />
                ))}
              </Marquee>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
