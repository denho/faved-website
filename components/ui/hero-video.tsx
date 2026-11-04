'use client'

import { useEffect, useRef, useState } from 'react'

import Image from '@/components/Image'
import { cn } from '@/components/lib/utils'

interface HeroVideoProps {
  /** Root-relative path to the H.264 MP4, e.g. /static/videos/hero/x.mp4 */
  src: string
  /** Root-relative path to the first frame, shown until the video plays. */
  poster: string
  /** Accessible description of what the clip shows. */
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  /** Preload the poster as the LCP image. Turn off below the fold. */
  preload?: boolean
}

/**
 * A muted, looping product clip.
 *
 * The first frame is a regular preloaded next/image, so it stays the LCP
 * element and goes through the responsive image loader; the video sits on top
 * and fades in once it is actually playing. Visitors who prefer reduced motion
 * keep the still frame, and the clip pauses while it is scrolled out of view.
 */
export default function HeroVideo({
  src,
  poster,
  alt,
  width,
  height,
  className,
  sizes,
  preload = true,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const basePath = process.env.BASE_PATH || ''

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // The observer reports the initial state right away, so nothing plays
    // (or downloads beyond metadata) until the clip is actually on screen.
    let visible = false

    const sync = () => {
      if (reduceMotion.matches || !visible) {
        video.pause()
      } else {
        // Autoplay can still be refused (e.g. low-power mode); the poster stays.
        video.play().catch(() => {})
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    observer.observe(video)
    reduceMotion.addEventListener('change', sync)

    return () => {
      observer.disconnect()
      reduceMotion.removeEventListener('change', sync)
    }
  }, [])

  return (
    <div className={cn('relative', className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={poster}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full"
        preload={preload}
        fetchPriority={preload ? 'high' : undefined}
        sizes={sizes}
      />
      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-500',
          playing ? 'opacity-100' : 'opacity-0'
        )}
        src={`${basePath}${src}`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onPlaying={() => setPlaying(true)}
      />
    </div>
  )
}
