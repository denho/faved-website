import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Hero from '@/components/sections/hero/default'
import Items from '@/components/sections/items/default'
import About from '@/components/sections/about/default'
import { Section } from '@/components/ui/section'
import React from '@/components/logos/react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <Hero />
      <Items />
      <About />
      <Section id="get-started">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
              Get Started
            </h2>
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
      </Section>

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
    </>
  )
}
