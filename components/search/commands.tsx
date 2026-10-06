import { ComponentType, SVGProps } from 'react'
import {
  AppWindowIcon,
  BookOpenIcon,
  CopyIcon,
  CreditCardIcon,
  DownloadIcon,
  HistoryIcon,
  HouseIcon,
  LinkIcon,
  LogInIcon,
  MonitorPlayIcon,
  NewspaperIcon,
  PencilIcon,
  SearchIcon,
  ServerIcon,
  SparklesIcon,
  UserPlusIcon,
} from 'lucide-react'
import * as Brand from '@/components/social-icons/icons'
import { cn } from '@/components/lib/utils'
import { EDITIONS } from '@/components/docs/editions'
import { aiChatUrls } from '@/components/ui/page-actions'
import siteMetadata from '@/data/siteMetadata'

export type SearchScope = 'global' | 'docs' | 'blog'

/** Extra commands a page offers while it is open (registered by DocsLayout). */
export interface PageContext {
  slug: string
  title: string
  rawContent: string
  editUrl: string
}

export interface Command {
  id: string
  name: string
  group: 'App' | 'Navigation' | 'Search' | 'This page' | 'Links'
  icon: ComponentType<SVGProps<SVGSVGElement>>
  keywords?: string
  /** Key sequence, e.g. ['G', 'D'] — also works outside the palette. */
  shortcut?: string[]
  perform: () => void
}

export interface CommandContext {
  navigate: (url: string) => void
  openScope: (scope: SearchScope) => void
  isAuthed: boolean
  page: PageContext | null
}

export const COMMAND_GROUPS: Command['group'][] = [
  'App',
  'Navigation',
  'Search',
  'This page',
  'Links',
]

// Brand marks are filled shapes; lucide icons are strokes with fill="none".
const filled =
  (Icon: ComponentType<SVGProps<SVGSVGElement>>) =>
  ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <Icon aria-hidden {...props} className={cn('fill-current', className)} />
  )
const Claude = filled(Brand.Claude)
const OpenAI = filled(Brand.OpenAI)
const Github = filled(Brand.Github)
const Discord = filled(Brand.Discord)
const X = filled(Brand.X)

const site = siteMetadata as unknown as Record<
  'appUrl' | 'cloudUrl' | 'changelogUrl' | 'github' | 'discord' | 'x',
  string
>

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')
const copy = (text: string) => navigator.clipboard?.writeText(text)

