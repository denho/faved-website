import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { allDocs } from '../.contentlayer/generated/index.mjs'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const docsMd = () => {
  const publishedDocs = allDocs.filter((doc) => doc.draft !== true)

  for (const doc of publishedDocs) {
    const outPath = path.join(outputFolder, 'docs', `${doc.slug}.md`)
    mkdirSync(path.dirname(outPath), { recursive: true })
    writeFileSync(outPath, doc.body.raw)
  }

  console.log(`Docs markdown generated (${publishedDocs.length} pages)...`)
}

export default docsMd
