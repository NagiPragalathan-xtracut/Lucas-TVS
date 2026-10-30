/**
 * Single source of truth for the inner-page information architecture.
 *
 * The nav, the footer, the breadcrumbs and the search index all read from
 * here, so adding a page means editing this file and adding one <Route>
 * in App.tsx — nothing else has to be kept in sync by hand.
 *
 * Route strings are written out in full rather than composed, so a grep
 * for "/industries/automotive" finds every use.
 */

export const ROUTES = {
  /** Home3 is the main homepage (30 Sep). /home3 still works — it redirects here. */
  home: '/',
  about: '/about',
  capabilities: '/capabilities',
  engineering: '/engineering-rd',
  technologies: '/technologies',
  products: '/products',
  industries: '/industries',
  automotive: '/industries/automotive',
  industrial: '/industries/industrial',
  defence: '/industries/defence-aerospace',
  quality: '/quality',
  sustainability: '/sustainability',
  insights: '/insights',
  careers: '/careers',
  contact: '/contact',
  search: '/search',
  /** The client's current site uses this path; kept so its links still land. */
  privacy: '/privacy-policy',
} as const

export function productPath(slug: string) {
  return `${ROUTES.products}/${slug}`
}

export function insightPath(slug: string) {
  return `${ROUTES.insights}/${slug}`
}

export type NavItem = {
  label: string
  to: string
  /** Renders as a dropdown in the desktop bar and a nested list on mobile. */
  children?: { label: string; to: string; blurb?: string }[]
}

/**
 * Desktop/mobile navigation: About · Capabilities · Industries · Careers.
 * Products, Quality and Insights were dropped from the bar on review
 * (13 Oct); their pages still exist and stay linked from the footer.
 * Industries gains a dropdown because the wireframes give it three child
 * pages and a landing page.
 */
export const NAV: NavItem[] = [
  { label: 'About', to: ROUTES.about },
  {
    label: 'Capabilities',
    to: ROUTES.capabilities,
    children: [
      {
        label: 'Engineering Services',
        to: ROUTES.capabilities,
        blurb: 'Eight service families across the product lifecycle',
      },
      {
        label: 'Technologies',
        to: ROUTES.technologies,
        blurb: 'The five focus areas our teams are organised around',
      },
      {
        label: 'Engineering & R&D',
        to: ROUTES.engineering,
        blurb: 'How we work, and where',
      },
    ],
  },
  {
    label: 'Industries',
    to: ROUTES.industries,
    children: [
      {
        label: 'Automotive',
        to: ROUTES.automotive,
        blurb: 'Electrification, SDV, connected mobility',
      },
      {
        label: 'Industrial',
        to: ROUTES.industrial,
        blurb: 'Smart manufacturing, IIoT, motion and energy',
      },
      {
        label: 'Defence & Aerospace',
        to: ROUTES.defence,
        blurb: 'Mission systems, real-time software, rugged electronics',
      },
    ],
  },
  { label: 'Careers', to: ROUTES.careers },
]

export type FooterColumn = {
  heading: string
  links: { label: string; to?: string; href?: string }[]
}

/**
 * Footer columns, matching the wireframe footer. `to` is an internal
 * route; `href` is an external link and renders with target="_blank".
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Industries',
    links: [
      { label: 'Automotive', to: ROUTES.automotive },
      { label: 'Industrial', to: ROUTES.industrial },
      { label: 'Defence & Aerospace', to: ROUTES.defence },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: ROUTES.about },
      { label: 'Careers', to: ROUTES.careers },
      { label: 'Contact', to: ROUTES.contact },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Engineering Services', to: ROUTES.capabilities },
      { label: 'Technologies', to: ROUTES.technologies },
    ],
  },
  {
    heading: 'Products',
    links: [
      {
        label: 'Lucas-TVS Products',
        href: 'https://lucas-tvs.com/automotive-solutions-products/',
      },
      {
        label: 'India Nippon (INEL) Products',
        href: 'https://www.indianippon.com/Products-Solutions',
      },
    ],
  },
]

/** Company details, given in the wireframes and reused across pages. */
/**
 * Social profiles (20 Oct). The client's note says these are the current
 * Lucas TVS group pages and division-specific links are to follow — swap
 * the URLs here when they arrive; both footers read from this list.
 */
export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/lucas-tvs/posts/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@lucastvs4109' },
  { label: 'X', href: 'https://x.com/LucasTVSLtd' },
]

export const COMPANY = {
  addressName: 'India Nippon Electricals Limited (INEL) — R&D Tech Center',
  addressLines: [
    'Plot No. 137, Phase-1, SIPCOT Industrial Complex,',
    'Hosur, Tamil Nadu 635126',
  ],
  // Confirmed by the client (24 Oct).
  phone: '+91 89255 50242',
  phoneHref: 'tel:+918925550242',
  email: 'shrihari.km@lucastvs.co.in',
  careersPortal: 'https://career.lucas-tvs.com',
}
