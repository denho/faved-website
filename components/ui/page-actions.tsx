'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Claude, OpenAI } from '@/components/social-icons/icons'
import siteMetadata from '@/data/siteMetadata'

/** Links that open Claude or ChatGPT primed with the Markdown version of a docs page. */
export function aiChatUrls(slug: string) {
  const mdUrl = `${siteMetadata.siteUrl}/docs/${slug}.md`
  const aiPrompt = `Read ${mdUrl} so I can ask questions about this page.`
  return {
    claudeUrl: `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`,
    chatgptUrl: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(aiPrompt)}`,
  }
}

interface PageActionsProps {
  slug: string
  rawContent: string
}

export default function PageActions({ slug, rawContent }: PageActionsProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(rawContent)
    setTimeout(() => setCopied(false), 2000)
  }

  const { claudeUrl, chatgptUrl } = aiChatUrls(slug)

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCopy}
        aria-label="Copy page as Markdown"
      >
        {copied ? <Check className="text-green-400" /> : <Copy />}
        {copied ? 'Copied' : 'Copy as Markdown'}
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={claudeUrl} target="_blank" rel="noopener noreferrer">
          <Claude className="fill-current" />
          Open in Claude
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={chatgptUrl} target="_blank" rel="noopener noreferrer">
          <OpenAI className="fill-current" />
          Open in ChatGPT
        </a>
      </Button>
    </div>
  )
}
