'use client'

import Image from 'next/image'

import { cn } from '@/components/lib/utils'

interface ScreenshotProps {
  srcLight: string
  srcDark?: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function Screenshot({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  className,
}: ScreenshotProps) {


  if (!srcLight) {
    return <div style={{ width, height }} className={cn('bg-muted', className)} aria-label={alt} />
  }

  return <Image src={srcLight} alt={alt} width={width} height={height} className={className} />
}
