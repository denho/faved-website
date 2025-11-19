/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({
  href,
  noReferrer,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { noReferrer?: boolean }) => {
  const isInternalLink = href && href.startsWith('/')
  console.log('href:', href, isInternalLink)
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link className="break-words" href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a
      className="break-words"
      target="_blank"
      rel={'noopener' + (noReferrer ? ' noreferrer' : '')}
      href={href}
      {...rest}
    />
  )
}

export default CustomLink
