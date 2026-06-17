import Link from 'next/link'
import { ReactNode } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { Section } from '../../ui/section'

interface FAQItemProps {
  question: string
  answer: ReactNode
  value?: string
}

interface FAQProps {
  title?: string
  description?: string
  items?: FAQItemProps[] | false
  className?: string
}

function Answer({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground mb-4 text-balance">{children}</p>
}

const DEFAULT_ITEMS: FAQItemProps[] = [
  {
    question: 'Is Faved really free?',
    answer: (
      <>
        <Answer>
          Yes. The self-hosted version is free forever, open-source (MIT licensed), and has no
          bookmark limits.
        </Answer>
        <Answer>
          You only pay if you&apos;d rather we host it for you — Faved Cloud starts at $5/month, or
          $2.50/month billed yearly.
        </Answer>
      </>
    ),
  },
  {
    question: "What's the difference between self-hosted and Faved Cloud?",
    answer: (
      <>
        <Answer>They&apos;re the same app — the only difference is who runs the server.</Answer>
        <Answer>
          Self-hosted means you deploy Faved on your own machine or server and own everything end to
          end.
        </Answer>
        <Answer>
          Cloud means we handle hosting, encryption, backups, and updates, plus early access to new
          features and email support. You can start either way and switch later.
        </Answer>
      </>
    ),
  },
  {
    question: 'Do I need to be technical to self-host?',
    answer: (
      <Answer>
        Self-hosting Faved requires only basic familiarity with the command line. It ships as a
        single Docker image, so a basic setup typically takes a few minutes on any computer or
        server.
      </Answer>
    ),
  },
  {
    question: 'Can I try Faved before committing?',
    answer: (
      <>
        <Answer>
          Yes. You can explore the{' '}
          <Link href="https://demo.faved.dev/" className="text-foreground underline">
            live demo
          </Link>{' '}
          before setting up self-hosting or signing up for Faved Cloud.
        </Answer>
        <Answer>
          Additionally, Faved Cloud includes a 14-day free trial with access to all premium
          features, and no credit card is required to start.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I bring my existing bookmarks with me?',
    answer: (
      <>
        <Answer>
          Yes. Faved imports bookmarks from any browser — including Chrome, Safari, Firefox, and
          Edge — and turns your folders into tags automatically.
        </Answer>
        <Answer>
          It can also import from other bookmark managers such as Raindrop.io and Pocket, preserving
          your tags, collections, and notes.
        </Answer>
      </>
    ),
  },
  {
    question: 'How do I actually save links to Faved?',
    answer: (
      <>
        <Answer>
          You can save links from any device. Use the bookmarklet in any desktop or mobile browser,
          or send a page straight to Faved from the native Share menu on iPhone, iPad, and Mac.
        </Answer>
        <Answer>A dedicated browser extension is coming soon.</Answer>
      </>
    ),
  },
  {
    question: 'Can I use Faved on my phone?',
    answer: (
      <Answer>
        Yes. Faved is fully responsive across mobile, tablet, and desktop. It&apos;s also a PWA, so
        you can install it to your home screen for an app-like experience — no separate app download
        required.
      </Answer>
    ),
  },
  {
    question: 'Is my data private?',
    answer: (
      <>
        <Answer>
          When you self-host, your bookmarks live entirely on your own infrastructure — no tracking,
          no third parties, nothing leaves your control.
        </Answer>
        <Answer>
          On Faved Cloud, your data is stored encrypted with automatic backups. Either way, your
          library is yours.
        </Answer>
      </>
    ),
  },
  {
    question: 'Do you provide technical support?',
    answer: (
      <>
        <Answer>Yes, we provide dedicated support via email for Cloud plans.</Answer>
        <Answer>
          We handle support requests personally to ensure you get the most accurate and helpful
          assistance. No AI bots are used in support.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I get a discount on Cloud plan?',
    answer: (
      <>
        <Answer>
          We love hearing from our users! You can exchange your feedback for a discount on your
          subscription.
        </Answer>
        <Answer>
          If you&apos;re interested in sharing your thoughts to help us improve, please reach out
          via email at{' '}
          <a href="mailto:hello@faved.cloud" className="text-foreground underline">
            hello@faved.cloud
          </a>
          .
        </Answer>
      </>
    ),
  },
]

export default function FAQ({
  title = 'Questions and Answers',
  description = 'Everything you need to know about self-hosting, Faved Cloud, and getting started.',
  items = DEFAULT_ITEMS,
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-balance sm:text-5xl">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-md max-w-[640px] text-balance sm:text-xl">
              {description}
            </p>
          )}
        </div>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  )
}
