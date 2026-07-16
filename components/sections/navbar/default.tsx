'use client'

import { type VariantProps } from 'class-variance-authority'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { cn, getCookie, isNavLinkActive } from '@/components/lib/utils'

import siteMetadata from '@/data/siteMetadata'

import { Button, buttonVariants } from '../../ui/button'
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from '../../ui/navbar'
import Navigation from '../../ui/navigation'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import SearchButton from '@/components/SearchButton'
import GithubStars from '@/components/GithubStars'
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
      text: 'Docs',
      href: '/docs/getting-started/introduction',
    },
    {
      text: 'Pricing',
      href: '/#pricing',
    },
    {
      text: 'Managed hosting',
      href: `${siteMetadata.cloudUrl}?ref=navbar`,
    },
    // {
    //   text: 'Discord',
    //   href: siteMetadata.discord,
    // },
    // {
    //   text: 'X (Twitter)',
    //   href: siteMetadata.x,
    // },
  ],
  actions = [
    {
      text: 'Get Started',
      href: `${siteMetadata.appUrl}/signup?ref=navbar-get-started`,
      isButton: true,
      variant: 'default',
    },
    { text: 'Sign in', href: `${siteMetadata.appUrl}/login?ref=navbar-signin`, isButton: false },
    // {
    //   text: '',
    //   icon: <Discord className="h-4 w-4 fill-current" />,
    //   isButton: false,
    //   href: siteMetadata.discord,
    // },
    // {
    //   text: '',
    //   icon: <X className="h-3.5 w-3.5 fill-current" />,
    //   isButton: false,
    //   href: siteMetadata.x,
    // },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const pathname = usePathname()

  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    setIsAuthed(getCookie('faved-logged-in') === '1')
  }, [])

  if (isAuthed) {
    actions = [
      {
        text: 'Open Faved',
        href: `${siteMetadata.appUrl}/?ref=navbar-open-app`,
        isButton: true,
        variant: 'default',
      },
    ]
  } else {
    mobileLinks.unshift({
      text: 'Sign in',
      href: `${siteMetadata.appUrl}/login?ref=navbar-signin`,
    })
  }

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
            <SearchButton className="hidden sm:block" />
            <GithubStars className="xs:flex hidden" />
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
                <a key={index} href={action.href} className="hidden text-sm lg:block">
                  {action.icon}
                  {action.text}
                </a>
              )
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 lg:hidden">
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
                      className={
                        isNavLinkActive(pathname, link.href)
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }
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
