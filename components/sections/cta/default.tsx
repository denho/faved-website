import { CheckIcon } from 'lucide-react'
import { type VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

import siteConfig from '@/data/siteMetadata'
import { cn } from '@/components/lib/utils'

import { Button, buttonVariants } from '../../ui/button'
import Glow from '../../ui/glow'
import { Section } from '../../ui/section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

interface CTAButtonProps {
  href: string
  text: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  icon?: ReactNode
  iconRight?: ReactNode
}

interface CTAProps {
  title?: string
  buttons?: CTAButtonProps[] | false
  className?: string
}

export default function CTA({
  title = 'Get Managed Hosting',
  buttons = [
    {
      href: siteConfig.cloudUrl,
      text: 'Start in the cloud',
      variant: 'default',
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn('group relative overflow-hidden', className)} id="get-started">
      <div className="max-w-container relative z-10 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
            Get Started
          </h2>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Cloud Section */}
          <div className="space-y-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900 lg:text-left dark:text-white">
             Start in the Cloud
            </h3>
            <div className="relative rounded-2xl border border-gray-200 bg-white/50 p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50">
              <div className="via-primary-500/50 absolute -top-px right-10 left-10 h-px bg-gradient-to-r from-transparent to-transparent" />
              <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
                The easiest way to get started is to use our managed hosting service. Everything is
                handled for you in a secure, optimized environment. No time spent on setup, updates,
                or backups.
              </p>
              <ul className="mb-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <CheckIcon className="text-primary-500 h-4 w-4 shrink-0" />
                  High-performance servers with blazing-fast CDN
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <span>Enterprise-grade security and encryption of your data</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="text-primary-500 h-4 w-4 shrink-0" />
                  Automatic backups
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="text-primary-500 h-4 w-4 shrink-0" />
                  Automatic updates with early access to new features
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="text-primary-500 h-4 w-4 shrink-0" />
                  Dedicated email support
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="text-primary-500 h-4 w-4 shrink-0" />
                  Zero setup - start organizing your bookmarks in under 60 seconds
                </li>

              </ul>
              <Button size="lg" className="shadow-primary-500/20 w-full shadow-lg mt-4" asChild>
                <a href={`${siteConfig.cloudUrl}?ref=get-started-cta`}>Launch Faved Cloud</a>
              </Button>
            </div>
          </div>

          {/* Self-Hosted Section */}
          <div className="space-y-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900 lg:text-left dark:text-white">
              Host your own instance
            </h3>
            <div className="group">
              <div className="mb-4 flex items-center">
                <div className="bg-primary-500 mr-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white">
                  1
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Pull the latest image from Docker Hub
                </h4>
              </div>
              <div className="ml-12 space-y-4">
                <div className="flex items-start space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800/50 dark:bg-blue-950/30">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                  />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Don't have Docker installed?{' '}
                    <a
                      href="https://docs.docker.com/get-docker/"
                      target="_blank"
                      rel="noopener"
                      className="underline hover:no-underline"
                    >
                      Get it here
                    </a>
                  </p>
                </div>
                <div className="relative rounded-xl border border-gray-800 bg-gray-950 p-6 dark:bg-gray-900">
                  <code className="font-mono text-sm text-gray-300">docker pull denho/faved</code>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="mb-4 flex items-center">
                <div className="bg-primary-500 mr-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white">
                  2
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Start the Docker container
                </h4>
              </div>
              <div className="ml-12 space-y-4">
                <div className="relative rounded-xl border border-gray-800 bg-gray-950 p-6 dark:bg-gray-900">
                  <code className="font-mono text-sm text-gray-300">
                    docker run -d --name faved -p 8080:80 -v faved-data:/var/www/html/storage
                    denho/faved
                  </code>
                </div>
                <p className="mt-3 text-sm leading-8 text-gray-600 dark:text-gray-400">
                  Done! Open{' '}
                  <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                    http://localhost:8080
                  </span>{' '}
                  in your browser. For more options, see the{' '}
                  <a
                    href="/docs/getting-started/installation"
                    className="underline hover:no-underline"
                  >
                    instructions
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/*  <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">*/}
      {/*    {title}*/}
      {/*  </h2>*/}
      {/*  {buttons !== false && buttons.length > 0 && (*/}
      {/*    <div className="flex justify-center gap-4">*/}
      {/*      {buttons.map((button, index) => (*/}
      {/*        <Button*/}
      {/*          key={index}*/}
      {/*          variant={button.variant || "default"}*/}
      {/*          size="lg"*/}
      {/*          asChild*/}
      {/*        >*/}
      {/*          <a href={button.href}>*/}
      {/*            {button.icon}*/}
      {/*            {button.text}*/}
      {/*            {button.iconRight}*/}
      {/*          </a>*/}
      {/*        </Button>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  )
}
