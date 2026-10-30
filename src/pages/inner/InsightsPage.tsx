import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { IconArrowUpRight, ImageSlot, Pill } from '../../components/site/design'
import { BODY_GAP, Band, ChipFilter, CtaPlate, DarkHero } from '../../components/site/blocks'
import {
  FEATURED_INSIGHT,
  GRID_INSIGHTS,
  INSIGHTS,
  INSIGHT_FILTERS,
  SIDE_INSIGHTS,
  cardLabel,
  type Insight,
} from '../../data/insights'
import { ROUTES, insightPath } from '../../lib/routes'
import { sectorAutomotive } from '../../lib/assets'

/** Cards shown before "Load More Insights". */
const PAGE_SIZE = 6

/**
 * Insights & Resources, built to the Insights artboards of the 29 Sep
 * reference. Titles, labels and summaries are the reference's; see
 * data/insights.ts for which of those are still the client's placeholder
 * text.
 *
 * The category chips filter for real. On "All" the page is exactly the
 * reference: a featured story with two beside it, then the grid. Any
 * other category shows one flat grid of that category's entries — there
 * is no meaningful "featured" row inside a single category.
 *
 * "Load More Insights" appears only while there is more to load; with the
 * nine entries that exist today it never does on "All".
 */
export default function InsightsPage() {
  // ?category=Whitepapers opens on that filter — the footer's Whitepapers
  // and Case Studies links use it. Anything unrecognised falls back to All.
  const [params] = useSearchParams()
  const requested = params.get('category') ?? 'All'
  const [filter, setFilter] = useState<string>(
    (INSIGHT_FILTERS as readonly string[]).includes(requested) ? requested : 'All',
  )
  const [shown, setShown] = useState(PAGE_SIZE)

  const isAll = filter === 'All'
  const list = isAll ? GRID_INSIGHTS : INSIGHTS.filter((i) => i.category === filter)
  const visible = list.slice(0, shown)

  const choose = (value: string) => {
    setFilter(value)
    setShown(PAGE_SIZE)
  }

  return (
    <PageShell title="Insights & Resources">
      <DarkHero
        image={sectorAutomotive}
        position="40% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Insights' }]}
        title="Insights Across Mobility, Industry &"
        accent="Defence."
        intro="Stay updated with the latest developments in engineering, software and defence technologies."
        actions={
          <>
            <Pill href="#stories">Latest Stories</Pill>
            <Pill to={ROUTES.contact} tone="outline">
              Subscribe
            </Pill>
          </>
        }
      />

      <Band tone="mute" id="stories">
        <ChipFilter label="Filter insights" options={[...INSIGHT_FILTERS]} value={filter} onChange={choose} />

        {isAll && (
          <div className={`${BODY_GAP} flex flex-col gap-5 lg:flex-row`}>
            <FeaturedStory insight={FEATURED_INSIGHT} />
            <div className="flex min-w-0 grow flex-col gap-5">
              {SIDE_INSIGHTS.map((insight) => (
                <SideStory key={insight.slug} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {visible.length > 0 ? (
          <ul className={`${BODY_GAP} grid gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6`}>
            {visible.map((insight) => (
              <li key={insight.slug}>
                <GridCard insight={insight} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={`${BODY_GAP} rounded-[18px] border-[1.5px] border-dashed border-line-soft bg-white p-8 text-center font-body text-[15px] text-body`}>
            Nothing in {filter} yet — new entries are on their way.
          </p>
        )}

        {list.length > shown && (
          <div className={`${BODY_GAP} flex justify-center`}>
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="inline-flex items-center justify-center rounded-full border-[1.5px] border-line-soft bg-white px-6 py-[13px] font-body text-[15px] font-medium text-ink transition-colors duration-300 hover:border-green-deep"
            >
              Load More Insights
            </button>
          </div>
        )}
      </Band>

      <CtaPlate
        title="Have a story to share?"
        body="Our engineers speak at industry events and contribute to publications. Get in touch for talks, interviews or media enquiries."
      />
    </PageShell>
  )
}

/** The 760 x 400 lead story: photograph under a charcoal scrim, copy at its foot. */
function FeaturedStory({ insight }: { insight: Insight }) {
  return (
    <Link
      to={insightPath(insight.slug)}
      className="group relative flex h-[340px] shrink-0 flex-col justify-end gap-2.5 overflow-hidden rounded-[24px] bg-[#242624] p-6 lg:h-[400px] lg:w-[760px] lg:p-9"
    >
      {insight.image && (
        <img
          src={insight.image}
          alt=""
          aria-hidden
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(20,22,20,0.95)] via-[rgba(20,22,20,0.6)] to-[rgba(20,22,20,0.2)]" />
      <span className="relative font-mono text-[12px] text-lime uppercase">{cardLabel(insight)}</span>
      <span className="relative font-display text-[24px] leading-[1.2] font-semibold text-white lg:text-[32px]">
        {insight.title}
      </span>
      <span className="relative font-body text-[14px] leading-[1.55] text-white/80">{insight.summary}</span>
    </Link>
  )
}

/** A story beside the lead: square thumbnail, label, title, line. */
function SideStory({ insight }: { insight: Insight }) {
  return (
    <Link
      to={insightPath(insight.slug)}
      className="group flex gap-4 rounded-[18px] border-[1.5px] border-line-soft bg-white p-3.5"
    >
      <ImageSlot
        src={insight.image}
        label=""
        className="h-24 w-24 shrink-0 rounded-[12px] lg:h-[150px] lg:w-[150px]"
      />
      <span className="flex flex-col gap-2">
        <span className="font-mono text-[12px] text-body uppercase">{cardLabel(insight)}</span>
        <span className="font-display text-[16px] leading-[1.3] font-semibold text-ink transition-colors duration-300 group-hover:text-green-ink lg:text-[18px]">
          {insight.title}
        </span>
        <span className="font-body text-[13px] leading-[1.5] text-body">{insight.summary}</span>
      </span>
    </Link>
  )
}

/** A grid card: cover, label, title, line, "Read More". */
function GridCard({ insight }: { insight: Insight }) {
  return (
    <Link
      to={insightPath(insight.slug)}
      className="group flex h-full flex-col gap-3 rounded-[20px] border-[1.5px] border-line-soft bg-white p-3.5 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      <ImageSlot
        src={insight.image}
        label="Cover image"
        className="h-[190px] w-full rounded-[14px] lg:h-[200px]"
      />
      <span className="flex grow flex-col gap-2 px-1.5 pb-1.5">
        <span className="font-mono text-[12px] text-green-ink uppercase">{cardLabel(insight)}</span>
        <span className="font-display text-[18px] leading-[1.3] font-semibold text-ink">{insight.title}</span>
        <span className="font-body text-[13px] leading-[1.5] text-body">{insight.summary}</span>
        <span className="mt-auto flex items-center gap-2 pt-1 font-body text-[14px] font-medium text-ink">
          Read More
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <IconArrowUpRight />
          </span>
        </span>
      </span>
    </Link>
  )
}
