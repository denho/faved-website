import rss from './rss.mjs'
import docsMd from './docs-md.mjs'

async function postbuild() {
  await rss()
  await docsMd()
}

postbuild()
