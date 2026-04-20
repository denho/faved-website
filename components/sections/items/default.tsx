import { EclipseIcon, LanguagesIcon, MonitorSmartphoneIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { Item, ItemDescription, ItemIcon, ItemTitle } from '../../ui/item'
import { Section } from '../../ui/section'
import {
  faBolt,
  faBookmark,
  faCodeBranch,
  faFileImport,
  faMagnifyingGlass,
  faServer,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      title: 'Self-Hosted',
      description:
        'Keep your bookmarks on your own computer or server. Your data is stored locally and belongs to you.',
      icon: <FontAwesomeIcon icon={faServer} className="size-5 stroke-1" />,
    },
    {
      title: 'Open Source',
      description: 'Transparent codebase that anyone can inspect, modify, and contribute to.',
      icon: <FontAwesomeIcon icon={faCodeBranch} className="size-5 stroke-1" />,
    },
    {
      title: 'Lightning Fast',
      description:
        'Exceptional performance delivering a smooth and responsive experience even with extensive collections.',
      icon: <FontAwesomeIcon icon={faBolt} className="size-5 stroke-1" />,
    },
    {
      title: 'Responsive design',
      description: 'Works seamlessly across all devices and screen sizes.',
      icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
    },

    {
      title: 'Light and dark mode',
      description:
        'Automatically syncs with your system theme, with the option to manually switch between light and dark modes.',
      icon: <EclipseIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Advanced Tagging System',
      description:
        'Organize bookmarks with custom nested tags. Apply different styling to tags and pin important tags for quick access.',
      icon: <FontAwesomeIcon icon={faTags} className="size-5 stroke-1" />,
    },

    {
      title: 'Import from Anywhere',
      description:
        'Seamlessly import your existing bookmarks from any browser or service like Raindrop.io or Pocket to transition to self-hosted storage.',
      icon: <FontAwesomeIcon icon={faFileImport} className="size-5 stroke-1" />,
    },
    {
      title: 'Instant Search',
      description: 'Find bookmarks instantly as you type in collections of any size.',
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} className="size-5 stroke-1" />,
    },

    {
      title: 'Browser Bookmarklet',
      description:
        'Save bookmarks from any browser using a simple bookmarklet — no extensions required. Compatible with all desktop and most mobile browsers.',
      icon: <FontAwesomeIcon icon={faBookmark} className="size-5 stroke-1" />,
    },
    {
      title: 'Localisation (coming soon)',
      description: 'Support for multiple languages and regions is under development.',
      icon: <LanguagesIcon className="size-5 stroke-1" />,
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
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
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
