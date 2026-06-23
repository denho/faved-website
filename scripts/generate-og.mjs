// Build-time Open Graph image generation.
//
// GitHub Pages (and any `output: 'export'` static host) cannot run the dynamic
// `/og` route handler, so we pre-render one PNG per blog post / docs page into
// `public/static/og/`. The matching page metadata points at these static files
// (see app/blog/[...slug]/page.tsx and app/docs/[...slug]/page.tsx).
//
// Runs from postbuild, after Contentlayer has regenerated, so the content read
// here is always fresh. When EXPORT is set we also copy the images into the
// already-built `out/` directory.

import { ImageResponse } from 'next/og.js'
import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises'
import path from 'node:path'

import { allBlogs, allDocs } from '../.contentlayer/generated/index.mjs'
import { ogElement, ogImageFileName, OG_WIDTH, OG_HEIGHT } from '../components/lib/og.mjs'

const ROOT = process.cwd()
const PUBLIC_OG_DIR = path.join(ROOT, 'public', 'static', 'og')
const EXPORT_OG_DIR = path.join(ROOT, 'out', 'static', 'og')

// Mirrors formatSection() in app/docs/[...slug]/page.tsx so the baked-in
// section label matches what the page would have requested.
function formatSection(raw) {
  return raw
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function docsSectionLabel(slug) {
  const category = slug.includes('/') ? slug.split('/')[0] : ''
  return category ? `Docs · ${formatSection(category)}` : 'Docs'
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

export default async function generateOg() {
  // Collect every page that relies on a generated OG card. A blog post with an
  // explicit `images` frontmatter opts out (same condition the page uses).
  const targets = [
    ...allBlogs
      .filter((post) => !post.draft && !post.images)
      .map((post) => ({
        contentPath: `/blog/${post.slug}`,
        title: post.title,
        description: post.summary,
        section: 'Blog',
      })),
    ...allDocs
      .filter((doc) => !doc.draft)
      .map((doc) => ({
        contentPath: `/docs/${doc.slug}`,
        title: doc.title,
        description: doc.description,
        section: docsSectionLabel(doc.slug),
      })),
  ]

  const [interRegular, interMedium, interSemiBold, logoPng] = await Promise.all([
    readFile(path.join(ROOT, 'public', 'fonts', 'Inter-Regular.ttf')),
    readFile(path.join(ROOT, 'public', 'fonts', 'Inter-Medium.ttf')),
    readFile(path.join(ROOT, 'public', 'fonts', 'Inter-SemiBold.ttf')).catch(() => null),
    readFile(path.join(ROOT, 'public', 'static', 'images', 'faved-logo.png')),
  ])

  const fonts = [
    { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
    // Inter-SemiBold (600) is used for the title/logo; fall back to Medium.
    { name: 'Inter', data: interSemiBold || interMedium, weight: 600, style: 'normal' },
  ]

  const logoSrc = `data:image/png;base64,${logoPng.toString('base64')}`

  await mkdir(PUBLIC_OG_DIR, { recursive: true })

  for (const t of targets) {
    const element = ogElement({
      title: t.title,
      description: t.description,
      section: t.section,
      path: t.contentPath,
      logoSrc,
    })

    const response = new ImageResponse(element, { width: OG_WIDTH, height: OG_HEIGHT, fonts })
    const buffer = Buffer.from(await response.arrayBuffer())
    const file = path.join(PUBLIC_OG_DIR, ogImageFileName(t.contentPath))
    await writeFile(file, buffer)
  }

  console.log(`Generated ${targets.length} OG image(s) in public/static/og/`)

  // Static export copies public/ before postbuild runs, so mirror the images
  // into the already-emitted out/ directory.
  if (process.env.EXPORT && (await exists(path.join(ROOT, 'out')))) {
    await mkdir(EXPORT_OG_DIR, { recursive: true })
    await cp(PUBLIC_OG_DIR, EXPORT_OG_DIR, { recursive: true })
    console.log('Copied OG images into out/static/og/')
  }
}
