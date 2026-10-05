'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ReactNode } from 'react'

import { cn, isNavLinkActive } from '@/components/lib/utils'
import { EDITIONS, editionOfPath } from '@/components/docs/editions'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu'

interface ComponentItem {
  title: string
  href: string
  description: string
}

interface MenuItem {
  title: string
  href: string
  isLink?: boolean
  content?: ReactNode
}

interface NavigationProps {
  menuItems?: MenuItem[]
  components?: ComponentItem[]
  logo?: ReactNode
  logoTitle?: string
  logoDescription?: string
  logoHref?: string
  introItems?: {
    title: string
    href: string
    description: string
  }[]
}

export default function Navigation({
  menuItems = [
    {
      title: 'Blog',
      isLink: true,
      href: '/blog',
    },
    {
      title: 'Docs',
      href: '/docs',
      content: <DocsMenu />,
    },
    {
      title: 'Pricing',
      isLink: true,
      href: '/#pricing',
    },
  ],
}: NavigationProps) {
  const pathname = usePathname()

  const activeClass = 'bg-primary/10 text-primary hover:text-primary'

  return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink ? (
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  isNavLinkActive(pathname, item.href) && activeClass
                )}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger
                  className={cn(isNavLinkActive(pathname, item.href) && activeClass)}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:border-border dark:group-data-[viewport=false]/navigation-menu:border-border/15">
                  {item.content}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** The Docs dropdown: one entry per docs edition, marking the one being read. */
function DocsMenu() {
  const pathname = usePathname()
  const current = pathname.startsWith('/docs') ? editionOfPath(pathname) : null

  return (
    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
      <ListItem
        href={EDITIONS.cloud.intro}
        title={EDITIONS.cloud.label}
        active={current === 'cloud'}
      >
        Docs for the hosted app at app.faved.to
      </ListItem>
      <ListItem
        href={EDITIONS['self-hosted'].intro}
        title={EDITIONS['self-hosted'].label}
        active={current === 'self-hosted'}
      >
        Install and run Faved on your own server
      </ListItem>
    </ul>
  )
}

function ListItem({
  className,
  title,
  children,
  href,
  active,
  ...props
}: React.ComponentProps<typeof Link> & { title: string; active?: boolean }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          data-slot="list-item"
          href={href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none',
            active && 'bg-accent text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
