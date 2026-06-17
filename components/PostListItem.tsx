import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

function AuthorAvatar({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) {
    return (
      <Image
        src={avatar}
        width={36}
        height={36}
        alt={name}
        className="h-9 w-9 rounded-full object-cover"
      />
    )
  }
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span
      aria-hidden="true"
      className="bg-primary-500/15 text-primary-500 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
    >
      {initials}
    </span>
  )
}

export default function PostListItem({ post }: { post: CoreContent<Blog> }) {
  const { path, date, title, summary, tags, authors } = post
  const authorList = authors && authors.length > 0 ? authors : ['default']
  const author = authorList
    .map((a) => allAuthors.find((author) => author.slug === a))
    .filter(Boolean)[0]

  return (
    <article className="group relative py-8">
      <div className="space-y-3">
        <h2 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
          <Link
            href={`/${path}`}
            className="group-hover:text-primary-500 text-gray-900 transition-colors after:absolute after:inset-0 dark:text-gray-100"
          >
            {title}
          </Link>
        </h2>
        {summary && <p className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</p>}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-sm">
          {author && <AuthorAvatar name={author.name} avatar={author.avatar} />}
          <div>
            {author && (
              <>
                <span className="font-medium text-gray-900 dark:text-gray-100">{author.name}</span>
                <span className="px-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </>
            )}
            <time
              dateTime={date}
              className="text-gray-500 dark:text-gray-400"
              suppressHydrationWarning
            >
              {formatDate(date, siteMetadata.locale)}
            </time>
          </div>
          {tags && tags.length > 0 && (
            <div className="relative z-10 -mb-2 flex flex-wrap items-center">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} label={`# ${tag}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
