'use client'

import { type VariantProps } from 'class-variance-authority'
import { Menu } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/components/lib/utils'

import siteMetadata from '@/data/siteMetadata'

import { Button, buttonVariants } from '../../ui/button'
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from '../../ui/navbar'
import Navigation from '../../ui/navigation'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'

import { Discord, Github, X } from '@/components/social-icons/icons'
import SearchButton from '@/components/SearchButton'
import BrandLogo from '@/components/ui/brand-logo'
import Link from '@/components/Link'

interface NavbarLink {
  text: string
  href: string
}

interface NavbarActionProps {
  text: string
  href: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  icon?: ReactNode
  iconRight?: ReactNode
  isButton?: boolean
}

interface NavbarProps {
  logo?: ReactNode
  name?: string
  homeUrl?: string
  mobileLinks?: NavbarLink[]
  actions?: NavbarActionProps[]
  showNavigation?: boolean
  customNavigation?: ReactNode
  className?: string
}

export default function Navbar({
  homeUrl = '/',
  mobileLinks = [
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Documentation',
      href: '/docs/getting-started/introduction',
    },
    {
      text: 'Managed hosting',
      href: 'https://faved.cloud/signup',
    },
    {
      text: 'Live demo',
      href: 'https://faved.cloud/signup',
    },
  ],
  actions = [
    // { text: 'Sign in', href: siteMetadata.url, isButton: false },
    // {
    //   text: 'Get Started',
    //   href: siteMetadata.url,
    //   isButton: true,
    //   variant: 'default',
    // },
    {
      text: '',
      icon: (
        <Github
          className="h-4 w-4 fill-current"
        />
      ),
      isButton: false,
      href: siteMetadata.github,
    },
    {
      text: '',
      icon: (
        <Discord
          className="h-4 w-4 fill-current"
        />
      ),
      isButton: false,
      href: siteMetadata.discord,
    },
    {
      text: '',
      icon: (
        <X
          className="h-4 w-4 fill-current"
        />
      ),
      isButton: false,
      href: siteMetadata.x,
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn('sticky top-0 z-50 -mb-4 px-4 pb-4', className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <Link href={homeUrl}>
              <BrandLogo />
            </Link>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            <SearchButton />
            {actions.map((action, index) =>
              action.isButton ? (
                <Button key={index} variant={action.variant || 'default'} asChild>
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a key={index} href={action.href} className="hidden text-sm md:block">
                  {action.icon}
                  {action.text}
                </a>
              )
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                    <BrandLogo />
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  )
}
