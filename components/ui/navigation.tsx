'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ReactNode } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { cn, isNavLinkActive } from '@/components/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
      isLink: true,
      href: '/docs/getting-started/introduction',
    },
    {
      title: 'Pricing',
      isLink: true,
      href: '/#pricing',
    },
    {
      title: 'Managed hosting',
      isLink: true,
      href: `${siteMetadata.cloudUrl}?ref=navbar`,
    },
  ],
}: NavigationProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isNavLinkActive(pathname, item.href) &&
                  'bg-primary/10 text-primary hover:text-primary'
              )}
              asChild
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
