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

interface SubMenuItem {
  title: string
  href: string
  description: string
}

interface MenuItem {
  title: string
  href: string
  isLink?: boolean
  content?: ReactNode
  children?: SubMenuItem[]
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
      children: [
        {
          title: EDITIONS.cloud.label,
          href: EDITIONS.cloud.intro,
          description: 'Docs for the hosted app at app.faved.to',
        },
        {
          title: EDITIONS['self-hosted'].label,
          href: EDITIONS['self-hosted'].intro,
          description: 'Install and run Faved on your own server',
        },
      ],
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
  // The docs edition being read, so the dropdown can mark it
  const currentDocsHref = pathname.startsWith('/docs')
    ? EDITIONS[editionOfPath(pathname)].intro
    : null

  return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(isNavLinkActive(pathname, item.href) && activeClass)}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:border-border dark:group-data-[viewport=false]/navigation-menu:border-border/15">
                  <ul className="grid w-64 gap-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenuLink
                          asChild
                          data-active={child.href === currentDocsHref || undefined}
                        >
                          <Link
                            href={child.href}
                            aria-current={child.href === currentDocsHref ? 'page' : undefined}
                          >
                            <span className="text-foreground font-medium">{child.title}</span>
                            <span className="text-muted-foreground text-xs leading-snug">
                              {child.description}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  isNavLinkActive(pathname, item.href) && activeClass
                )}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
