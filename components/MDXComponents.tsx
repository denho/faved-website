import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Pre from './ui/pre'
import { Steps, Step } from './ui/steps'
import { CodeTabs, CodeTab } from './ui/code-tabs'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Steps,
  Step,
  CodeTabs,
  CodeTab,
}
