import { EclipseIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { Item, ItemDescription, ItemIcon, ItemTitle } from '../../ui/item'
import { Section } from '../../ui/section'
import { faBolt, faBookmark, faCodeBranch, faSliders } from '@fortawesome/free-solid-svg-icons'
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
  title = 'The little things that add up',
  items = [
    {
      title: 'Powerful UI without Clutter',
      description:
        'Customize layouts (card/list/table), fields, and sidebar to your preference. All major actions are one click away with no need to navigate between screens.',
      icon: <FontAwesomeIcon icon={faBolt} className="size-5 stroke-1" />,
    },
    {
      title: 'Light and Dark Mode',
      description:
        'Automatically syncs with your system theme for a comfortable viewing experience in any lighting condition.',
      icon: <EclipseIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Page Metadata Fetching',
      description:
        'Faved pulls in the title, description, and preview image automatically. It also keeps those details fresh over time, so your collection never goes stale.',
      icon: <FontAwesomeIcon icon={faBookmark} className="size-5 stroke-1" />,
    },
    {
      title: 'Bulk Actions',
      description:
        'Easily manage large sets of bookmarks in one go with bulk deleting, refetching, and tagging.',
      icon: <FontAwesomeIcon icon={faSliders} className="size-5 stroke-1" />,
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
      <div className="max-w-container mx-auto flex flex-col items-center gap-12 sm:gap-20">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">{title}</h2>
        {items !== false && items.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
            {items.map((item, index) => (
              <Item
                key={index}
                className="border-border/10 gap-6 sm:border-l sm:px-8 sm:py-2 lg:px-10"
              >
                <ItemIcon className="text-muted-foreground">{item.icon}</ItemIcon>
                <div className="flex flex-col gap-3">
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
