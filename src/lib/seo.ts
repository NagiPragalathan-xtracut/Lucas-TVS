import { useEffect } from 'react'
import { PRODUCTS } from '../data/products'
import { INDUSTRIES } from '../data/industries'
import { INSIGHTS } from '../data/insights'

/**
 * Per-route head tags: title, meta description, canonical, Open Graph,
 * robots.
 *
 * One table, read twice:
 *
 *   - at build time by scripts/prerender-head.mjs, which writes a copy of
 *     dist/index.html per route with these tags baked in, so crawlers and
 *     link-preview bots (which mostly don't run JS) see the right page
 *     rather than one generic homepage head; it also builds sitemap.xml
 *     from it,
 *   - at runtime by `useRouteHead` (called from PageShell), so client-side
 *     navigation keeps the tags in step with the page on screen.
 *
 * Descriptions are taken from each page's own hero intro or data-file copy
 * — keep them that way rather than writing marketing lines nobody has
 * approved. Product and industry entries are derived from src/data, so a
 * new product gets its own prerendered page and sitemap entry for free.
 */

export const SITE_URL = 'https://software.lucas-tvs.com'
export const SITE_NAME = 'Lucas-TVS'
/** 1200×630 crop of the Power Electronics hero still; see public/. */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export type PageMeta = {
  /**
   * The bare page name, as PageShell's `title` prop takes it; the
   * " — Lucas-TVS" suffix is added by `fullTitle`. The homepage is the
   * exception and carries its full title, `HOME_TITLE`.
   */
  title: string
  description: string
  /** Keep out of search results: old homepage variants, search, Insights. */
  noindex?: boolean
  /** Leave out of sitemap.xml without noindexing (unused today). */
  sitemap?: false
}

export const HOME_TITLE = 'Lucas-TVS — Engineering the Future'

export function fullTitle(meta: PageMeta) {
  // The homepage (and its old variants) already carry the full title.
  return meta.title === HOME_TITLE ? HOME_TITLE : `${meta.title} — ${SITE_NAME}`
}

const HOME: PageMeta = {
  title: HOME_TITLE,
  // From the "Who we are" copy on the About page.
  description:
    'Embedded systems, software-defined platforms, electronics, controls and validation — engineering for Automotive, Industrial and Defence & Aerospace programmes.',
}

/**
 * Insights is hidden until real articles exist (Oct 30): the pages still
 * render, but every /insights route is noindexed and left out of the
 * sitemap. Lift this when the content is real.
 */
const INSIGHTS_HIDDEN = true

const STATIC_META: Record<string, PageMeta> = {
  '/': HOME,
  // Superseded homepage variants — still routable, never indexed.
  '/home1': { ...HOME, noindex: true },
  '/new-home': { ...HOME, noindex: true },
  '/home2': { ...HOME, noindex: true },
  '/about': {
    title: 'About Us',
    description:
      'Lucas TVS – Products, Systems & Engineering Services is a global engineering and technology partner helping OEMs, Tier-1 suppliers, industrial enterprises and defence organizations develop next-generation products.',
  },
  '/capabilities': {
    title: 'Engineering Services',
    description:
      'From concept to deployment, our engineering services span embedded systems, electronics, software, safety and validation.',
  },
  '/engineering-rd': {
    title: 'Engineering & R&D',
    description:
      'Our R&D Tech Center in Hosur: labs for electronics, embedded software and validation — including HIL rigs for faster, safer testing.',
  },
  '/technologies': {
    title: 'Technologies',
    description:
      'The technology areas our engineering teams are organised around — applied across Automotive, Industrial and Defence.',
  },
  '/products': {
    title: 'Products & Platforms',
    // Built from the catalogue in src/data/products.ts.
    description:
      'Motor controllers, battery management systems, DC-DC converters, chargers, vehicle control units, rugged electronics and industrial controllers for Automotive, Industrial and Defence platforms.',
  },
  '/industries': {
    title: 'Industries',
    description:
      'The same teams, tools and processes serve Automotive, Industrial and Defence — so learning in one sector strengthens the others.',
  },
  '/quality': {
    title: 'Quality & Standards',
    description:
      'Proven processes, international standards and rigorous validation — so every product performs as designed.',
  },
  '/sustainability': {
    title: 'Sustainability',
    description:
      'For the Lucas-TVS group’s sustainability commitments and reporting, visit the corporate site.',
  },
  '/insights': {
    title: 'Insights & Resources',
    description:
      'Stay updated with the latest developments in engineering, software and defence technologies.',
    noindex: INSIGHTS_HIDDEN,
  },
  '/careers': {
    title: 'Careers',
    description:
      'Join a young software & product-engineering division inside Lucas-TVS — electrification, SDV, embedded systems, defence electronics and AI.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Tell us about your programme and we’ll route it to the engineering team that owns it.',
  },
  '/search': {
    title: 'Search',
    description:
      'Pages, engineering services, technologies, products and insights — searched as you type.',
    noindex: true,
  },
}

