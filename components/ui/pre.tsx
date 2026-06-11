'use client'

import { useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function Pre({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'pre'>) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(ref.current?.textContent ?? '')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Copy code"
        onClick={onCopy}
        className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-md border backdrop-blur transition-colors ${
          copied
            ? 'border-green-400/40 bg-green-400/10 text-green-400'
            : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/90'
        }`}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={2} />
        )}
      </button>
      <pre className={['code-block', className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </pre>
    </div>
  )
}
