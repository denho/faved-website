// Use-case landing pages, one per preset type in Faved Cloud.
//
// `fields` mirrors the preset's fields in faved-cloud (utils/Fields.php,
// Fields::PRESETS), so a page never promises a field the preset doesn't
// create. Keep the two in sync when a preset changes.
//
// `sample` rows are made up for illustration. They show the shape of a
// library, not real listings, prices or people.

export type FieldKind =
  | 'text'
  | 'number'
  | 'date'
  | 'link'
  | 'select-one'
  | 'select-many'
  | 'summary'
  | 'content'
  | 'screenshot'

export interface UseCaseField {
  label: string
  kind: FieldKind
  /** Unit shown after a number, e.g. "min". */
  unit?: string
  /** Seeded options for a select field. */
  options?: string[]
}

export interface UseCaseFaq {
  question: string
  answer: string
}

export interface UseCase {
  slug: string
  /** Name of the preset type in the app. */
  type: string
  /** lucide-react icon name, matching the preset's icon in the app. */
  icon: 'ShoppingBag' | 'ChefHat' | 'Briefcase' | 'House' | 'Newspaper' | 'Calendar'
  /** Short label for menus and cards. */
  label: string
  /** One line for menus and cards. */
  blurb: string
  /** <title> and OG title. */
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  /** The type's sample library. The first column is the record's name. */
  sample: {
    title: string
    columns: string[]
    rows: string[][]
  }
  fields: UseCaseField[]
  /** Things this library lets you do, each tied to a field or a feature. */
  ideas: { title: string; body: string }[]
  /** Optional product clip, root-relative paths. */
  video?: { src: string; poster: string; alt: string; width: number; height: number }
  faq: UseCaseFaq[]
}