const SECTOR_LABEL = { Automotive: 'Automotive', Industrial: 'Industrial', Defence: 'Defence & Aerospace' }

/** Every route with its own head, static and data-driven, in nav order. */
export const ROUTE_META: Record<string, PageMeta> = {
  ...STATIC_META,
  ...Object.fromEntries(
    PRODUCTS.map((p) => [
      `/products/${p.slug}`,
      {
        title: p.name,
        description: `${p.blurb} Part of the Lucas-TVS ${SECTOR_LABEL[p.sector]} product portfolio.`,
      },
    ]),
  ),
  ...Object.fromEntries(
    INDUSTRIES.map((i) => [`/industries/${i.slug}`, { title: i.label, description: i.intro }]),
  ),
  ...Object.fromEntries(
    INSIGHTS.map((a) => [
      `/insights/${a.slug}`,
      {
        title: a.title,
        // Some summaries are still placeholder text; don't publish those.
        description: a.summary.startsWith('Lorem')
          ? STATIC_META['/insights'].description
          : a.summary,
        noindex: INSIGHTS_HIDDEN,
      },
    ]),
  ),
}

/** Strip a trailing slash so `/about/` finds `/about`. */
function normalise(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function metaFor(path: string): PageMeta | undefined {
  return ROUTE_META[normalise(path)]
}

/** The routes sitemap.xml lists: everything indexable. */
export function sitemapPaths() {
  return Object.entries(ROUTE_META)
    .filter(([, m]) => !m.noindex && m.sitemap !== false)
    .map(([path]) => path)
}

/** Organization JSON-LD for the homepage head. */
export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
}

// --- Runtime ---------------------------------------------------------------

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setMeta(key: 'name' | 'property', id: string, content: string) {
  upsert(
    `meta[${key}="${id}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(key, id)
      return m
    },
    'content',
    content,
  )
}

/**
 * Bring the head's description, canonical, OG/Twitter text and robots tag
 * in line with `path`. Unknown paths (the 404 page, a bad product slug)
 * get the homepage description and noindex. Title is left to the caller —
 * PageShell owns it via its `title` prop.
 */
export function applyHead(path: string) {
  const known = metaFor(path)
  const meta = known ?? HOME
  const url = SITE_URL + normalise(path)
  const title = known ? fullTitle(known) : document.title

  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', url)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', meta.description)
  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    },
    'href',
    url,
  )

  const robots = document.head.querySelector('meta[name="robots"]')
  if (!known || meta.noindex) setMeta('name', 'robots', 'noindex')
  else robots?.remove()
}

/**
 * Keep the head in step with client-side navigation. On the way out it
 * puts the homepage's tags back, because the homepage doesn't render
 * PageShell and so never sets its own — the same reason PageShell restores
 * the homepage title.
 */
export function useRouteHead(pathname: string) {
  useEffect(() => {
    applyHead(pathname)
    return () => applyHead('/')
  }, [pathname])
}
