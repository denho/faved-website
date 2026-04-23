'use client'

import Link from 'next/link'
import * as React from 'react'
import { ReactNode } from 'react'

import siteMetadata from '@/data/siteMetadata'
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
      title: 'Documentation',
      isLink: true,
      href: '/docs/getting-started/introduction',
    },
    {
      title: 'Managed hosting',
      isLink: true,
      href: `${siteMetadata.cloudUrl}?ref=navbar`,
    },
    {
      title: 'Live demo',
      isLink: true,
      href: siteMetadata.demoUrl,
    },
  ],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
