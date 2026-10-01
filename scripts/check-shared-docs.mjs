// Pages shared by both doc editions: each one exists as
// data/docs/<page>.mdx (self-hosted) and data/docs/cloud/<page>.mdx (Faved Cloud)
// and must keep the same title and content in both. Fails the build when they drift.
import { readFileSync } from 'fs'
import path from 'path'

const SHARED_PAGES = [
  'getting-started/installing-as-a-pwa-app',
  'getting-started/saving-with-apple-shortcut',
]

const docsDir = path.join('data', 'docs')

const parse = (file) => {
  const text = readFileSync(file, 'utf8')
  const match = text.match(/^---\n([\s\S]*?)\n---\n/)
  const title = match?.[1].match(/^title:\s*(.*)$/m)?.[1].trim()
  return { title, body: match ? text.slice(match[0].length) : text }
}

const problems = []
for (const page of SHARED_PAGES) {
  const selfHostedFile = path.join(docsDir, `${page}.mdx`)
  const cloudFile = path.join(docsDir, 'cloud', `${page}.mdx`)
  const selfHosted = parse(selfHostedFile)
  const cloud = parse(cloudFile)
  if (cloud.title !== selfHosted.title) problems.push(`${page}: titles differ`)
  if (cloud.body !== selfHosted.body) problems.push(`${page}: content differs`)
}

if (problems.length) {
  console.error('Shared docs pages have drifted apart:\n  ' + problems.join('\n  '))
  console.error(
    'Edit both copies the same way: data/docs/<page>.mdx and data/docs/cloud/<page>.mdx'
  )
  process.exit(1)
}
console.log(`Shared docs pages in sync (${SHARED_PAGES.length})...`)
