'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog, Docs } from 'contentlayer/generated'

export const SearchProvider = ({ searchConfig, children }) => {

  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          // {
          //   id: 'homepage',
          //   name: 'Homepage',
          //   keywords: '',
          //   shortcut: ['h', 'h'],
          //   section: 'Home',
          //   perform: () => router.push('/'),
          // },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: CoreContent<Blog | Docs>) => ({
            id: post.path,
            name: post.title,
            keywords: post?.summary || post?.description || '',
            section: post.type,
            subtitle: post.tags?.join(', '),
            perform: () => router.push('/' + post.path),
          }))
        },
        ...searchConfig.kbarConfig,
      }}
    >
  
      {children}
    </KBarSearchProvider>
  )
}