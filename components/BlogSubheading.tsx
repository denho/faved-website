import Link from 'next/link'

const linkClass =
  'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline underline-offset-2 decoration-primary-500/40 hover:decoration-primary-600 transition-colors font-medium'

export default function BlogSubheading() {
  return (
    <>
      Faved{' '}
      <Link href="/tags/update" className={linkClass}>
        #updates
      </Link>
      ,{' '}
      <Link href="/tags/tutorial" className={linkClass}>
        #tutorials
      </Link>{' '}
      and product{' '}
      <Link href="/tags/announcement" className={linkClass}>
        #announcements
      </Link>
    </>
  )
}
