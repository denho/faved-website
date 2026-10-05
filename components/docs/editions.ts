/**
 * Two doc sets live side by side. Faved Cloud's pages live under
 * `data/docs/cloud/`, so their slugs start with `cloud/`; every other page is
 * the self-hosted edition, at the URLs it has always had.
 */
export const CLOUD_PREFIX = 'cloud/'

export const EDITIONS = {
  cloud: { label: 'Faved Cloud', intro: '/docs/cloud/getting-started/introduction' },
  'self-hosted': { label: 'Self-hosted', intro: '/docs/getting-started/introduction' },
} as const

export type Edition = keyof typeof EDITIONS

export const editionOf = (slug: string): Edition =>
  slug.startsWith(CLOUD_PREFIX) ? 'cloud' : 'self-hosted'

/** The edition of a `/docs/...` pathname. */
export const editionOfPath = (pathname: string): Edition =>
  editionOf(pathname.replace(/^\/docs\/?/, ''))

/** The slug inside its edition: `cloud/organizing/types-and-fields` reads as `guides/importing`. */
export const localSlug = (slug: string) =>
  slug.startsWith(CLOUD_PREFIX) ? slug.slice(CLOUD_PREFIX.length) : slug

/** The sidebar section a page sits in: the first folder inside its edition. */
export const categoryOf = (slug: string) => {
  const local = localSlug(slug)
  return local.includes('/') ? local.split('/')[0] : ''
}
