import {
  ArrowRightIcon,
  Briefcase,
  Calendar,
  ChefHat,
  House,
  Newspaper,
  ShoppingBag,
} from 'lucide-react'
import type { CSSProperties } from 'react'

import siteConfig from '@/data/siteMetadata'
import type { FieldKind, UseCase } from '@/data/use-cases'
import { useCases } from '@/data/use-cases'
import Link from '@/components/Link'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Glow from '../ui/glow'
import HeroVideo from '../ui/hero-video'
import { Section } from '../ui/section'
import FAQ from '../sections/faq/default'
import ClosingCta from '../sections/cta-closing/default'

export const USE_CASE_ICONS = { ShoppingBag, ChefHat, Briefcase, House, Newspaper, Calendar }

const cardStyle: CSSProperties = {
  borderColor: 'color-mix(in oklch, var(--border) 12%, transparent)',
  background:
    'linear-gradient(180deg, color-mix(in oklch, var(--foreground) 4%, transparent), transparent)',
}

const KIND_LABEL: Record<FieldKind, string> = {
  text: 'Text',
  number: 'Number',
  date: 'Date',
  link: 'Link',
  'select-one': 'Pick one',
  'select-many': 'Pick any',
  summary: 'AI summary',
  content: 'Page content',
  screenshot: 'Screenshot',
}

