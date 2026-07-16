import { Section } from '../../ui/section'

interface AboutProps {
  className?: string
}

export default function About({ className }: AboutProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-12">
        <h2 className="text-center text-3xl font-semibold text-balance sm:text-5xl">
          Organization that adapts to you
        </h2>
        <div className="text-md text-muted-foreground mx-auto max-w-[800px] space-y-4 text-left leading-9 font-medium sm:text-xl">
          <p>
            Most tools break down as your collection grows. What starts organized quickly becomes
            cluttered — links get lost, and finding anything takes too long.
          </p>
          <p>
            Faved combines flexible tagging and instant search to keep everything easy to find.
            Instead of rigid folders, your bookmarks stay organized in a way that adapts to you — so
            even large collections remain fast, clear, and manageable.
          </p>
        </div>
      </div>
    </Section>
  )
}
