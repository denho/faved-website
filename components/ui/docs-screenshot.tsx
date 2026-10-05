import type { CSSProperties } from 'react'
import { cn } from '@/components/lib/utils'

interface DocsScreenshotProps {
  src: string
  alt: string
  /** Display width in CSS pixels; images are captured at 2× this. */
  width: number
  className?: string
}

const light = (alpha: number) => `rgba(255,255,255,${alpha})`
const fade = (gradient: string) => ({ maskImage: gradient, WebkitMaskImage: gradient })

/**
 * Diagonal beams of light falling in from the left onto a near-black stage.
 * Each beam has a sharp lower or upper edge and fades out towards the right.
 */
const beams: CSSProperties[] = [
  {
    background: `linear-gradient(204deg, ${light(0.03)} 0%, ${light(0.1)} 22%, ${light(0.34)} 40%, transparent 40.4%)`,
    ...fade('linear-gradient(90deg, #000 0%, rgba(0,0,0,0.45) 30%, transparent 62%)'),
  },
  {
    background: `linear-gradient(204deg, transparent 78%, ${light(0.24)} 78.4%, ${light(0.05)} 100%)`,
    ...fade('linear-gradient(90deg, #000 0%, rgba(0,0,0,0.5) 35%, transparent 72%)'),
  },
  {
    background: `linear-gradient(204deg, ${light(0.06)} 0%, ${light(0.04)} 24%, transparent 24.4%)`,
    ...fade('linear-gradient(90deg, transparent 40%, #000 85%)'),
  },
]

/**
 * An app screenshot on a dark stage lit by soft beams, without a border, as in
 * the docs of Linear and similar apps.
 */
export default function DocsScreenshot({ src, alt, width, className }: DocsScreenshotProps) {
  return (
    <figure
      className={cn(
        'not-prose relative my-8 overflow-hidden rounded-2xl bg-[#070708] px-5 pt-8 pb-5 sm:px-10 sm:pt-12 sm:pb-10',
        className
      )}
    >
      {beams.map((style, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={style}
        />
      ))}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ maxWidth: width }}
        className="relative mx-auto block h-auto w-full rounded-lg shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)]"
      />
    </figure>
  )
}
