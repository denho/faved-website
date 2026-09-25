import { EclipseIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { Item, ItemDescription, ItemIcon, ItemTitle } from '../../ui/item'
import { Section } from '../../ui/section'
import {
  faBolt,
  faBookmark,
  faForwardStep,
  faFileExport,
  faLayerGroup,
  faListCheck,
  faSliders,
  faWandMagicSparkles,
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
  title = 'The little things that add up',
  items = [
    {
      title: 'Views per type',
      description:
        'Column order, widths, visible fields and filter chips are saved for each type, in table, cards and list layouts. A product list looks the same wherever you open it from.',
      icon: <FontAwesomeIcon icon={faLayerGroup} className="size-5 stroke-1" />,
    },
    {
      title: 'Bulk actions',
      description:
        'Select records and delete them, set any field, change their type, or extract from up to 500 of them in one go, three runs at a time.',
      icon: <FontAwesomeIcon icon={faSliders} className="size-5 stroke-1" />,
    },
    {
      title: 'Field hints',
      description:
        'A one-line hint per field tells Extract exactly what to pull — “price per bottle as a number, no currency symbol”.',
      icon: <FontAwesomeIcon icon={faWandMagicSparkles} className="size-5 stroke-1" />,
    },
    {
      title: 'Extract on save',
      description:
        'Saving a page you found extracts it by default, in the background. Switch it off for a record when you only want the link.',
      icon: <FontAwesomeIcon icon={faBolt} className="size-5 stroke-1" />,
    },
    {
      title: 'Activity log',
      description:
        'Every extraction is recorded: what it asked for, what it cost, and anything that went wrong. Bulk runs show their progress right in the sidebar.',
      icon: <FontAwesomeIcon icon={faListCheck} className="size-5 stroke-1" />,
    },
    {
      title: 'Page metadata fetching',
      description:
        'Faved pulls in the title, description, and preview image automatically. It is read directly from the page, free, with no AI credits spent, and kept fresh over time.',
      icon: <FontAwesomeIcon icon={faBookmark} className="size-5 stroke-1" />,
    },
    {
      title: 'Light and dark mode',
      description:
        'Automatically syncs with your system theme for a comfortable viewing experience in any lighting condition.',
      icon: <EclipseIcon className="size-5 stroke-1" />,
    },
    {
      title: 'Export anytime',
      description:
        'Take your whole library with you as a standard bookmarks HTML file: each record once, one select field as the folder tree, the rest as tags.',
      icon: <FontAwesomeIcon icon={faFileExport} className="size-5 stroke-1" />,
    },
    {
      title: 'Step through records',
      description:
        'Read a filtered list without closing the editor: a pair of chevrons and “3 of 48” in the header, or Alt with the up and down arrows.',
      icon: <FontAwesomeIcon icon={faForwardStep} className="size-5 stroke-1" />,
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