function SampleTable({ useCase }: { useCase: UseCase }) {
  const Icon = USE_CASE_ICONS[useCase.icon]
  const { title, columns, rows } = useCase.sample
  return (
    <div
      className="overflow-hidden rounded-[16px] border shadow-2xl shadow-black/40"
      style={cardStyle}
    >
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
        <span className="grid size-7 place-items-center rounded-[8px] bg-[#0062ff] text-white">
          <Icon className="size-4" />
        </span>
        <span className="text-foreground text-sm font-semibold">{title}</span>
        <span className="text-muted-foreground ml-auto font-mono text-[11px] tracking-wide uppercase">
          Sample records
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">
              {columns.map((c) => (
                <th key={c} scope="col" className="px-5 py-3 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-white/[0.06]">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={
                      i === 0
                        ? 'text-foreground px-5 py-3.5 font-medium'
                        : 'text-muted-foreground px-5 py-3.5 whitespace-nowrap'
                    }
                  >
                    {cell || <span className="opacity-40">–</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FieldList({ useCase }: { useCase: UseCase }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {useCase.fields.map((f) => (
        <li key={f.label} className="rounded-[12px] border px-4 py-3.5" style={cardStyle}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-foreground font-medium">{f.label}</span>
            <span className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">
              {KIND_LABEL[f.kind]}
              {f.unit ? ` · ${f.unit}` : ''}
            </span>
          </div>
          {f.options && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {f.options.map((o) => (
                <span
                  key={o}
                  className="text-muted-foreground rounded-full border border-white/10 px-2 py-0.5 text-xs"
                >
                  {o}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

const STEPS = [
  {
    title: 'Save the page',
    body: 'Use the Chrome extension, the bookmarklet, the share menu on iPhone or Android, or paste a link into the app.',
  },
  {
    title: 'Pick the type',
    body: 'Choose the preset type. Its fields appear in the form, and you can add your own.',
  },
  {
    title: 'Extract fills it in',
    body: 'Faved reads the page and fills in every field it can find, using one AI credit. Fields the page does not mention stay empty.',
  },
]

export default function UseCasePage({ useCase }: { useCase: UseCase }) {
  const Icon = USE_CASE_ICONS[useCase.icon]
  const others = useCases.filter((u) => u.slug !== useCase.slug)
  const cta = `${siteConfig.cloudUrl}?cta=use-case-${useCase.slug}`

  return (
    <>
      <Section className="overflow-hidden pb-0 sm:pb-0 md:pb-0">
        <div className="max-w-container mx-auto flex flex-col items-center gap-6 pt-10 text-center sm:gap-10">
          <Badge variant="outline" className="animate-appear">
            <Icon className="size-3.5" />
            <span className="text-muted-foreground">Use case</span>
            <Link href="/use-cases" className="flex items-center gap-1">
              {useCase.label}
            </Link>
          </Badge>
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block max-w-[920px] bg-linear-to-r bg-clip-text text-[2rem] leading-tight font-semibold text-balance text-transparent sm:text-5xl sm:leading-tight lg:text-6xl">
            {useCase.headline}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[720px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {useCase.intro}
          </p>
          <div className="animate-appear relative z-10 flex flex-wrap justify-center gap-4 opacity-0 delay-300">
            <Button variant="default" size="lg" asChild>
              <a href={cta}>
                <ArrowRightIcon className="mr-2 size-4" />
                Try for free
              </a>
            </Button>
            <Button variant="glow" size="lg" asChild>
              <a href="#fields">See the {useCase.type} fields</a>
            </Button>
          </div>
          <div className="relative w-full max-w-[1040px] pt-8 pb-16 text-left">
            <div className="animate-appear relative z-10 opacity-0 delay-500">
              <SampleTable useCase={useCase} />
            </div>
            <Glow variant="top" className="animate-appear-zoom opacity-0 delay-700" />
          </div>
        </div>
      </Section>

      <Section id="fields">
        <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-semibold text-balance sm:text-5xl">
              The fields Faved fills in
            </h2>
            <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
              The {useCase.type} type comes with these {useCase.fields.length} fields. Rename them,
              remove them or add your own: it is an ordinary type once it is in your library.
            </p>
          </div>
          <FieldList useCase={useCase} />
        </div>
      </Section>

      {useCase.video && (
        <Section>
          <div className="max-w-container mx-auto flex flex-col items-center gap-10">
            <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
              See it in the app
            </h2>
            <div
              className="w-full max-w-[1040px] overflow-hidden rounded-[16px] border"
              style={cardStyle}
            >
              <HeroVideo
                src={useCase.video.src}
                poster={useCase.video.poster}
                alt={useCase.video.alt}
                width={useCase.video.width}
                height={useCase.video.height}
                preload={false}
                sizes="(max-width: 1040px) 100vw, 1040px"
              />
            </div>
          </div>
        </Section>
      )}

      <Section>
        <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-14">
          <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
            How it works
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-[16px] border p-6 sm:p-8" style={cardStyle}>
                <span className="grid size-8 place-items-center rounded-full bg-[#0062ff]/15 font-mono text-sm text-[#4f93ff]">
                  {i + 1}
                </span>
                <h3 className="text-foreground mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-4 md:grid-cols-3">
            {useCase.ideas.map((idea) => (
              <div key={idea.title} className="p-2 sm:p-4">
                <h3 className="text-foreground text-lg font-semibold">{idea.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{idea.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FAQ
        title="Questions and answers"
        description=""
        items={useCase.faq.map((f) => ({
          question: f.question,
          answer: <p className="text-muted-foreground mb-4 text-balance">{f.answer}</p>,
        }))}
      />

      <Section>
        <div className="max-w-container mx-auto flex flex-col gap-8">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">More ways to use Faved</h2>
          <UseCaseGrid items={others} />
        </div>
      </Section>

      <ClosingCta
        title={`Start your ${useCase.label.toLowerCase()} library`}
        cta="use-case-closing"
      />
    </>
  )
}

export function UseCaseGrid({ items }: { items: UseCase[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((u) => {
        const Icon = USE_CASE_ICONS[u.icon]
        return (
          <li key={u.slug}>
            <Link
              href={`/use-cases/${u.slug}`}
              className="group flex h-full flex-col rounded-[16px] border p-6 transition-colors hover:border-[#0062ff]/50"
              style={cardStyle}
            >
              <span className="grid size-9 place-items-center rounded-[10px] bg-[#0062ff]/15 text-[#4f93ff]">
                <Icon className="size-5" />
              </span>
              <span className="text-foreground mt-5 text-lg font-semibold">{u.label}</span>
              <span className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {u.blurb}
              </span>
              <span className="text-foreground mt-5 flex items-center gap-1 text-sm font-medium">
                {u.type} type
                <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
