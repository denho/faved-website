import { cn } from '@/components/lib/utils'

interface DocsScreenshotProps {
  src: string
  alt: string
  /** Display width in CSS pixels; images are captured at 2× this. */
  width: number
  className?: string
}

/**
 * An app screenshot on a soft gradient stage, without a border, as in the
 * docs of Linear and similar apps.
 */
export default function DocsScreenshot({ src, alt, width, className }: DocsScreenshotProps) {
  return (
    <figure
      className={cn(
        'not-prose relative my-8 overflow-hidden rounded-2xl px-5 pt-8 pb-5 sm:px-10 sm:pt-12 sm:pb-10',
        'bg-[#0d0e12]',
        'bg-[radial-gradient(60%_90%_at_15%_0%,rgba(37,99,235,0.30),transparent_70%),radial-gradient(60%_90%_at_85%_0%,rgba(124,58,237,0.26),transparent_70%)]',
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ maxWidth: width }}
        className="mx-auto block h-auto w-full rounded-lg shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)]"
      />
    </figure>
  )
}
