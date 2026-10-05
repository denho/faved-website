// Builds public/search.json for the ⌘K command palette.
//
// - `pages`: one entry per published doc and blog post (title-level search).
// - `sections`: docs split at ##/### headings with their plain text (full-text docs search).
//
// Section anchors must match the ids rehype-slug puts on the rendered headings, so they are
// cross-checked against each doc's `toc` and the build fails on a mismatch.
import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const SECTION_DEPTHS = [2, 3]
const MAX_SECTION_TEXT = 3000

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)

const formatCategory = (category) =>
  category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

// JSX attributes that carry readable text, e.g. <Step title="Export your bookmarks">
const TEXT_ATTRIBUTES = new Set(['title', 'label', 'alt'])

/** Plain text of an mdast subtree: keeps prose, inline code and JSX children, drops code blocks. */
function plainText(node) {
  switch (node.type) {
    case 'text':
    case 'inlineCode':
      return node.value
    case 'code':
    case 'html':
    case 'mdxjsEsm':
    case 'mdxFlowExpression':
    case 'mdxTextExpression':
    case 'image':
      return ' '
    case 'mdxJsxFlowElement':
    case 'mdxJsxTextElement': {
      const attrs = (node.attributes || [])
        .filter((a) => TEXT_ATTRIBUTES.has(a.name) && typeof a.value === 'string')
        .map((a) => a.value)
      return [...attrs, ...node.children.map(plainText)].join(' ')
    }
    default:
      if (!node.children) return ''
      return node.children
        .map(plainText)
        .join(node.type === 'paragraph' || node.type === 'tableCell' ? '' : ' ')
  }
}

const clean = (text) =>
  text
    .replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function docSections(doc) {
  const tree = parser.parse(doc.body.raw)
  const slugger = new GithubSlugger()
  const category = doc.slug.includes('/') ? formatCategory(doc.slug.split('/')[0]) : ''
  const baseUrl = `/${doc.path}`
  const sections = [{ heading: doc.title, anchor: '', parts: [] }]

  for (const node of tree.children) {
    if (node.type === 'heading') {
      const heading = toString(node)
      const anchor = slugger.slug(heading)
      if (SECTION_DEPTHS.includes(node.depth)) {
        sections.push({ heading, anchor, parts: [] })
        continue
      }
    }
    sections[sections.length - 1].parts.push(plainText(node))
  }

  // Anchors must line up with the rendered heading ids (same algorithm as the docs TOC).
  const tocUrls = new Set((doc.toc || []).map((item) => item.url))
  for (const { anchor, heading } of sections) {
    if (anchor && !tocUrls.has(`#${anchor}`)) {
      throw new Error(
        `Search index: anchor "#${anchor}" for "${heading}" not in TOC of ${doc.path}`
      )
    }
  }

  return sections
    .map(({ heading, anchor, parts }) => ({
      id: anchor ? `${doc.path}#${anchor}` : doc.path,
      page: doc.path,
      url: anchor ? `${baseUrl}#${anchor}` : baseUrl,
      heading,
      pageTitle: doc.title,
      category,
      text: clean(parts.join(' ')).slice(0, MAX_SECTION_TEXT),
    }))
    .filter((section) => section.text || section.id !== doc.path)
}

function pageEntry(doc) {
  const isDocs = doc.type === 'Docs'
  return {
    id: doc.path,
    type: isDocs ? 'docs' : 'blog',
    url: `/${doc.path}`,
    title: doc.title,
    description: (isDocs ? doc.description : doc.summary) || '',
    tags: doc.tags || [],
    category: isDocs && doc.slug.includes('/') ? formatCategory(doc.slug.split('/')[0]) : '',
    order: doc.order ?? null,
    date: doc.date,
  }
}

export function buildSearchIndex({ allDocs, allBlogs, outFile, isProduction }) {
  const published = (doc) => !isProduction || doc.draft !== true
  const docs = allDocs.filter(published).sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  const blogs = allBlogs.filter(published).sort((a, b) => (a.date < b.date ? 1 : -1))

  const index = {
    pages: [...docs, ...blogs].map(pageEntry),
    sections: docs.flatMap(docSections),
  }
  writeFileSync(outFile, JSON.stringify(index))
  console.log(
    `Search index generated (${index.pages.length} pages, ${index.sections.length} sections)...`
  )
}
