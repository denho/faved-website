import {ReactNode} from 'react'

import React from '../../logos/react'
import ShadcnUi from '../../logos/shadcn-ui'
import Tailwind from '../../logos/tailwind'
import TypeScript from '../../logos/typescript'
import {Badge} from '../../ui/badge'
import Logo from '../../ui/logo'
import {Section} from '../../ui/section'
import PHP from '@/components/logos/php'
import siteMetadata from '@/data/siteMetadata'

interface LogosProps {
  title?: string
  badge?: ReactNode | false
  logos?: ReactNode[] | false
  className?: string
}

export default function Logos({
  title = 'Built with modern web technologies, Faved provides a seamless experience across all your devices.',
  badge = (
    <Badge variant="outline" className="text-green-500/90 dark:border-green-300/30">
      Last updated: {siteMetadata.appLastUpdated}
    </Badge>
  ),
  logos = [
    <Logo key="react" image={React} name="React" version="19.2.4" />,
    <Logo key="typescript" image={TypeScript} name="TypeScript" version="5.8.3" />,
    <Logo key="shadcn" image={ShadcnUi} name="Shadcn/ui" version="4.2.0" />,
    <Logo key="tailwind" image={Tailwind} name="Tailwind" version="4.1.13" />,
    <Logo key="php" image={PHP} name="PHP" version="8.4" />,
  ],
  className,
}: LogosProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto mb-20 flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">Why Faved</h2>
        <div className="text-md text-muted-foreground max-w-full text-left leading-9 font-medium sm:text-xl lg:px-20 space-y-4">
        <p>Most tools break down as your collection grows. What starts organized quickly becomes cluttered — links get lost, and finding anything takes too long.</p>
        <p>Faved combines flexible tagging and instant search to keep everything easy to find. Instead of rigid folders, your bookmarks stay organized in a way that adapts to you — so even large collections remain fast, clear, and manageable.</p>
        </div>
      </div>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {badge !== false && badge}
          <h2 className="text-md font-semibold sm:text-2xl">{title}</h2>
        </div>
        {logos !== false && logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8">{logos}</div>
        )}
      </div>
    </Section>
  )
}