export const useCases: UseCase[] = [
  {
    slug: 'product-research',
    type: 'Product',
    icon: 'ShoppingBag',
    label: 'Product research',
    blurb: 'Compare prices, ratings and stock across shops',
    metaTitle: 'Compare products across shops',
    metaDescription:
      'Save product pages from any shop and Faved fills in the price, brand, rating, review count and availability. Sort a dozen tabs of headphones by price in one table.',
    headline: 'Compare products without the twelve open tabs',
    intro:
      'Save a product page from any shop and Faved reads it for you: name, price, currency, brand, rating, review count and whether it is in stock. Every product lands in one table you can sort by price or rating.',
    sample: {
      title: 'Headphones',
      columns: ['Name', 'Price', 'Rating', 'Reviews', 'Availability'],
      rows: [
        ['Over-ear noise-cancelling, black', '$349', '4.7', '12,480', 'In stock'],
        ['Wireless over-ear, 30 h battery', '$399', '4.6', '1,238', 'In stock'],
        ['Studio monitor headphones', '$169', '4.8', '8,902', 'Backordered'],
        ['Open-back, wired', '$279', '4.5', '611', 'Preorder'],
      ],
    },
    fields: [
      { label: 'Name', kind: 'text' },
      { label: 'Price', kind: 'number' },
      { label: 'Currency', kind: 'text' },
      { label: 'Brand', kind: 'text' },
      { label: 'Rating', kind: 'number' },
      { label: 'Review count', kind: 'number' },
      {
        label: 'Availability',
        kind: 'select-one',
        options: ['In stock', 'Out of stock', 'Preorder', 'Backordered', 'Discontinued'],
      },
      {
        label: 'Categories',
        kind: 'select-many',
        options: ['Electronics', 'Home', 'Kitchen', 'Sports', 'Books', '+7 more'],
      },
      { label: 'Screenshot', kind: 'screenshot' },
    ],
    ideas: [
      {
        title: 'Cheapest first, or best rated',
        body: 'Price and rating are numbers, so sorting works the way you expect. Filter to a price range and drop anything out of stock.',
      },
      {
        title: 'A screenshot of the page as it was',
        body: 'Prices change. Faved keeps a screenshot of the product page from the day you saved it, so you can see what it said.',
      },
      {
        title: 'Refresh a whole list in one go',
        body: 'Select every product in the table and extract again. Faved re-reads each page in the background and updates its fields.',
      },
    ],
    video: {
      src: '/static/videos/hero/save-extract-compare.mp4',
      poster: '/static/videos/hero/save-extract-compare-poster.jpg',
      alt: 'Saving a Sonos product page in Faved: Extract fills in its fields, then the Product table is filtered to in-stock headphones under $450 and sorted by rating',
      width: 1536,
      height: 1080,
    },
    faq: [
      {
        question: 'Which shops does it work with?',
        answer:
          'Any shop with a public product page. Faved reads the page itself, so it does not need an integration with the store. If a field is not on the page, it is left empty instead of guessed.',
      },
      {
        question: 'Does it track price changes?',
        answer:
          'Not automatically. You can select products and extract them again at any time to pick up the current price, and the screenshot from the first save stays with the record.',
      },
      {
        question: 'Can I add my own fields, like "Pros" or "Bought"?',
        answer:
          'Yes. The Product type is a starting point. Add a checkbox, a note, a select with your own options, or any other field, and give Extract a hint about what to look for.',
      },
    ],
  },
  {
    slug: 'recipe-collection',
    type: 'Recipe',
    icon: 'ChefHat',
    label: 'Recipe collection',
    blurb: 'Find a 20-minute vegetarian dinner in your own recipes',
    metaTitle: 'A recipe collection you can search',
    metaDescription:
      'Save recipes from any food blog and Faved fills in cuisine, servings, prep and cook time, calories, difficulty, diet and the ingredient list. Filter your own recipes by what you have time for.',
    headline: 'Save recipes from anywhere. Find them by what you have time for.',
    intro:
      'Recipes live on a hundred different blogs, each with a long story above the ingredients. Save the page and Faved pulls out the parts you cook from: cuisine, servings, prep and cook time, calories, difficulty, diet and the ingredient list.',
    sample: {
      title: 'Recipes',
      columns: ['Recipe', 'Cuisine', 'Prep + cook', 'Diet', 'Difficulty'],
      rows: [
        ['Crispy chickpea and spinach curry', 'Indian', '10 + 25 min', 'Vegan', 'Easy'],
        ['Miso-glazed salmon', 'Japanese', '5 + 15 min', 'Pescatarian', 'Easy'],
        ['Lamb ragù with pappardelle', 'Italian', '20 + 180 min', '', 'Medium'],
        ['Black bean tacos', 'Mexican', '15 + 10 min', 'Vegetarian', 'Easy'],
      ],
    },
    fields: [
      { label: 'Recipe name', kind: 'text' },
      {
        label: 'Cuisine',
        kind: 'select-one',
        options: ['Italian', 'Indian', 'Japanese', 'Mexican', 'Thai', '+7 more'],
      },
      { label: 'Servings', kind: 'number' },
      { label: 'Prep time', kind: 'number', unit: 'min' },
      { label: 'Cook time', kind: 'number', unit: 'min' },
      { label: 'Calories', kind: 'number', unit: 'kcal' },
      { label: 'Difficulty', kind: 'select-one', options: ['Easy', 'Medium', 'Hard'] },
      {
        label: 'Diet',
        kind: 'select-many',
        options: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Keto', '+3 more'],
      },
      { label: 'Ingredients', kind: 'text' },
    ],
    ideas: [
      {
        title: 'Dinner in under 30 minutes',
        body: 'Prep and cook time are numbers in minutes. Filter to anything under 30, then narrow by diet or cuisine.',
      },
      {
        title: 'Search by what is in the fridge',
        body: 'The ingredient list is saved as text, and full-text search covers it. Type "chickpeas" and see every recipe that uses them.',
      },
      {
        title: 'The recipe stays when the blog goes',
        body: 'Faved keeps the page content as clean Markdown, so a recipe you saved still opens if the site changes or disappears.',
      },
    ],
    faq: [
      {
        question: 'Does it skip the life story at the top of the post?',
        answer:
          'Yes. Extract fills in the fields from the recipe itself. The full page is still kept as Markdown if you want it, but the record shows the fields.',
      },
      {
        question: 'What if a recipe does not list calories?',
        answer:
          'Then the field stays empty. Extract only fills in what the page states, so you will not get an invented number.',
      },
      {
        question: 'Can I add "Tried it" or my own rating?',
        answer:
          'Yes. Add a checkbox or a number field to the Recipe type. Fields you fill in yourself sit next to the extracted ones.',
      },
    ],
  },
  {
    slug: 'job-search',
    type: 'Job posting',
    icon: 'Briefcase',
    label: 'Job search',
    blurb: 'Every posting with its salary, location and apply link',
    metaTitle: 'Track your job search in one table',
    metaDescription:
      'Save job postings from any job board or careers page. Faved fills in title, company, location, remote or on-site, employment type, salary range, posted date, apply link and requirements.',
    headline: 'Every job you are considering, in one table',
    intro:
      'Job postings are spread across job boards, careers pages and links friends send you. Save each one and Faved fills in the details you compare: title, company, location, remote or on-site, salary range, posted date, the apply link and the key requirements.',
    sample: {
      title: 'Job postings',
      columns: ['Job title', 'Company', 'Workplace', 'Salary range', 'Posted'],
      rows: [
        ['Senior product designer', 'Northwind Labs', 'Remote', '$140k to $165k / year', 'Oct 28'],
        ['Frontend engineer', 'Harbor & Co', 'Hybrid', '€70k to €85k / year', 'Oct 24'],
        ['Design systems lead', 'Fieldnote', 'On-site', 'Not stated', 'Oct 19'],
        ['Staff engineer, platform', 'Brightline', 'Remote', '$190k to $220k / year', 'Oct 15'],
      ],
    },
    fields: [
      { label: 'Job title', kind: 'text' },
      { label: 'Company', kind: 'text' },
      { label: 'Location', kind: 'text' },
      { label: 'Workplace type', kind: 'select-one', options: ['Remote', 'Hybrid', 'On-site'] },
      {
        label: 'Employment type',
        kind: 'select-one',
        options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
      },
      { label: 'Salary range', kind: 'text' },
      { label: 'Posted date', kind: 'date' },
      { label: 'Apply link', kind: 'link' },
      { label: 'Requirements', kind: 'text' },
    ],
    ideas: [
      {
        title: 'Remote only, posted this month',
        body: 'Workplace type is a select and the posted date is a real date. Filter to remote roles from the last 30 days in two clicks.',
      },
      {
        title: 'Add your own pipeline',
        body: 'Add a select field called Status with Saved, Applied, Interviewing and Offer, then filter or sort by it.',
      },
      {
        title: 'Keep the posting after it closes',
        body: 'Postings come down once a role is filled. Faved keeps the page content and a screenshot, so you can reread the job before an interview.',
      },
    ],
    faq: [
      {
        question: 'Which job boards does it work with?',
        answer:
          'Any posting you can open in a browser, from large job boards to a startup’s own careers page. Pages that need you to log in may not share their content.',
      },
      {
        question: 'How is the salary saved?',
        answer:
          'As written on the page, including the currency and the period, for example "$140k to $165k / year". If the posting does not state one, the field stays empty.',
      },
      {
        question: 'Can I track where I applied?',
        answer:
          'Yes. Add a select field for your status and a date field for when you applied. They work like any other field in filters and sorting.',
      },
    ],
  },
  {
    slug: 'home-search',
    type: 'Real estate listing',
    icon: 'House',
    label: 'Home search',
    blurb: 'Compare homes and rentals by price, rooms and area',
    metaTitle: 'Compare homes and rentals side by side',
    metaDescription:
      'Save listings from any property site. Faved fills in the address, price, sale or rent, property type, bedrooms, bathrooms, area and features like balcony or parking.',
    headline: 'Compare homes and rentals side by side',
    intro:
      'Looking for a place means the same handful of numbers on every listing, laid out differently on every site. Save a listing and Faved fills in the address, price, sale or rent, property type, bedrooms, bathrooms, area and features, so every option sits in one table.',
    sample: {
      title: 'Listings',
      columns: ['Address', 'Price', 'Type', 'Beds / baths', 'Area'],
      rows: [
        ['Canal Street 14, 3rd floor', '€1,850 / month', 'Apartment', '2 / 1', '78 m²'],
        ['Linden Avenue 6', '€2,400 / month', 'House', '3 / 2', '120 m²'],
        ['Harbour View 211', '€415,000', 'Condo', '2 / 2', '91 m²'],
        ['Old Mill Lane 3', '€389,000', 'Townhouse', '3 / 1.5', '104 m²'],
      ],
    },
    fields: [
      { label: 'Address', kind: 'text' },
      { label: 'Price', kind: 'number' },
      { label: 'Currency', kind: 'text' },
      { label: 'Listing type', kind: 'select-one', options: ['For sale', 'For rent'] },
      {
        label: 'Property type',
        kind: 'select-one',
        options: ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio', '+2 more'],
      },
      { label: 'Bedrooms', kind: 'number' },
      { label: 'Bathrooms', kind: 'number' },
      { label: 'Area', kind: 'number' },
      { label: 'Area unit', kind: 'select-one', options: ['m²', 'sqft'] },
      {
        label: 'Features',
        kind: 'select-many',
        options: ['Balcony', 'Parking', 'Elevator', 'Pet friendly', 'Garden', '+7 more'],
      },
      { label: 'Screenshot', kind: 'screenshot' },
    ],
    ideas: [
      {
        title: 'Two bedrooms, under budget, with a balcony',
        body: 'Bedrooms and price are numbers, features are a select. Combine them in one filter and only the listings that fit are left.',
      },
      {
        title: 'Rentals and sales apart',
        body: 'Listing type keeps "for rent" and "for sale" separate, so a monthly rent never ends up sorted next to a sale price.',
      },
      {
        title: 'The listing after it is gone',
        body: 'Good places get taken and their pages come down. Faved keeps a screenshot and the description from the day you saved it.',
      },
    ],
    faq: [
      {
        question: 'Which property sites does it work with?',
        answer:
          'Any listing page you can open in a browser. Faved reads the page, so it does not depend on a partnership with the site.',
      },
      {
        question: 'Can I add notes from a viewing?',
        answer:
          'Yes. Every record has notes, and you can add fields of your own, such as a rating out of 5 or a "Viewed on" date.',
      },
      {
        question: 'What about square feet versus square metres?',
        answer:
          'The area is saved as a number with a separate unit field, m² or sqft, taken from the listing.',
      },
    ],
  },
  {
    slug: 'reading-list',
    type: 'Article',
    icon: 'Newspaper',
    label: 'Reading list',
    blurb: 'Articles with author, topic, reading time and a summary',
    metaTitle: 'A reading list that keeps what you read',
    metaDescription:
      'Save articles and Faved fills in the headline, author, publisher, date, reading time and topics, writes a short summary and keeps the full text as Markdown. Search everything you have read.',
    headline: 'A reading list that keeps what you read',
    intro:
      'Save an article and Faved fills in the headline, author, publisher, published date, reading time and topics. It also writes a short summary and keeps the full text, so months later you can search for an idea, not only a title.',
    sample: {
      title: 'Articles',
      columns: ['Headline', 'Publisher', 'Published', 'Reading time', 'Topics'],
      rows: [
        [
          'Why cities are planting tiny forests',
          'The Field Journal',
          'Oct 2026',
          '9 min',
          'Environment',
        ],
        [
          'The quiet economics of open source',
          'Build Weekly',
          'Sep 2026',
          '14 min',
          'Technology, Business',
        ],
        ['How sleep shapes memory', 'Mind & Body', 'Aug 2026', '7 min', 'Health, Science'],
        ['A short history of the typeface', 'Letterform', 'Jul 2026', '11 min', 'Design, Culture'],
      ],
    },
    fields: [
      { label: 'Headline', kind: 'text' },
      { label: 'Author', kind: 'text' },
      { label: 'Publisher', kind: 'text' },
      { label: 'Published date', kind: 'date' },
      { label: 'Reading time', kind: 'number', unit: 'min' },
      {
        label: 'Topics',
        kind: 'select-many',
        options: ['Technology', 'Science', 'Design', 'Business', 'Health', '+7 more'],
      },
      { label: 'Summary', kind: 'summary' },
      { label: 'Page content', kind: 'content' },
    ],
    ideas: [
      {
        title: 'Something short for the train',
        body: 'Reading time is a number in minutes. Filter to anything under 10 and pick from what you saved last week.',
      },
      {
        title: 'Search inside the articles',
        body: 'Full-text search covers the saved page content, so a phrase you half remember finds the article it came from.',
      },
      {
        title: 'A summary before you commit',
        body: 'Each article gets a few-line summary, so you can decide whether a 20-minute read is worth it today.',
      },
    ],
    faq: [
      {
        question: 'Is this a read-later app?',
        answer:
          'It can be one. Save now, filter by reading time later, and the full text is kept as Markdown.',
      },
      {
        question: 'Do summaries cost AI credits?',
        answer:
          'No. Fetching page content, taking a screenshot and generating a summary are free. Credits are only used when Extract fills in your custom fields.',
      },
      {
        question: 'Can I import my old Pocket list?',
        answer:
          'Yes. Faved imports from Pocket and Raindrop.io with your tags, and from any browser’s bookmarks with the folder structure kept.',
      },
    ],
  },
  {
    slug: 'event-planning',
    type: 'Event',
    icon: 'Calendar',
    label: 'Events',
    blurb: 'Talks, gigs and conferences with dates, venue and tickets',
    metaTitle: 'Keep track of events you might go to',
    metaDescription:
      'Save event pages and Faved fills in the name, start and end time, in person or online, venue, city, organizer, ticket price and ticket link. See what is coming up, sorted by date.',
    headline: 'Every event you might go to, sorted by date',
    intro:
      'Conferences, meetups, gigs and workshops each have their own page, and the date is never in the same place twice. Save the page and Faved fills in the start and end time, the format, venue, city, organizer, ticket price and ticket link.',
    sample: {
      title: 'Events',
      columns: ['Event', 'Starts', 'Format', 'City', 'Tickets'],
      rows: [
        ['Design systems meetup', 'Nov 12, 18:30', 'In person', 'Berlin', 'Free'],
        ['Product analytics summit', 'Nov 20, 09:00', 'Hybrid', 'Amsterdam', '€249'],
        ['Indie hackers AMA', 'Nov 27, 17:00', 'Online', '', 'Free'],
        ['Winter jazz night', 'Dec 6, 20:00', 'In person', 'Lisbon', '€35'],
      ],
    },
    fields: [
      { label: 'Event name', kind: 'text' },
      { label: 'Start date', kind: 'date' },
      { label: 'End date', kind: 'date' },
      { label: 'Format', kind: 'select-one', options: ['In person', 'Online', 'Hybrid'] },
      { label: 'Venue', kind: 'text' },
      { label: 'City', kind: 'text' },
      { label: 'Organizer', kind: 'text' },
      { label: 'Ticket price', kind: 'text' },
      { label: 'Ticket link', kind: 'link' },
    ],
    ideas: [
      {
        title: 'What is on next month',
        body: 'Start date is a real date with a time. Sort by it, or filter to a date range, and your shortlist reads like an agenda.',
      },
      {
        title: 'Online only, or in your city',
        body: 'Format is a select and City is text. Filter to online events, or to the city you will be in that week.',
      },
      {
        title: 'The ticket link one click away',
        body: 'The ticket link is saved as its own field, so you can get back to the booking page without hunting through the event site.',
      },
    ],
    faq: [
      {
        question: 'Does it add events to my calendar?',
        answer:
          'No. Faved keeps the dates and links in your library, sorted and filterable, but it does not sync with a calendar app.',
      },
      {
        question: 'What about time zones for online events?',
        answer:
          'Faved saves the date and time as the page states them. Check the event page for the time zone when it matters.',
      },
      {
        question: 'Can I mark which ones I booked?',
        answer:
          'Yes. Add a checkbox or a select field such as Going, Maybe and Booked to the Event type.',
      },
    ],
  },
]

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug)
}
