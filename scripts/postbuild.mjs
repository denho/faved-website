import rss from './rss.mjs'
import docsMd from './docs-md.mjs'
import generateOg from './generate-og.mjs'

async function postbuild() {
  await rss()
  await docsMd()
  await generateOg()
}

postbuild()
