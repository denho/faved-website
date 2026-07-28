'use client'

import Image from '@/components/Image'

import { cn } from '@/components/lib/utils'

interface ScreenshotProps {
  srcLight: string
  srcDark?: string
  alt: string
  width: number
  height: number
  className?: string
  /** Skip lazy-loading and preload the image. Set for above-the-fold / LCP images. */
  preload?: boolean
  /** Overrides the default loading behaviour ('eager' skips lazy-loading). */
  loading?: 'lazy' | 'eager'
  /**
   * Resource fetch priority. Next.js does NOT derive this from `preload`, so
   * it must be set explicitly to emit fetchpriority="high" on the img + preload.
   * Defaults to "high" when `preload` is set.
   */
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Viewport-to-rendered-width hint so the browser picks the right srcset entry. */
  sizes?: string
}

export default function Screenshot({
  srcLight,
  alt,
  width,
  height,
  className,
  preload,
  loading,
  fetchPriority,
  sizes,
}: ScreenshotProps) {
  if (!srcLight) {
    return <div style={{ width, height }} className={cn('bg-muted', className)} aria-label={alt} />
  }

  return (
    <Image
      src={srcLight}
      alt={alt}
      width={width}
      height={height}
      className={className}
      preload={preload}
      loading={loading}
      fetchPriority={fetchPriority ?? (preload ? 'high' : undefined)}
      sizes={sizes}
    />
  )
}
