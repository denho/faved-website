import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobe,
  faServer,
  faTags,
  faCodeBranch,
  faBookmark,
  faBolt,
  faFileImport,
  faDatabase,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPhp, faReact } from '@fortawesome/free-brands-svg-icons'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-4 pb-4 sm:pt-8 sm:pb-16">
        <div className="px-6 md:px-0">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
              Save. Organize. Own.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Faved is a self-hosted, open-source solution to store, categorize, and access your
              saved web content and links from anywhere.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 flex items-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                href="https://github.com/denho/faved"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
              <a
                className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center text-sm leading-6 font-semibold text-gray-900 transition-colors dark:text-gray-100"
                href="https://demo.faved.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGlobe} className="mr-2 h-4 w-4" />
                Live Demo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Image
            alt="Faved application screenshot"
            src="/static/images/screenshot-list-desktop-mobile-safari-2400px.png"
            width={2400}
            height={1400}
            loading="eager"
            className=""
          />
        </div>
      </div>

      <section className="bg-white py-16 sm:py-24 dark:bg-gray-950" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-0">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Features
            </h2>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faServer} />
                  </div>
                  Self-Hosted
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Keep your bookmarks on your own computer or server. Your data is stored locally
                    and belongs to you.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faTags} />
                  </div>
                  Tagging System
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Organize bookmarks with custom nested tags. Apply different styling to tags and
                    pin important tags at the top for quick access.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </div>
                  Open Source
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Transparent codebase that anyone can inspect, modify, and contribute to.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faBookmark} />
                  </div>
                  Browser Bookmarklet
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Save bookmarks from any browser with a simple bookmarklet without installing
                    additional extensions. Works on any desktop and mobile browser.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faBolt} />
                  </div>
                  Lightning Fast
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Blazing performance with full page loads of 2000+ bookmarks under 100ms,
                    ensuring a smooth experience even with large collections.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="text-primary-600 dark:text-primary-400 h-5 w-5 flex-none">
                    <FontAwesomeIcon icon={faFileImport} />
                  </div>
                  Import from Pocket
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Seamlessly import your existing bookmarks from Pocket to transition to
                    self-hosted storage.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" id="about">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 xl:flex-row xl:px-0">
          <div className="max-w-3xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              About Faved
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Faved was born out of the need for a simple yet powerful bookmark manager that
              respects user privacy and ownership of data. Unlike commercial bookmark services that
              collect your data, Faved is completely self-hosted - meaning you maintain control over
              your information.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Built with modern web technologies, Faved provides a seamless experience across all
              your devices while ensuring your bookmarks are organized just the way you want them.
            </p>
          </div>
          <div className="xl:max-w-1xl w-full max-w-full">
            <h3 className="mt-5 mb-8 text-xl font-bold tracking-tight text-gray-900 xl:mt-0 xl:text-center dark:text-gray-100">
              Built With
            </h3>
            <div className="flex justify-around gap-8 xl:flex-col">
              <div className="flex flex-col items-center gap-y-3">
                <div className="text-primary-600 dark:text-primary-400 h-8 w-8 flex-none text-xl">
                  <FontAwesomeIcon icon={faReact} />
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  React
                </span>
              </div>
              <div className="flex flex-col items-center gap-y-3">
                <div className="text-primary-600 dark:text-primary-400 h-8 w-8 flex-none text-xl">
                  <FontAwesomeIcon icon={faPhp} />
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  PHP 8
                </span>
              </div>
              <div className="flex flex-col items-center gap-y-3">
                <div className="text-primary-600 dark:text-primary-400 h-8 w-8 flex-none text-xl">
                  <FontAwesomeIcon icon={faDatabase} />
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  SQLite
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24" id="get-started">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-light text-gray-900 dark:text-white">Get Started</h2>
            <div className="bg-primary-500 mx-auto h-px w-12"></div>
          </div>

          <div className="space-y-8">
            <div className="group">
              <div className="mb-4 flex items-center">
                <div className="bg-primary-500 mr-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white">
                  1
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Pull the latest image from Docker Hub
                </h3>
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
                      rel="noopener noreferrer"
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
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Start the Docker container
                </h3>
              </div>
              <div className="ml-12 space-y-4">
                <div className="relative rounded-xl border border-gray-800 bg-gray-950 p-6 dark:bg-gray-900">
                  <code className="font-mono text-sm text-gray-300">
                    docker run -d --name faved -p 8080:80 -v faved-data:/var/www/html/storage
                    denho/faved
                  </code>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Done! Open{' '}
                  <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                    http://localhost:8080
                  </span>{' '}
                  in your browser to access your Faved instance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </div>
  )
}
