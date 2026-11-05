import { genPageMetadata } from 'app/seo'
import { useCases } from '@/data/use-cases'
import { UseCaseGrid } from '@/components/use-cases/UseCasePage'
import { Section } from '@/components/ui/section'
import ClosingCta from '@/components/sections/cta-closing/default'

export const metadata = genPageMetadata({
  title: 'Use cases',
  description:
    'Ways people use Faved: comparing products, collecting recipes, tracking a job search, comparing homes, keeping a reading list and following events. Each starts from a ready-made type.',
})

export default function UseCases() {
  return (
    <>
      <Section>
        <div className="max-w-container mx-auto flex flex-col gap-12 pt-10 sm:gap-16">
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="text-[2rem] leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
              One app, a type for each thing you save
            </h1>
            <p className="text-md text-muted-foreground max-w-[680px] font-medium text-balance sm:text-xl">
              Each of these starts from a preset type in Faved Cloud. Save a page, pick the type,
              and Extract fills in the fields. Or build a type of your own for anything else.
            </p>
          </div>
          <UseCaseGrid items={useCases} />
        </div>
      </Section>
      <ClosingCta cta="use-cases-closing" />
    </>
  )
}