export function buildCommands({ navigate, openScope, isAuthed, page }: CommandContext): Command[] {
  const app: Command[] = isAuthed
    ? [
        {
          id: 'open-app',
          name: 'Open Faved',
          group: 'App',
          icon: AppWindowIcon,
          keywords: 'app launch dashboard',
          perform: () => navigate(`${site.appUrl}/?cta=cmdk-open-app`),
        },
      ]
    : [
        {
          id: 'sign-in',
          name: 'Sign in to Faved',
          group: 'App',
          icon: LogInIcon,
          keywords: 'log in login account',
          perform: () => navigate(`${site.appUrl}/login?cta=cmdk-signin`),
        },
        {
          id: 'sign-up',
          name: 'Try Faved for free',
          group: 'App',
          icon: UserPlusIcon,
          keywords: 'sign up signup register trial cloud get started',
          perform: () => navigate(`${site.cloudUrl}?cta=cmdk-get-started`),
        },
      ]

  const commands: Command[] = [
    ...app,
    {
      id: 'go-home',
      name: 'Go to Home',
      group: 'Navigation',
      icon: HouseIcon,
      keywords: 'homepage start landing',
      shortcut: ['G', 'H'],
      perform: () => navigate('/'),
    },
    {
      id: 'go-features',
      name: 'Go to Features',
      group: 'Navigation',
      icon: SparklesIcon,
      keywords: 'product overview what',
      shortcut: ['G', 'F'],
      perform: () => navigate('/#features'),
    },
    {
      id: 'go-pricing',
      name: 'Go to Pricing',
      group: 'Navigation',
      icon: CreditCardIcon,
      keywords: 'plans cost price cloud self-host team',
      shortcut: ['G', 'P'],
      perform: () => navigate('/#pricing'),
    },
    {
      id: 'go-docs',
      name: 'Go to Faved Cloud docs',
      group: 'Navigation',
      icon: BookOpenIcon,
      keywords: 'documentation help guides manual cloud',
      shortcut: ['G', 'D'],
      perform: () => navigate(EDITIONS.cloud.intro),
    },
    {
      id: 'go-docs-self-hosted',
      name: 'Go to Self-hosted docs',
      group: 'Navigation',
      icon: ServerIcon,
      keywords: 'documentation help guides manual self-host docker',
      shortcut: ['G', 'S'],
      perform: () => navigate(EDITIONS['self-hosted'].intro),
    },
    {
      id: 'go-blog',
      name: 'Go to Blog',
      group: 'Navigation',
      icon: NewspaperIcon,
      keywords: 'news articles posts updates announcements',
      shortcut: ['G', 'B'],
      perform: () => navigate('/blog'),
    },
    {
      id: 'go-installation',
      name: 'Go to Installation guide',
      group: 'Navigation',
      icon: DownloadIcon,
      keywords: 'install self-host docker setup',
      shortcut: ['G', 'I'],
      perform: () => navigate('/docs/getting-started/installation'),
    },
    {
      id: 'go-changelog',
      name: 'Go to Changelog',
      group: 'Navigation',
      icon: HistoryIcon,
      keywords: 'releases versions what is new',
      shortcut: ['G', 'C'],
      perform: () => openExternal(site.changelogUrl),
    },
    {
      id: 'search-docs',
      name: 'Search documentation…',
      group: 'Search',
      icon: SearchIcon,
      keywords: 'docs help find',
      perform: () => openScope('docs'),
    },
    {
      id: 'search-blog',
      name: 'Search blog…',
      group: 'Search',
      icon: SearchIcon,
      keywords: 'posts articles find',
      perform: () => openScope('blog'),
    },
  ]

  if (page) {
    const { claudeUrl, chatgptUrl } = aiChatUrls(page.slug)
    commands.push(
      {
        id: 'page-copy-markdown',
        name: 'Copy page as Markdown',
        group: 'This page',
        icon: CopyIcon,
        keywords: 'clipboard md source',
        perform: () => copy(page.rawContent),
      },
      {
        id: 'page-ask-claude',
        name: 'Ask Claude about this page',
        group: 'This page',
        icon: Claude,
        keywords: 'ai chat question',
        perform: () => openExternal(claudeUrl),
      },
      {
        id: 'page-ask-chatgpt',
        name: 'Ask ChatGPT about this page',
        group: 'This page',
        icon: OpenAI,
        keywords: 'ai chat question openai',
        perform: () => openExternal(chatgptUrl),
      },
      {
        id: 'page-edit',
        name: 'Edit this page on GitHub',
        group: 'This page',
        icon: PencilIcon,
        keywords: 'contribute fix typo source',
        perform: () => openExternal(page.editUrl),
      }
    )
  }

  commands.push(
    {
      id: 'copy-url',
      name: 'Copy current URL',
      group: 'This page',
      icon: LinkIcon,
      keywords: 'link share clipboard',
      perform: () => copy(window.location.href),
    },
    {
      id: 'github',
      name: 'Star Faved on GitHub',
      group: 'Links',
      icon: Github,
      keywords: 'source code open source repository',
      perform: () => openExternal(site.github),
    },
    {
      id: 'discord',
      name: 'Join the Discord community',
      group: 'Links',
      icon: Discord,
      keywords: 'chat support help community',
      perform: () => openExternal(site.discord),
    },
    {
      id: 'x',
      name: 'Follow Faved on X',
      group: 'Links',
      icon: X,
      keywords: 'twitter social news',
      perform: () => openExternal(site.x),
    }
  )

  return commands
}
