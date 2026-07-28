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
  priority?: boolean
  /** Overrides the default loading behaviour ('eager' skips lazy-loading). */
  loading?: 'lazy' | 'eager'
  /**
   * Resource fetch priority. Next.js does NOT derive this from `priority`, so
   * it must be set explicitly to emit fetchpriority="high" on the img + preload.
   * Defaults to "high" when `priority` is set.
   */
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function Screenshot({
  srcLight,
  alt,
  width,
  height,
  className,
  priority,
  loading,
  fetchPriority,
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
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority ?? (priority ? 'high' : undefined)}
    />
  )
}
