import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { IconArrowUpRight, ImageSlot, Pill, SplitHeader } from '../../components/site/design'
import { BODY_GAP, Band, CtaPlate, DarkHero } from '../../components/site/blocks'
import { INSIGHTS, cardLabel, insightBySlug } from '../../data/insights'
import { ROUTES, insightPath } from '../../lib/routes'
import { sectorAutomotive } from '../../lib/assets'
import NotFoundPage from './NotFoundPage'

/**
 * An Insights entry (/insights/:slug). Not drawn in the reference — its
 * cards link back to the listing — so it is built from the reference's
 * blocks: the dark hero with the story's own photograph, the text column,
 * and three more stories in the listing's card style.
 *
 * No entry has article text yet. Where the body is empty the page says so
 * rather than padding the summary out into prose.
 */
export default function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const insight = insightBySlug(slug)
  if (!insight) return <NotFoundPage />

  const more = INSIGHTS.filter((i) => i.slug !== insight.slug).slice(0, 3)

  return (
    <PageShell title={insight.title}>
      <DarkHero
        image={insight.image ?? sectorAutomotive}
        heightClass="min-h-[525px] lg:min-h-[600px]"
        crumbs={[{ label: 'Insights', to: ROUTES.insights }, { label: insight.title }]}
        title={insight.title}
        intro={insight.summary}
        actions={
          <Pill to={ROUTES.insights} tone="outline">
            ← All Insights
          </Pill>
        }
      />

      <Band>
        <article className="mx-auto flex max-w-[760px] flex-col gap-5">
          <p className="font-mono text-[12px] tracking-[0.12em] text-green-ink uppercase lg:text-[13px]">
            {cardLabel(insight)}
          </p>
          <p className="font-display text-[21px] leading-[1.4] font-medium tracking-[-0.01em] text-ink lg:text-[27px]">
            {insight.summary}
          </p>
          <span aria-hidden className="h-1 w-16 rounded-full bg-lime" />
          {insight.body.length > 0 ? (
            insight.body.map((paragraph, i) => (
              <p key={i} className="font-body text-[16px] leading-[1.7] text-body">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="rounded-[14px] border-[1.5px] border-dashed border-line-soft px-5 py-4 font-body text-[14px] leading-[1.6] text-body">
              The full article is on its way. In the meantime, the engineering team is happy to talk
              it through.
            </p>
          )}
        </article>
      </Band>

      <Band tone="mute">
        <SplitHeader
          eyebrow="More insights"
          title="Keep"
          accent="reading."
          actions={
            <Pill to={ROUTES.insights} tone="ghost">
              All Insights →
            </Pill>
          }
        />
        <ul className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {more.map((item) => (
            <li key={item.slug}>
              <Link
                to={insightPath(item.slug)}
                className="group flex h-full flex-col gap-3 rounded-[20px] border-[1.5px] border-line-soft bg-white p-3.5 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                <ImageSlot src={item.image} label="Cover image" className="h-[190px] w-full rounded-[14px] lg:h-[200px]" />
                <span className="flex grow flex-col gap-2 px-1.5 pb-1.5">
                  <span className="font-mono text-[12px] text-green-ink uppercase">{cardLabel(item)}</span>
                  <span className="font-display text-[18px] leading-[1.3] font-semibold text-ink">{item.title}</span>
                  <span className="font-body text-[13px] leading-[1.5] text-body">{item.summary}</span>
                  <span className="mt-auto flex items-center gap-2 pt-1 font-body text-[14px] font-medium text-ink">
                    Read More
                    <IconArrowUpRight />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <CtaPlate
        title="Have a story to share?"
        body="Our engineers speak at industry events and contribute to publications. Get in touch for talks, interviews or media enquiries."
      />
    </PageShell>
  )
}
