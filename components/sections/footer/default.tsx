import { ReactNode } from 'react'

import { cn } from '@/components/lib/utils'
import { Footer, FooterBottom, FooterColumn, FooterContent } from '../../ui/footer'
import BrandLogo from '../../ui/brand-logo'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: ReactNode
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  policies?: FooterLink[]
  className?: string
}

export default function FooterSection({
  columns = [
    {
      title: 'Product',
      links: [
        { text: 'Changelog', href: siteMetadata.changelogUrl },
        { text: 'Documentation', href: '/docs/getting-started/introduction' },
        { text: 'Live demo', href: siteMetadata.demoUrl },
      ],
    },
    {
      title: 'Connect',
      links: [
        { text: 'Blog', href: '/blog' },
        { text: 'X (Twitter)', href: siteMetadata.x },
        { text: 'Github', href: siteMetadata.github },
        { text: 'Discord', href: siteMetadata.discord },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} All rights reserved`,
  policies = [
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn('bg-background w-full px-4', className)}>
      <div className="max-w-container mx-auto">
        <Footer className="mb-10">
          <FooterContent>
            <FooterColumn className="col-span-1 space-y-3 md:col-span-2">
              <BrandLogo />
              <div className="text-muted-foreground space-y-2 text-sm">Save. Organize. Own.</div>

              <div className="mb-y flex space-x-4">
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
                <SocialIcon kind="discord" href={siteMetadata.discord} size={6} />
                <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
                <SocialIcon kind="x" href={siteMetadata.x} size={6} />
                <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
                <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
                <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
                <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
                <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
                <SocialIcon kind="medium" href={siteMetadata.medium} size={6} />
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a key={linkIndex} href={link.href} className="text-muted-foreground text-sm">
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              <button type="button" data-cc="show-preferencesModal" className="cursor-pointer">
                Manage Cookie Preferences
              </button>
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  )
}
