import { useId, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { Eyebrow } from '../../components/site/design'
import { ArrowCircle, Band, ChipFilter, DarkHero } from '../../components/site/blocks'
import { ENGAGEMENT_MODELS, SERVICE_LINES, STANDARDS } from '../../data/capabilities'
import { INDUSTRIES } from '../../data/industries'
import { PRODUCTS } from '../../data/products'
import { TECHNOLOGIES } from '../../data/technologies'
import { INSIGHTS } from '../../data/insights'
import { ROUTES, SHOW_INSIGHTS, insightPath, productPath } from '../../lib/routes'
import { approachBackdrop } from '../../lib/assets'

type Kind = 'Page' | 'Industry' | 'Capability' | 'Technology' | 'Product' | 'Insight'

type Entry = {
  id: string
  title: string
  kind: Kind
  to: string
  excerpt: string
  /** Matched, never shown. */
  keywords: string
}

/**
 * The index, built once from the same data files the pages render — so a
 * result can never describe something the site does not show. Page
 * excerpts quote each page's own hero line.
 */
const INDEX: Entry[] = [
  { id: 'p:about', kind: 'Page', title: 'About Us', to: ROUTES.about, excerpt: 'End-to-end engineering, software and digital solutions for Automotive, Industrial and Defence & Aerospace.', keywords: 'who we are heritage vision mission leadership hosur ecosystem inel bat' },
  { id: 'p:capabilities', kind: 'Page', title: 'Engineering Services', to: ROUTES.capabilities, excerpt: 'From concept to deployment, our engineering services span embedded systems, electronics, software, safety and validation.', keywords: 'capabilities services lifecycle engagement' },
  { id: 'p:rd', kind: 'Page', title: 'Engineering & R&D', to: ROUTES.engineering, excerpt: 'Labs for electronics, embedded software and validation — including HIL rigs for faster, safer testing.', keywords: 'r&d research hosur tech center lab' },
  { id: 'p:products', kind: 'Page', title: 'Products & Platforms', to: ROUTES.products, excerpt: 'High-performance hardware and systems for next-generation mobility, industry and defence — backed by the Lucas-TVS group.', keywords: 'catalogue hardware' },
  { id: 'p:quality', kind: 'Page', title: 'Quality & Standards', to: ROUTES.quality, excerpt: 'Proven processes, international standards and rigorous validation — so every product performs as designed.', keywords: 'certification deming iso validation mil sil hil' },
  // Insights (the landing page and every article) is indexed only while
  // SHOW_INSIGHTS is on — today it is placeholder content; see routes.ts.
  ...(SHOW_INSIGHTS
    ? [{ id: 'p:insights', kind: 'Page' as const, title: 'Insights & Resources', to: ROUTES.insights, excerpt: 'Stay updated with the latest developments in engineering, software and defence technologies.', keywords: 'news articles case studies whitepapers events' }]
    : []),
  { id: 'p:careers', kind: 'Page', title: 'Careers', to: ROUTES.careers, excerpt: 'Join a young software & product-engineering division inside Lucas-TVS.', keywords: 'jobs roles hiring openings work' },
  { id: 'p:contact', kind: 'Page', title: 'Contact Us', to: ROUTES.contact, excerpt: 'Tell us about your programme and we’ll route it to the engineering team that owns it.', keywords: 'enquiry address phone email hosur' },
  { id: 'p:privacy', kind: 'Page', title: 'Privacy Policy', to: ROUTES.privacy, excerpt: 'How we collect, use, and share your personal information, and how to manage your privacy settings.', keywords: 'privacy cookies personal data gdpr rights consent' },
  { id: 'p:sustainability', kind: 'Page', title: 'Sustainability', to: ROUTES.sustainability, excerpt: 'For the Lucas-TVS group’s sustainability commitments and reporting, visit the corporate site.', keywords: 'environment esg' },
  ...INDUSTRIES.map((i) => ({
    id: `i:${i.slug}`,
    kind: 'Industry' as const,
    title: i.label,
    to: i.to,
    excerpt: i.intro,
    keywords: [i.title, i.accent, i.cardBody, ...i.focusAreas.map((f) => f.title), ...i.solutions.flatMap((s) => [s.title, ...s.items])].join(' '),
  })),
  ...SERVICE_LINES.map((s) => ({
    id: `c:${s.title}`,
    kind: 'Capability' as const,
    title: s.title,
    to: ROUTES.capabilities,
    excerpt: s.body,
    keywords: s.tags.join(' '),
  })),
  ...ENGAGEMENT_MODELS.map((m) => ({
    id: `c:${m.title}`,
    kind: 'Capability' as const,
    title: m.title,
    to: ROUTES.capabilities,
    excerpt: m.body,
    keywords: 'engagement model',
  })),
  ...STANDARDS.map((s) => ({
    id: `c:${s.code}`,
    kind: 'Capability' as const,
    title: s.code,
    to: ROUTES.quality,
    excerpt: s.body,
    keywords: 'standard safety security',
  })),
  ...TECHNOLOGIES.map((t) => ({
    id: `t:${t.id}`,
    kind: 'Technology' as const,
    title: t.name,
    to: `${ROUTES.technologies}#${t.id}`,
    excerpt: t.blurb,
    keywords: t.items.join(' '),
  })),
  ...PRODUCTS.map((p) => ({
    id: `pr:${p.slug}`,
    kind: 'Product' as const,
    title: p.name,
    to: productPath(p.slug),
    excerpt: p.blurb,
    keywords: `${p.category} ${p.sector} ${p.highlights.join(' ')}`,
  })),
  ...(SHOW_INSIGHTS ? INSIGHTS : []).map((n) => ({
    id: `n:${n.slug}`,
    kind: 'Insight' as const,
    title: n.title,
    to: insightPath(n.slug),
    excerpt: n.summary,
    keywords: `${n.category} ${n.label}`,
  })),
]

// The "Insight" chip only appears while there are Insight entries to filter to.
const KINDS: ('All' | Kind)[] = [
  'All',
  'Page',
  'Industry',
  'Capability',
  'Technology',
  'Product',
  ...(SHOW_INSIGHTS ? (['Insight'] as const) : []),
]

const SUGGESTIONS = ['Battery', 'AUTOSAR', 'Functional safety', 'IIoT', 'Defence electronics', 'Careers']

function search(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return INDEX.map((entry) => {
    const title = entry.title.toLowerCase()
    const body = `${entry.excerpt} ${entry.keywords}`.toLowerCase()
    let score = 0
    for (const term of terms) {
      if (title.includes(term)) score += title.startsWith(term) ? 6 : 4
      else if (body.includes(term)) score += 1
      else return null // every term must match somewhere
    }
    return { entry, score }
  })
    .filter((r): r is { entry: Entry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .map((r) => r.entry)
}

/**
 * Site search. Not drawn in the reference; built from its blocks.
 * Client-side over the index above. The query lives in the URL (?q=), so
 * a search can be linked, bookmarked or reloaded.
 */
export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const kind = params.get('type') ?? 'All'
  const inputId = useId()

  const all = useMemo(() => search(query), [query])
  const results = kind === 'All' ? all : all.filter((r) => r.kind === kind)

  const update = (next: { q?: string; type?: string }) => {
    const q = next.q ?? query
    const type = next.type ?? kind
    const p: Record<string, string> = {}
    if (q) p.q = q
    if (type !== 'All') p.type = type
    setParams(p, { replace: true })
  }

  return (
    <PageShell title="Search">
      <DarkHero
        image={approachBackdrop}
        heightClass="min-h-[480px] lg:min-h-[520px]"
        crumbs={[{ label: 'Search' }]}
        title="Search the"
        accent="site."
        intro={`Pages, engineering services, technologies${SHOW_INSIGHTS ? ', products and insights' : ' and products'} — searched as you type.`}
      />

      <Band tone="mute">
        <div className="flex flex-col gap-5">
          <label htmlFor={inputId} className="sr-only">
            Search the site
          </label>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search, e.g. battery, AUTOSAR, ISO 26262…"
            autoFocus
            className="h-14 w-full rounded-full border-[1.5px] border-line-soft bg-white px-6 font-body text-[16px] text-ink placeholder:text-body focus:border-green-deep focus:outline-none"
          />
          {query && (
            <ChipFilter label="Filter results" options={KINDS} value={kind} onChange={(type) => update({ type })} />
          )}
        </div>

        <div className="mt-7 lg:mt-10">
          {!query ? (
            <div className="flex flex-col gap-4">
              <Eyebrow>Try</Eyebrow>
              <ul className="flex flex-wrap gap-2.5">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => update({ q: s })}
                      className="rounded-full border-[1.5px] border-line-soft bg-white px-[18px] py-2.5 font-body text-[14px] text-ink transition-colors duration-300 hover:border-green-deep"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length === 0 ? (
            <p className="rounded-[18px] border-[1.5px] border-dashed border-line-soft bg-white p-8 text-center font-body text-[15px] text-body">
              Nothing matches “{query}”{kind !== 'All' ? ` in ${kind}` : ''}. Try a broader term, or{' '}
              <Link to={ROUTES.contact} className="font-medium text-green-ink underline-offset-4 hover:underline">
                ask the engineering team
              </Link>
              .
            </p>
          ) : (
            <>
              <p aria-live="polite" className="font-body text-[14px] text-body">
                {results.length} result{results.length === 1 ? '' : 's'} for “{query}”
              </p>
              <ul className="mt-5 grid gap-3.5 md:grid-cols-2 lg:gap-4">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={r.to}
                      className="group flex h-full items-start justify-between gap-4 rounded-[18px] border-[1.5px] border-line-soft bg-white p-5 transition-colors duration-300 hover:border-green-deep/50"
                    >
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <span className="font-mono text-[12px] tracking-[0.08em] text-green-ink uppercase">{r.kind}</span>
                        <span className="font-display text-[18px] leading-[1.3] font-semibold text-ink">{r.title}</span>
                        <span className="line-clamp-2 font-body text-[13px] leading-[1.55] text-body">{r.excerpt}</span>
                      </span>
                      <ArrowCircle />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Band>
    </PageShell>
  )
}
