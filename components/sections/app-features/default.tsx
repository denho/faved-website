import {
  ArrowDownToLine,
  Bookmark,
  Code,
  Copy,
  Globe,
  Hash,
  Pin,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { CSSProperties, ReactNode } from 'react'

import Glow from '../../ui/glow'
import { Section } from '../../ui/section'

interface AppFeaturesProps {
  /** Brand glow behind the header. */
  showGlow?: boolean
  /** Card visuals (tags, orbit, code, metadata, phone, search, import). */
  showMockups?: boolean
  className?: string
}

const cardStyle: CSSProperties = {
  borderColor: 'color-mix(in oklch, var(--border) 12%, transparent)',
  background:
    'linear-gradient(180deg, color-mix(in oklch, var(--foreground) 4%, transparent), transparent)',
}

const tileStyle: CSSProperties = {
  border: '1px solid color-mix(in oklch, var(--border) 14%, transparent)',
  background: 'color-mix(in oklch, var(--foreground) 5%, var(--background))',
  boxShadow: '0 10px 26px rgba(0,0,0,.4)',
}

const brandTileStyle: CSSProperties = {
  background: 'radial-gradient(120% 120% at 50% 22%, #4f93ff, #0062ff 72%)',
  boxShadow: '0 0 48px 7px rgba(0,98,255,.48), inset 0 1px 0 rgba(255,255,255,.25)',
}

function FeatureCard({
  title,
  description,
  className,
  children,
}: {
  title: string
  description: string
  className?: string
  children?: ReactNode
}) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[16px] border ${className ?? ''}`}
      style={cardStyle}
    >
      <div className="px-[30px] pt-[30px]">
        <h3 className="text-foreground text-[22px] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="text-muted-foreground mt-3 max-w-[42ch] text-[15px] leading-[1.55]">
          {description}
        </p>
      </div>
      {children}
    </article>
  )
}

/* Card 1 — nested tagging sidebar */
function TagsVisual() {
  const tag = ({
    width,
    dot,
    indent = 0,
    count,
    active = false,
    pin = false,
  }: {
    width: string
    dot: string
    indent?: number
    count?: string
    active?: boolean
    pin?: boolean
  }) => (
    <div
      className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2"
      style={{
        marginLeft: indent,
        ...(active
          ? { background: 'rgba(0,98,255,.13)', border: '1px solid rgba(0,98,255,.32)' }
          : undefined),
      }}
    >
      {pin ? (
        <Pin className="size-3.5 flex-none -rotate-45" style={{ color: '#6ea8fe' }} />
      ) : (
        <span className="size-2.5 flex-none rounded-full" style={{ background: dot }} />
      )}
      <Hash className="size-3 flex-none" style={{ color: 'rgba(255,255,255,.32)' }} />
      <span
        className="block h-2 rounded"
        style={{ width, background: active ? 'rgba(255,255,255,.42)' : 'rgba(255,255,255,.26)' }}
      />
      <span className="flex-1" />
      {count && (
        <span
          className="rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none font-medium"
          style={{
            color: 'rgba(255,255,255,.45)',
            background: 'color-mix(in oklch,var(--foreground) 8%,transparent)',
          }}
        >
          {count}
        </span>
      )}
    </div>
  )
  return (
    <div className="relative mt-6 flex min-h-[206px] flex-1 flex-col justify-end overflow-hidden pr-[30px] pl-[30px]">
      <div
        className="overflow-hidden rounded-t-[12px] border border-b-0 px-2.5 pt-3"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="text-muted-foreground flex items-center gap-2 px-2.5 pb-2 text-[11px] font-semibold tracking-wide uppercase"
          style={{ color: 'rgba(255,255,255,.38)' }}
        >
          <Pin className="size-3 -rotate-45" />
          Pinned
        </div>
        {tag({ width: '54px', dot: '#f0a868', count: '128', pin: true })}
        <div className="my-2 h-px" style={{ background: 'rgba(255,255,255,.06)' }} />
        {tag({ width: '46px', dot: '#6ea8fe', count: '94', active: true })}
        {tag({ width: '60px', dot: '#7ee787', indent: 22, count: '37' })}
        {tag({ width: '72px', dot: '#d2a8ff', indent: 22, count: '21' })}
        {tag({ width: '38px', dot: '#ff7b9c', count: '210' })}
      </div>
    </div>
  )
}

/* Card 2 — capture orbit */
function CaptureVisual() {
  return (
    <div className="relative mt-5 min-h-[206px] flex-1">
      <div
        className="absolute top-1/2 right-[13%] left-[13%] h-px -translate-y-[0.5px]"
        style={{
          background:
            'linear-gradient(90deg,transparent,color-mix(in oklch,var(--border) 38%,transparent) 50%,transparent)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 size-[212px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px solid rgba(0,98,255,.14)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 size-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px solid rgba(0,98,255,.2)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-12">
        <div
          className="text-muted-foreground grid size-[62px] place-items-center rounded-[16px]"
          style={tileStyle}
        >
          <Globe className="size-6 stroke-[1.8]" />
        </div>
        <div
          className="grid size-[90px] place-items-center rounded-[24px] text-white"
          style={brandTileStyle}
        >
          <Bookmark className="size-[34px] stroke-[1.9]" />
        </div>
        <div
          className="text-muted-foreground grid size-[62px] place-items-center rounded-[16px]"
          style={tileStyle}
        >
          <Share2 className="size-[22px] stroke-[1.8]" />
        </div>
      </div>
    </div>
  )
}

/* Card 3 — self-hosted code editor */
function CodeVisual() {
  const k = (c: string) => ({ color: c })
  return (
    <div className="relative mt-6 min-h-[236px] flex-1 overflow-hidden pl-[30px]">
      <div
        className="absolute top-0 right-[-22px] left-[30px] h-[300px] overflow-hidden rounded-t-[12px] border border-b-0"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="flex items-center gap-3.5 px-3.5 py-[11px]"
          style={{ borderBottom: '1px solid color-mix(in oklch,var(--border) 12%,transparent)' }}
        >
          <span className="flex gap-[7px]">
            <span className="size-[11px] rounded-full" style={{ background: '#ff5f57' }} />
            <span className="size-[11px] rounded-full" style={{ background: '#febc2e' }} />
            <span className="size-[11px] rounded-full" style={{ background: '#28c840' }} />
          </span>
          <span
            className="text-foreground flex items-center gap-[7px] rounded-[7px] px-3 py-1 font-mono text-xs font-medium"
            style={{ background: 'color-mix(in oklch,var(--foreground) 8%,transparent)' }}
          >
            <Code className="size-3" />
            docker-compose.yml
          </span>
        </div>
        <pre
          className="m-0 px-[18px] py-4 font-mono text-[13px] leading-[1.75] whitespace-pre"
          style={{ color: 'color-mix(in oklch,var(--foreground) 78%,transparent)' }}
        >
          <span style={k('#6ea8fe')}>services</span>:{'\n  '}
          <span style={k('#6ea8fe')}>faved</span>:{'\n    '}
          <span style={k('#8b93a1')}>image</span>:{' '}
          <span style={k('#7ee787')}>denho/faved:latest</span>
          {'\n    '}
          <span style={k('#8b93a1')}>ports</span>:{'\n      - '}
          <span style={k('#7ee787')}>&quot;80:80&quot;</span>
          {'\n      - '}
          <span style={k('#7ee787')}>&quot;443:443&quot;</span>
          {'\n    '}
          <span style={k('#8b93a1')}>volumes</span>:{'\n      - '}
          <span style={k('#7ee787')}>./data:/app/data</span>
          {'\n    '}
          <span style={k('#8b93a1')}>environment</span>:{'\n      '}
          <span style={k('#f0a868')}>DATA_DIR</span>: /app/data
        </pre>
      </div>
    </div>
  )
}

/* Card 4 — smart metadata + duplicate detection */
function DuplicatesVisual() {
  const matchItem = (wide = false) => (
    <div
      className="flex items-center gap-[10px] rounded-[9px] border px-[11px] py-[9px]"
      style={{
        borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
        background: 'color-mix(in oklch,var(--foreground) 3%,transparent)',
      }}
    >
      <span
        className="grid size-[38px] flex-none place-items-center rounded-[8px]"
        style={{ background: 'rgba(255,255,255,.07)' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,.34)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block rounded"
          style={{
            width: wide ? '82%' : '78%',
            height: '7px',
            background: 'rgba(255,255,255,.26)',
          }}
        />
        <span className="mt-[7px] flex gap-1">
          <span
            style={{
              width: '30%',
              height: '5px',
              borderRadius: '3px',
              background: 'rgba(255,123,123,.5)',
            }}
          />
          <span
            style={{
              width: wide ? '42%' : '30%',
              height: '5px',
              borderRadius: '3px',
              background: 'rgba(255,255,255,.13)',
            }}
          />
        </span>
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-none"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  )
  return (
    <div className="relative flex min-h-[236px] flex-1 items-end justify-center px-6 pt-6 pb-3">
      <div
        className="w-full overflow-hidden rounded-[12px] border"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="flex items-center gap-[10px] px-4 py-[11px] pt-[15px]"
          style={{
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '-.005em',
            color: 'var(--foreground)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-alert size-3.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <span>Duplicates found</span>
          <span className="flex-1" />
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-none"
          >
            <path d="m7 20 5-5 5 5" />
            <path d="m7 4 5 5 5-5" />
          </svg>
        </div>
        <div className="flex flex-col gap-2 px-3 pt-2 pb-3">
          {matchItem()}
          {matchItem(true)}
          {matchItem()}
        </div>
      </div>
    </div>
  )
}

/* Card 5 — mobile phone */
function PhoneVisual() {
  const ThumbnailSVG = ({ idx }: { idx: 0 | 1 }) => (
    <svg
      width="58"
      height="42"
      viewBox="0 0 58 42"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={`thumbSky${idx}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={idx === 0 ? '#6db7ff' : '#ffd28a'} />
          <stop offset="1" stopColor={idx === 0 ? '#cfe8ff' : '#ffeccf'} />
        </linearGradient>
      </defs>
      <rect width="58" height="42" fill={`url(#thumbSky${idx})`} />
      {idx === 0 ? (
        <>
          <circle cx="46" cy="11" r="5" fill="#ffe08a" />
          <path d="M0 31 L20 19 L40 31 Z" fill="#7fae6b" />
          <rect y="31" width="58" height="11" fill="#5f9150" />
          <path d="M14 32 L24 24 L34 32 Z" fill="#c9573f" />
          <rect x="17" y="31" width="14" height="11" fill="#e8c9a0" />
          <rect x="21" y="34" width="5" height="8" fill="#7a5230" />
        </>
      ) : (
        <>
          <circle cx="29" cy="16" r="6" fill="#ff9b5c" />
          <path d="M0 30 L16 16 L30 30 Z" fill="#6f8fa8" />
          <path d="M22 30 L40 12 L58 30 Z" fill="#566f86" />
          <rect y="30" width="58" height="12" fill="#3f7a52" />
          <path d="M0 30 Q14 24 30 30 T58 30 V42 H0 Z" fill="#4a9162" />
        </>
      )}
    </svg>
  )
  const listItem = (idx: 0 | 1) => (
    <div key={idx} style={{ display: 'flex', gap: '10px', padding: '12px 2px' }}>
      <span
        style={{
          width: '58px',
          height: '42px',
          borderRadius: '8px',
          flex: 'none',
          overflow: 'hidden',
          position: 'relative' as const,
        }}
      >
        <ThumbnailSVG idx={idx} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            width: idx === 0 ? '88%' : '82%',
            height: '7px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,.34)',
          }}
        />
        <span
          style={{
            display: 'block',
            marginTop: '5px',
            width: idx === 0 ? '54%' : '46%',
            height: '7px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,.34)',
          }}
        />
        <span
          style={{
            display: 'block',
            marginTop: '8px',
            width: idx === 0 ? '64%' : '58%',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(110,168,254,.5)',
          }}
        />
        <span style={{ display: 'flex', gap: '5px', marginTop: '9px' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 6px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,.12)',
              background: 'rgba(255,255,255,.05)',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,.4)',
              }}
            />
            <span
              style={{
                width: idx === 0 ? '22px' : '26px',
                height: '5px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,.22)',
              }}
            />
          </span>
          {idx === 1 && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,.12)',
                background: 'rgba(255,255,255,.05)',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.4)',
                }}
              />
              <span
                style={{
                  width: '30px',
                  height: '5px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,.22)',
                }}
              />
            </span>
          )}
        </span>
        <span
          style={{
            display: 'block',
            marginTop: '9px',
            width: '100%',
            height: '5px',
            borderRadius: '3px',
            background: 'rgba(255,255,255,.13)',
          }}
        />
        <span
          style={{
            display: 'block',
            marginTop: '5px',
            width: idx === 0 ? '80%' : '72%',
            height: '5px',
            borderRadius: '3px',
            background: 'rgba(255,255,255,.13)',
          }}
        />
      </span>
    </div>
  )
  return (
    <div className="relative mt-6 min-h-[268px] flex-1 overflow-hidden">
      <div
        className="absolute bottom-[-50px] left-1/2 w-[236px] -translate-x-1/2 rounded-[34px] p-2"
        style={{
          background: '#0a0a0d',
          boxShadow: '0 0 0 3px rgba(255,255,255,.06),0 24px 50px rgba(0,0,0,.55)',
        }}
      >
        <div className="overflow-hidden rounded-[27px]" style={{ background: '#121217' }}>
          <div
            className="flex items-center justify-between px-[18px] pt-[11px] pb-1.5 text-[11px] font-semibold"
            style={{ color: 'rgba(255,255,255,.8)' }}
          >
            <span>9:41</span>
            <span style={{ display: 'flex', gap: '1px', alignItems: 'center' }}>
              <span
                style={{
                  position: 'relative',
                  width: '16px',
                  height: '9px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,.5)',
                  padding: '1px',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '75%',
                    height: '100%',
                    borderRadius: '1px',
                    background: 'rgba(255,255,255,.85)',
                  }}
                />
              </span>
              <span
                style={{
                  width: '1.5px',
                  height: '4px',
                  borderRadius: '0 1px 1px 0',
                  background: 'rgba(255,255,255,.5)',
                }}
              />
            </span>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 10px 12px' }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,.07)',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </span>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,.12)',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="4" y1="21" y2="14" />
                <line x1="4" x2="4" y1="10" y2="3" />
                <line x1="12" x2="12" y1="21" y2="12" />
                <line x1="12" x2="12" y1="8" y2="3" />
                <line x1="20" x2="20" y1="21" y2="16" />
                <line x1="20" x2="20" y1="12" y2="3" />
                <line x1="1" x2="7" y1="14" y2="14" />
                <line x1="9" x2="15" y1="8" y2="8" />
                <line x1="17" x2="23" y1="16" y2="16" />
              </svg>
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '26px',
                padding: '0 8px',
                borderRadius: '7px',
                background: 'rgba(255,255,255,.07)',
                color: 'rgba(255,255,255,.4)',
              }}
            >
              <Search className="size-[12px] flex-none" />
              <span style={{ fontSize: '11px', fontWeight: 500 }}>Search…</span>
            </span>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,.12)',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 16-4 4-4-4" />
                <path d="M17 20V4" />
                <path d="m3 8 4-4 4 4" />
                <path d="M7 4v16" />
              </svg>
            </span>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'radial-gradient(120% 120% at 50% 20%,#4f93ff,#0062ff)',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
                color: '#fff',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </span>
          </div>
          <div style={{ padding: '0 12px 18px', display: 'flex', flexDirection: 'column' }}>
            {[0, 1].map((i) => (
              <div key={i}>
                {listItem(i as 0 | 1)}
                {i === 0 && <span style={{ height: '1px', background: 'rgba(255,255,255,.07)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Card 6 — full-text search + view switcher */
function SearchVisual() {
  const result = (active = false, widths?: { title: string; desc: string }) => (
    <div
      className="flex items-center gap-2.5 px-3.5 py-[11px]"
      style={active ? { background: 'rgba(0,98,255,.1)' } : undefined}
    >
      <span
        className="size-6 flex-none rounded-[6px]"
        style={{
          background: active
            ? 'radial-gradient(120% 120% at 50% 20%,#4f93ff,#0062ff)'
            : 'rgba(255,255,255,.1)',
        }}
      />
      <span className="flex-1">
        <span
          className="block h-[7px] rounded"
          style={{ width: widths?.title || '68%', background: 'rgba(255,255,255,.26)' }}
        />
        <span
          className="mt-1.5 block h-[5px] rounded"
          style={{ width: widths?.desc || '43%', background: 'rgba(255,255,255,.13)' }}
        />
      </span>
    </div>
  )
  return (
    <div className="relative flex min-h-[268px] flex-1 items-center justify-center px-6 pt-6">
      <div className="w-full">
        <div
          className="text-foreground flex h-11 items-center gap-2.5 rounded-[11px] px-3.5"
          style={{
            border: '1px solid rgba(0,98,255,.3)',
            background: 'color-mix(in oklch,var(--foreground) 5%,var(--background))',
            boxShadow: '0 0 0 4px rgba(0,98,255,.1),0 18px 40px rgba(0,0,0,.4)',
          }}
        >
          <Search className="size-4" style={{ color: '#6ea8fe' }} />
          <span className="text-sm font-medium">
            n8n workflow templates
            <span
              className="ml-px inline-block h-[15px] w-px align-[-2px]"
              style={{ background: '#6ea8fe' }}
            />
          </span>
        </div>
        <div
          className="mt-2 overflow-hidden rounded-[11px]"
          style={{
            border: '1px solid color-mix(in oklch,var(--border) 10%,transparent)',
            background: 'color-mix(in oklch,var(--foreground) 4%,var(--background))',
          }}
        >
          {result(true, { title: '72%', desc: '46%' })}
          {result(false, { title: '60%', desc: '40%' })}
          {result(false, { title: '80%', desc: '52%' })}
        </div>
      </div>
    </div>
  )
}

/* Card 7 — import & migration */
function ImportVisual() {
  const brandNode = (src: string, alt: string, style: CSSProperties) => (
    <div
      className="absolute grid place-items-center rounded-[14px]"
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'color-mix(in oklch,var(--foreground) 7%,var(--background))',
        boxShadow: '0 8px 20px rgba(0,0,0,.35)',
        ...style,
      }}
    >
      <img src={src} alt={alt} width="26" height="26" style={{ display: 'block' }} />
    </div>
  )
  return (
    <div className="relative mt-6 flex min-h-[268px] flex-1 items-center justify-center overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        <line x1="12" y1="24" x2="50" y2="50" stroke="rgba(0,98,255,.16)" strokeWidth="0.4" />
        <line x1="28" y1="15" x2="50" y2="50" stroke="rgba(0,98,255,.16)" strokeWidth="0.4" />
        <line x1="13" y1="73" x2="50" y2="50" stroke="rgba(0,98,255,.16)" strokeWidth="0.4" />
        <line x1="86" y1="23" x2="50" y2="50" stroke="rgba(0,98,255,.16)" strokeWidth="0.4" />
        <line x1="76" y1="72" x2="50" y2="50" stroke="rgba(0,98,255,.16)" strokeWidth="0.4" />
      </svg>
      {brandNode('https://api.iconify.design/logos:chrome.svg', 'Chrome', {
        left: '6%',
        top: '13%',
        transform: 'rotate(-9deg)',
      })}
      {brandNode('https://api.iconify.design/logos:firefox.svg', 'Firefox', {
        left: '22%',
        top: '4%',
        transform: 'rotate(6deg)',
        width: '46px',
        height: '46px',
      })}
      {brandNode('https://api.iconify.design/logos:safari.svg', 'Safari', {
        left: '7%',
        top: '60%',
        transform: 'rotate(8deg)',
        width: '46px',
        height: '46px',
      })}
      {brandNode('https://api.iconify.design/logos:microsoft-edge.svg', 'Edge', {
        left: '79%',
        top: '11%',
        transform: 'rotate(11deg)',
      })}
      {brandNode('https://api.iconify.design/simple-icons:pocket.svg?color=%23ef3f56', 'Pocket', {
        left: '68%',
        top: '58%',
        transform: 'rotate(-7deg)',
        width: '46px',
        height: '46px',
      })}
      <div
        className="absolute grid place-items-center rounded-[18px] text-white"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: '64px',
          height: '64px',
          background: 'radial-gradient(140% 140% at 50% 0%,#4f93ff,#0062ff 72%)',
          boxShadow: '0 0 44px 6px rgba(0,98,255,.45),inset 0 1px 0 rgba(255,255,255,.25)',
        }}
      >
        <ArrowDownToLine className="size-7 stroke-[1.9]" />
      </div>
    </div>
  )
}

/* Card — types with fields: a typed table */
function TypesVisual() {
  const bar = (width: string, alpha = 0.26, height = '7px') => (
    <span
      className="block rounded"
      style={{ width, height, background: `rgba(255,255,255,${alpha})` }}
    />
  )
  const chip = (label: string, color: string) => (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[10px] leading-none font-medium"
      style={{
        color: 'rgba(255,255,255,.8)',
        background: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(255,255,255,.1)',
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
  const stars = (n: number) => (
    <span className="font-mono text-[11px] tracking-[1px]" style={{ color: '#f0a868' }}>
      {'★'.repeat(n)}
      <span style={{ color: 'rgba(255,255,255,.18)' }}>{'★'.repeat(5 - n)}</span>
    </span>
  )
  const rows: {
    title: string
    price: string
    brand: [string, string]
    rating: number
    active?: boolean
  }[] = [
    { title: '74%', price: '€129', brand: ['Aeron', '#6ea8fe'], rating: 5, active: true },
    { title: '58%', price: '€89', brand: ['Vitra', '#7ee787'], rating: 4 },
    { title: '66%', price: '€245', brand: ['Hay', '#d2a8ff'], rating: 4 },
    { title: '50%', price: '€59', brand: ['Muuto', '#ff7b9c'], rating: 3 },
  ]
  return (
    <div className="relative mt-6 flex min-h-[206px] flex-1 flex-col justify-end overflow-hidden pr-[30px] pl-[30px]">
      <div
        className="overflow-hidden rounded-t-[12px] border border-b-0"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-semibold"
          style={{
            color: 'var(--foreground)',
            borderBottom: '1px solid color-mix(in oklch,var(--border) 12%,transparent)',
          }}
        >
          <span
            className="grid size-6 place-items-center rounded-[7px] text-white"
            style={brandTileStyle}
          >
            <ShoppingBag className="size-3.5" />
          </span>
          Products
          <span
            className="rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none font-medium"
            style={{ color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.08)' }}
          >
            128
          </span>
          <span className="flex-1" />
          <span
            className="text-[10px] font-medium tracking-wide uppercase"
            style={{ color: 'rgba(255,255,255,.38)' }}
          >
            8 fields
          </span>
        </div>
        <div
          className="grid items-center gap-3 px-3.5 py-2 text-[10px] font-semibold tracking-wide uppercase"
          style={{
            gridTemplateColumns: '1fr 52px 64px 66px',
            color: 'rgba(255,255,255,.38)',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <span>Title</span>
          <span>Price</span>
          <span>Brand</span>
          <span>Rating</span>
        </div>
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid items-center gap-3 px-3.5 py-2.5"
            style={{
              gridTemplateColumns: '1fr 52px 64px 66px',
              background: row.active ? 'rgba(0,98,255,.1)' : undefined,
              borderBottom: index < rows.length - 1 ? '1px solid rgba(255,255,255,.05)' : undefined,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className="size-5 flex-none rounded-[5px]"
                style={{ background: 'rgba(255,255,255,.1)' }}
              />
              {bar(row.title, row.active ? 0.42 : 0.26)}
            </span>
            <span
              className="font-mono text-[11px] font-medium"
              style={{ color: 'rgba(255,255,255,.75)' }}
            >
              {row.price}
            </span>
            <span>{chip(row.brand[0], row.brand[1])}</span>
            {stars(row.rating)}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Card — extract from the page: the field picker and its cost */
function ExtractVisual() {
  const field = (label: string, hint: string, on = true) => (
    <div
      className="flex items-center gap-2.5 rounded-[9px] px-2.5 py-2"
      style={
        on
          ? { background: 'rgba(0,98,255,.13)', border: '1px solid rgba(0,98,255,.32)' }
          : { border: '1px solid rgba(255,255,255,.08)' }
      }
    >
      <span
        className="grid size-4 flex-none place-items-center rounded-[4px]"
        style={
          on
            ? { background: '#0062ff', boxShadow: '0 0 12px rgba(0,98,255,.5)' }
            : { border: '1px solid rgba(255,255,255,.2)' }
        }
      >
        {on && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
      <span
        className="text-[12px] font-medium"
        style={{ color: on ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.55)' }}
      >
        {label}
      </span>
      <span className="flex-1" />
      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,.35)' }}>
        {hint}
      </span>
    </div>
  )
  return (
    <div className="relative mt-6 flex min-h-[236px] flex-1 flex-col justify-end overflow-hidden px-[30px]">
      <div
        className="rounded-t-[12px] border border-b-0 px-3 pt-3"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="flex items-center gap-2 pb-2.5 text-[11px] font-semibold tracking-wide uppercase"
          style={{ color: 'rgba(255,255,255,.38)' }}
        >
          <Wand2 className="size-3" />
          Fill from the page
        </div>
        <div className="flex flex-col gap-1.5">
          {field('Price', 'Extracted')}
          {field('Brand', 'Matched from its options')}
          {field('Summary', 'AI-generated')}
          {field('Screenshot', 'Page capture', false)}
        </div>
        <div className="mt-3 flex items-center gap-3 pb-4">
          <span
            className="inline-flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-semibold text-white"
            style={brandTileStyle}
          >
            <Sparkles className="size-3.5" />
            Extract from page
          </span>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.45)' }}>
            Uses 1 AI credit
          </span>
        </div>
      </div>
    </div>
  )
}

/* Card — reader: summary, full content and screenshot from one read */
function ReaderVisual() {
  const line = (width: string, alpha = 0.16) => (
    <span
      className="block h-[6px] rounded"
      style={{ width, background: `rgba(255,255,255,${alpha})` }}
    />
  )
  return (
    <div className="relative mt-6 flex min-h-[236px] flex-1 flex-col justify-end overflow-hidden px-[30px]">
      <div
        className="overflow-hidden rounded-t-[12px] border border-b-0"
        style={{
          borderColor: 'color-mix(in oklch,var(--border) 16%,transparent)',
          background: 'color-mix(in oklch,var(--foreground) 6%,var(--background))',
          boxShadow: '0 -24px 60px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5"
          style={{ borderBottom: '1px solid color-mix(in oklch,var(--border) 12%,transparent)' }}
        >
          <span className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold" style={{ color: 'var(--foreground)' }}>
              Page content
            </span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,.4)' }}>
              1,240 words · 6 min read
            </span>
          </span>
          <span className="flex-1" />
          <span
            className="grid size-7 place-items-center rounded-[7px]"
            style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.5)' }}
          >
            <Copy className="size-3.5" />
          </span>
        </div>
        <div className="flex gap-3 px-3.5 pt-3">
          <div className="flex flex-1 flex-col gap-[7px]">
            <span
              className="mb-1 block h-[8px] w-[72%] rounded"
              style={{ background: 'rgba(255,255,255,.34)' }}
            />
            {line('100%')}
            {line('94%')}
            {line('88%')}
            <span
              className="mt-1.5 flex items-center gap-1.5 rounded-[7px] px-2 py-1.5 text-[10px] font-medium"
              style={{
                color: '#6ea8fe',
                background: 'rgba(0,98,255,.1)',
                border: '1px solid rgba(0,98,255,.25)',
                width: 'fit-content',
              }}
            >
              <Sparkles className="size-3" />
              Summary
            </span>
            {line('96%', 0.22)}
            {line('64%', 0.22)}
          </div>
          <div
            className="w-[92px] flex-none overflow-hidden rounded-[8px] border"
            style={{
              borderColor: 'rgba(255,255,255,.1)',
              background: 'linear-gradient(180deg,#1b2533,#0f1319)',
              boxShadow: '0 10px 26px rgba(0,0,0,.4)',
              height: '118px',
            }}
          >
            <span className="block h-[10px]" style={{ background: 'rgba(255,255,255,.08)' }} />
            <span
              className="mx-2 mt-2 block h-[30px] rounded-[4px]"
              style={{ background: 'radial-gradient(120% 120% at 50% 22%,#4f93ff,#0062ff 72%)' }}
            />
            <span
              className="mx-2 mt-2 block h-[5px] w-[70%] rounded"
              style={{ background: 'rgba(255,255,255,.3)' }}
            />
            <span
              className="mx-2 mt-1.5 block h-[4px] w-[90%] rounded"
              style={{ background: 'rgba(255,255,255,.14)' }}
            />
            <span
              className="mx-2 mt-1 block h-[4px] w-[80%] rounded"
              style={{ background: 'rgba(255,255,255,.14)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AppFeatures({
  showGlow = false,
  showMockups = true,
  className,
}: AppFeaturesProps) {
  return (
    <Section className={className} id="features">
      <div className="max-w-container relative mx-auto w-full">
        {showGlow && (
          <div className="pointer-events-none absolute top-[-90px] left-1/2 h-[300px] w-[680px] -translate-x-1/2 opacity-40">
            <Glow variant="center" />
          </div>
        )}

        <header className="relative mx-auto mb-12 flex flex-col items-center gap-4 text-center sm:mb-20">
          <h2 className="text-3xl font-semibold sm:text-5xl">A library that knows what it saved</h2>
          <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
            Every record has a type, every type has fields, and Faved fills them from the page — so
            your library reads like a database, not a list of links.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <FeatureCard
            title="Types and fields, not just folders"
            description="Every library starts with a Bookmark type that has notes and tags. Add presets — Product, Recipe, Job posting, Real estate, Article, Event — or define your own type with text, number, date, link, select and checkbox fields. Views, columns and filters are saved per type."
            className="lg:col-span-4"
          >
            {showMockups && <TypesVisual />}
          </FeatureCard>
          <FeatureCard
            title="Extract from the page"
            description="Pick the fields, and Faved’s AI reads the page and fills them in: one page, or up to 500 at once, in the background while you keep working. Select fields are matched to your options, never invented."
            className="lg:col-span-2"
          >
            {showMockups && <ExtractVisual />}
          </FeatureCard>

          <FeatureCard
            title="Web archive: page content, summaries, screenshots"
            description="Keep every page’s content as clean Markdown, an AI-written summary and a screenshot, with Write and Preview tabs to read or edit them. All of it is free, with no AI credits spent."
            className="lg:col-span-2"
          >
            {showMockups && <ReaderVisual />}
          </FeatureCard>
          <FeatureCard
            title="Options and nested tags"
            description="Tags are options on a select field: nested, color-coded, pinned, with counts and rollups in the sidebar. Use them on every record, or only on one type."
            className="lg:col-span-2"
          >
            {showMockups && <TagsVisual />}
          </FeatureCard>
          <FeatureCard
            title="Capture from anywhere"
            description="Save any web page in one click with the Chrome extension, a lightweight bookmarklet, or the Share menu on Apple and Android. They hand the page over as you see it, so pages behind a login extract too."
            className="lg:col-span-2"
          >
            {showMockups && <CaptureVisual />}
          </FeatureCard>

          <FeatureCard
            title="Works on any device"
            description="Fully responsive across mobile, tablet, and desktop. Installable as a PWA for a faster, native app-like experience."
            className="lg:col-span-2"
          >
            {showMockups && <PhoneVisual />}
          </FeatureCard>
          <FeatureCard
            title="Duplicates detection"
            description="Faved detects duplicate records as you save, helping you keep your library clean."
            className="lg:col-span-2"
          >
            {showMockups && <DuplicatesVisual />}
          </FeatureCard>
          <FeatureCard
            title="Open source at heart"
            description="The classic Faved bookmark manager is open source and free to self-host on your own server with one command. Types, fields and Extract are Faved Cloud features today."
            className="lg:col-span-2"
          >
            {showMockups && <CodeVisual />}
          </FeatureCard>

          <FeatureCard
            title="Full-text search and filters"
            description="Full-text search as you type, page content included, then narrow by any field: option picks, number and date ranges, text matches, even the link’s domain. Filters live in the URL, so a view is shareable."
            className="lg:col-span-3"
          >
            {showMockups && <SearchVisual />}
          </FeatureCard>
          <FeatureCard
            title="Bring your whole library"
            description="Import from Chrome, Safari, Firefox, and Edge with folders turned into nested options, or migrate from Raindrop and Pocket keeping tags and collections. Export any time as a standard bookmarks file."
            className="lg:col-span-3"
          >
            {showMockups && <ImportVisual />}
          </FeatureCard>
        </div>
      </div>
    </Section>
  )
}
