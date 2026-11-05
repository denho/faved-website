import type { CSSProperties } from 'react'

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

/** The stage colour the beams are drawn on. */
export const STAGE_BG = 'bg-[#070708]'

/** The beams, each as an overlay filling its positioned parent. */
export default function StageBeams() {
  return beams.map((style, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={style}
    />
  ))
}
