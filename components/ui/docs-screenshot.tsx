'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
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
 * the docs of Linear and similar apps. When the page shows it smaller than its
 * real size, clicking it opens it full size in a lightbox.
 */
export default function DocsScreenshot({ src, alt, width, className }: DocsScreenshotProps) {
  const figureRef = useRef<HTMLElement>(null)
  const [isShrunk, setIsShrunk] = useState(false)

  useEffect(() => {
    const figure = figureRef.current
    if (!figure) return
    const observer = new ResizeObserver(([entry]) => {
      // The image fills the figure's content box up to its own width. A few
      // pixels of slack keep rounding from making a full-size image zoomable.
      setIsShrunk(entry.contentRect.width < width - 4)
    })
    observer.observe(figure)
    return () => observer.disconnect()
  }, [width])

  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ maxWidth: width }}
      className={cn(
        'relative mx-auto block h-auto w-full rounded-lg shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10',
        isShrunk && 'cursor-zoom-in'
      )}
    />
  )

  return (
    <figure
      ref={figureRef}
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
      {isShrunk ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label={`Enlarge image: ${alt}`}
              className="relative mx-auto block w-full rounded-lg focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              style={{ maxWidth: width }}
            >
              {image}
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
            <Dialog.Content
              aria-describedby={undefined}
              className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-10"
            >
              <Dialog.Title className="sr-only">{alt}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute inset-0 h-full w-full cursor-zoom-out"
                />
              </Dialog.Close>
              <img
                src={src}
                alt={alt}
                style={{ maxWidth: `min(100%, ${width * 2}px)` }}
                className="pointer-events-none relative h-auto max-h-full w-auto rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
              />
              <Dialog.Close
                aria-label="Close"
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              >
                <XIcon className="size-5" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        image
      )}
    </figure>
  )
}
