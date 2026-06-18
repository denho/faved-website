import {EclipseIcon} from 'lucide-react'
import {ReactNode} from 'react'

import {Item, ItemDescription, ItemIcon, ItemTitle} from '../../ui/item'
import {Section} from '../../ui/section'
import {faBolt, faBookmark, faCodeBranch, faSliders,} from '@fortawesome/free-solid-svg-icons'
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
  title = 'And so much more',
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
