import {EclipseIcon, MonitorSmartphoneIcon} from 'lucide-react'
import {ReactNode} from 'react'

import {Item, ItemDescription, ItemIcon, ItemTitle} from '../../ui/item'
import {Section} from '../../ui/section'
import {
  faBolt,
  faBookmark,
  faCodeBranch,
  faFileImport,
  faLink,
  faMagnifyingGlass,
  faSliders,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface ItemProps {
  title: string
  description: string
  icon: ReactNode
}

interface ItemsProps {
  title?: string
  items?: ItemProps[] | false
  className?: string
}

export default function Items({
  title = 'Features',
  items = [
    {
      title: 'Advanced Tagging',
      description:
        'Organize bookmarks with nested tags for structured grouping. Customize tags with colors, and pin the frequently used ones for quick access.',
      icon: <FontAwesomeIcon icon={faTags} className="size-5 stroke-1" />,
    },
    {
      title: 'Smart Bookmark Management',
      description:
        'Automatic fetching of titles, descriptions, and preview images. Built-in duplicate detection helping your collection stay clean.',
      icon: <FontAwesomeIcon icon={faBookmark} className="size-5 stroke-1" />,
    },
    {
      title: 'Powerful UI without Clutter',
      description:
        'Customize layouts (card/list/table), fields, and sidebar to your preference. All major actions are one click away with no need to navigate between screens.',
      icon: <FontAwesomeIcon icon={faBolt} className="size-5 stroke-1" />,
    },
    {
      title: 'Bulk Actions',
      description:
        'Easily manage large sets of bookmarks in one go with bulk deleting, refetching, and tagging.',
      icon: <FontAwesomeIcon icon={faSliders} className="size-5 stroke-1" />,
    },
    {
      title: 'Works on Any Device',
      description:
        'Fully responsive across mobile, tablet, and desktop. Installable as a PWA for an app-like, near-native experience on mobile.',
      icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Light and Dark Mode',
      description:
        'Automatically syncs with your system theme for a comfortable viewing experience in any lighting condition.',
      icon: <EclipseIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Instant Search & Sorting',
      description:
        'Find bookmarks instantly as you type with flexible sorting options across collections of any size.',
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} className="size-5 stroke-1" />,
    },
    {
      title: 'Integrations',
      description:
        'Save links from any browser using a lightweight bookmarklet, or send them via the native Share menu on iPhone, Mac, or iPad.',
      icon: <FontAwesomeIcon icon={faLink} className="size-5 stroke-1" />,
    },
    {
      title: 'Import & Migration',
      description:
        'Import from Chrome, Safari, Firefox, or Edge with folder structure preserved. Migrate from Raindrop.io, Pocket, and other tools retaining collections and tags.',
      icon: <FontAwesomeIcon icon={faFileImport} className="size-5 stroke-1" />,
    },
    {
      title: 'Open Source',
      description: 'Transparent codebase that anyone can inspect and contribute to.',
      icon: <FontAwesomeIcon icon={faCodeBranch} className="size-5 stroke-1" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-5">
            {items.map((item, index) => (
              <Item key={index}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
