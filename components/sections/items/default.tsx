import { EclipseIcon, LanguagesIcon, MonitorSmartphoneIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { Item, ItemDescription, ItemIcon, ItemTitle } from '../../ui/item'
import { Section } from '../../ui/section'
import {
  faBolt,
  faBookmark,
  faCodeBranch,
  faFileImport,
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
      title: 'Browser Bookmarklet',
      description:
        'Save bookmarks from any browser with a simple bookmarklet without installing additional extensions. Works on any desktop and mobile browser.',
      icon: <FontAwesomeIcon icon={faBookmark} className="size-5 stroke-1" />,
    },
    {
      title: '  Lightning Fast',
      description:
        'Blazing performance with full page loads of 2000+ bookmarks under 100ms, ensuring a smooth experience even with large collections.',
      icon: <FontAwesomeIcon icon={faBolt} className="size-5 stroke-1" />,
    },
    {
      title: 'Import from Pocket',
      description:
        'Seamlessly import your existing bookmarks from Pocket to transition to self-hosted storage.',
      icon: <FontAwesomeIcon icon={faFileImport} className="size-5 stroke-1" />,
    },
    {
      title: 'Tagging System',
      description:
        'Organize bookmarks with custom nested tags. Apply different styling to tags and pin important tags at the top for quick access.',
      icon: <FontAwesomeIcon icon={faTags} className="size-5 stroke-1" />,
    },
    // NEW
    {
      title: 'Responsive design',
      description: 'Looks and works great on any device and screen size',
      icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Light and dark mode',
      description: 'Seamless switching between color schemes, 6 themes included',
      icon: <EclipseIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Localisation (coming soon)',
      description: 'Support for multiple languages and regions is under development',
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
