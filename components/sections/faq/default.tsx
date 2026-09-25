import { ReactNode } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { Section } from '../../ui/section'
import siteMetadata from '@/data/siteMetadata'

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
    question: 'What are records, types and fields?',
    answer: (
      <>
        <Answer>
          A record is a saved web page. Its type decides which fields it carries: text, numbers with
          units, dates and times, links, checkboxes, selects with nested options, plus a summary,
          the page content and a screenshot. Until you build a type of your own, records land in a
          Bookmark type with notes and tags; the first type you create becomes the default.
        </Answer>
        <Answer>
          Add presets such as Product, Recipe, Job posting, Real estate listing, Article and Event,
          or define your own. Fields can also be global, so every record has them whatever its type.
          Each type keeps its own columns, filters and layout, so a list of products looks like a
          catalogue and a list of recipes looks like a cookbook. Records, fields and types are
          unlimited on every plan.
        </Answer>
      </>
    ),
  },
  {
    question: 'What does Extract do?',
    answer: (
      <>
        <Answer>
          Extract reads a page and fills in the fields you picked. It can also write an AI summary,
          keep the page content as clean Markdown, and take a screenshot. Select fields are matched
          to the options you already have, never invented.
        </Answer>
        <Answer>
          Faved fetches the page by its address, or the bookmarklet and extension hand it over as
          you see it, so pages behind a login extract too. A new record is extracted when you save
          it, in the background, unless you switch that off. Run it on one record, or on up to 500
          at once, and follow the progress in the sidebar.
        </Answer>
      </>
    ),
  },
  {
    question: 'What counts as an AI credit?',
    answer: (
      <>
        <Answer>
          One AI credit is one page put through the AI to fill your custom fields, however many
          fields it comes back with. Running it on the same page again costs another. It makes no
          difference whether Faved fetched the page or the bookmarklet handed it over.
        </Answer>
        <Answer>
          Everything else is free and uncounted. Fetching page metadata (title, description and
          preview image) and content, taking a screenshot and generating a summary cost nothing.
        </Answer>
      </>
    ),
  },
  {
    question: 'What happens when I use up my AI credits?',
    answer: (
      <>
        <Answer>
          AI extraction pauses until your credits renew, or on a trial, until you subscribe.
          Everything else keeps working.
        </Answer>
        <Answer>
          Need more sooner? On a paid plan, top up any time: 100 AI credits for $5, or 500 for $20.
          They never expire and are used once the month’s allowance is spent. Or pick Plus for 500 a
          month.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I try Faved before committing?',
    answer: (
      <>
        <Answer>
          Yes. Faved Cloud comes with a 14-day free trial of every feature and 50 AI credits to try
          extraction on. No credit card is required: the trial simply ends, and we keep your records
          until you’re back.
        </Answer>
      </>
    ),
  },
  {
    question: 'Is Faved really free?',
    answer: (
      <>
        <Answer>
          The classic Faved bookmark manager is open source (MIT licensed) and free to self-host,
          with no limits on how much you save.
        </Answer>
        <Answer>
          Faved Cloud, with types, fields, AI extraction and hosting, backups and support included,
          starts at $5 a month, $48 a year, or $120 once for lifetime access.
        </Answer>
      </>
    ),
  },
  {
    question: 'What does the lifetime plan include?',
    answer: (
      <>
        <Answer>
          Basic, paid once: 100 AI credits every month for as long as Faved Cloud exists, top-ups
          whenever you like, and no subscription to manage. If Faved Cloud ever closes you’ll get
          plenty of notice and can move your export to the free self-hosted version.
        </Answer>
      </>
    ),
  },
  {
    question: "What's the difference between self-hosted and Faved Cloud?",
    answer: (
      <>
        <Answer>
          Faved Cloud is where the new features live today: types, fields, views and AI extraction,
          along with hosting, encryption, daily backups and updates, and email support.
        </Answer>
        <Answer>
          The self-hosted version is the classic bookmark manager: nested tags, instant search,
          capture from any browser, import and export, running entirely on your own machine.
          Bookmarks move between the two through import and export at any time.
        </Answer>
      </>
    ),
  },
  {
    question: 'Are records really unlimited?',
    answer: (
      <>
        <Answer>
          Yes. Records, fields and types have no plan limit. Fair usage applies: Faved is for your
          own library, so a few ceilings stop it being used as a bulk scraper.
        </Answer>
        <ul className="text-muted-foreground mb-4 list-disc space-y-1 pl-5 text-balance">
          <li>
            <span className="text-foreground font-medium">Library:</span> 100,000 records.
          </li>
          <li>
            <span className="text-foreground font-medium">Page reads:</span> 500 over a trial, 5,000
            a month on a paid plan. A page read is any page Faved fetches for you, the free ones
            included. It is separate from AI credits.
          </li>
        </ul>
        <Answer>Normal use never comes close. If an account does, we email first.</Answer>
      </>
    ),
  },
  {
    question: 'Can I bring my existing bookmarks with me?',
    answer: (
      <>
        <Answer>
          Yes. Faved imports bookmarks from any browser, including Chrome, Safari, Firefox, and
          Edge, and turns your folders into nested options automatically.
        </Answer>
        <Answer>
          It can also import from other bookmark managers such as Raindrop.io and Pocket, preserving
          your tags, collections, and notes.
        </Answer>
        <Answer>
          Pick which type the records become. Links you’ve already saved are skipped, and a link in
          two folders becomes one record in both.
        </Answer>
      </>
    ),
  },
  {
    question: 'How do I save and extract pages?',
    answer: (
      <>
        <Answer>
          On Chrome, install the{' '}
          <a
            href={siteMetadata.chromeExtensionUrl}
            target="_blank"
            rel="noopener"
            className="text-foreground underline"
          >
            browser extension
          </a>{' '}
          and save the current page in one click. Everywhere else, use the bookmarklet in any
          desktop or mobile browser, or send a page straight to Faved from the Share menu on iPhone,
          iPad, Mac, and Android.
        </Answer>
        <Answer>
          Every save form has an Extract row: pick the fields to fill and extract right away, or
          leave “Extract on save” switched on and let Faved read the page as the record is saved.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I use Faved on my phone?',
    answer: (
      <Answer>
        Yes. Faved is fully responsive across mobile, tablet, and desktop. It’s also a PWA, so you
        can install it to your home screen for an app-like experience, with no separate app download
        required.
      </Answer>
    ),
  },
  {
    question: 'Is my data private?',
    answer: (
      <>
        <Answer>
          On Faved Cloud, your data is stored encrypted with daily backups. Images inside extracted
          page content are served through Faved, so reading a page never announces you to the site
          it came from.
        </Answer>
        <Answer>
          When you self-host the classic version, your bookmarks live entirely on your own
          infrastructure: no tracking, no third parties, nothing leaves your control.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I take my records with me, cancel, or get a refund?',
    answer: (
      <>
        <Answer>
          Yes, always. Export your whole library at any time as a standard bookmarks HTML file, each
          record once, its other folders as tags. It imports into any browser, another bookmark
          manager, or a free self-hosted Faved on your own machine.
        </Answer>
        <Answer>
          Cancel anytime, with no minimum term and no fee. You keep access to the end of what you’ve
          paid for, and we keep your records after that, for whenever you come back. Refunds within
          14 days on monthly, 30 on yearly and lifetime.
        </Answer>
      </>
    ),
  },
  {
    question: 'Which payment methods are supported?',
    answer: (
      <>
        <Answer>
          Any major card, Apple Pay, Google Pay and local methods in your country. PayPal and bank
          transfer are available on request:{' '}
          <a href="mailto:hello@faved.to" className="text-foreground underline">
            email us
          </a>
          .
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
          A person reads every email, so you get the most accurate and helpful assistance.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can Faved be used for teams?',
    answer: (
      <>
        <Answer>
          Team setups are arranged case by case.{' '}
          <a
            href="mailto:hello@faved.to?subject=Faved%20for%20Teams%20request"
            className="text-foreground underline"
          >
            Email us
          </a>{' '}
          and we’ll help you get started.
        </Answer>
      </>
    ),
  },
  {
    question: 'Can I get a discount?',
    answer: (
      <>
        <Answer>
          Yes. Tell us what you think of Faved and we’ll take something off your subscription.{' '}
          <a href="mailto:hello@faved.to" className="text-foreground underline">
            Email us
          </a>
          .
        </Answer>
      </>
    ),
  },
]

export default function FAQ({
  title = 'Questions and Answers',
  description = 'Everything you need to know about records, Extract, AI credits, and getting started.',
  items = DEFAULT_ITEMS,
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-12 sm:gap-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>
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
