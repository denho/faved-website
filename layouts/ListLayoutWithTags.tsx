'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PostListItem from '@/components/PostListItem'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  subheading?: ReactNode
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

function TagNav() {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = pathname.startsWith('/tags/')
    ? decodeURI(pathname.split('/tags/')[1]?.split('/')[0] ?? '')
    : ''
  const isAllPosts = !pathname.startsWith('/tags/')

  return (
    <div className="border-t border-gray-200 pt-5 pb-1 dark:border-gray-700">
      <div className="flex flex-wrap">
        {isAllPosts ? (
          <span className="mr-2 mb-2 inline-flex cursor-default items-center rounded-full bg-gray-500/25 px-2.5 py-1 text-xs font-semibold tracking-wide text-gray-200 uppercase">
            All posts
          </span>
        ) : (
          <Link
            href="/blog"
            className="mr-2 mb-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide text-gray-400 uppercase transition-colors hover:bg-gray-500/15 hover:text-gray-200"
          >
            All posts
          </Link>
        )}
        <span className="mr-3 mb-1 mb-2.5 text-gray-300 dark:text-gray-600" aria-hidden="true">
          /
        </span>
        <span
          className="mr-3 mb-1 mb-2.5 hidden text-gray-300 sm:inline dark:text-gray-400"
          aria-hidden="true"
        >
          Browse by tag
        </span>
        {sortedTags.map((t) => (
          <Tag
            key={t}
            text={t}
            label={`# ${t} (${tagCounts[t]})`}
            isActive={activeTag === slug(t)}
          />
        ))}
      </div>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <div className="pt-6 pb-6">
        <p className="text-primary-500 mb-1 text-sm font-semibold tracking-wider uppercase">Tag</p>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          #{title}
        </h1>
        <p className="mt-3 text-lg leading-7 text-gray-500 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged &ldquo;{title}&rdquo;
        </p>
      </div>
      <TagNav />
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayPosts.map((post) => (
          <li key={post.path}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}

export function ListLayoutWithoutTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  subheading,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <div className="pt-6 pb-6">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          {title}
        </h1>
        {subheading && (
          <p className="mt-4 text-lg leading-7 text-gray-500 dark:text-gray-400">{subheading}</p>
        )}
      </div>
      <TagNav />
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayPosts.map((post) => (
          <li key={post.path}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
