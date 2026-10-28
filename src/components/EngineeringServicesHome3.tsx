import { AppLink } from './AppLink'
import {
  Boxes,
  Cpu,
  CircuitBoard,
  Code2,
  ShieldCheck,
  Gauge,
  BrainCircuit,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react'
import { Button, ChevronPill, Eyebrow } from './primitives'
import { ScrollConvergeGroup, ScrollConvergeItem } from '@/components/ui/scroll-converge'
import { cx } from '../lib/cx'
import { rndFeature } from '../lib/assets'

const CAPABILITIES: { title: string; blurb: string; icon: LucideIcon }[] = [
  {
    title: 'Product Engineering',
    blurb: 'Concept to deployment and lifecycle management.',
    icon: Boxes,
  },
  {
    title: 'Embedded Systems',
    blurb: 'Intelligent embedded platforms for connected products.',
    icon: Cpu,
  },
  {
    title: 'Electronics Engineering',
    blurb: 'Hardware for next-generation products.',
    icon: CircuitBoard,
  },
  {
    title: 'Software Engineering',
    blurb: 'Scalable software platforms and applications.',
    icon: Code2,
  },
  {
    title: 'Functional Safety & Cybersecurity',
    blurb: 'ISO 26262 · IEC 61508 · ISO 21434 — safe & secure by design.',
    icon: ShieldCheck,
  },
  {
    title: 'Electronics & Controls',
    blurb: 'Motor control, power electronics, HW-SW co-development.',
    icon: Gauge,
  },
  {
    title: 'Digital Engineering',
    blurb: 'AI/ML, IIoT, cloud & edge, predictive maintenance.',
    icon: BrainCircuit,
  },
  {
    title: 'Verification & Testing',
    blurb: 'MIL/SIL/HIL, automation, compliance & certification.',
    icon: ClipboardCheck,
  },
]

/**
 * Home3-only replacement for `EngineeringServices`, per the 16 Sep review.
 *
 * The eight cards and their line items are kept exactly as they are —
 * compressing them to headings only was considered in the call and dropped,
 * because with the focus-areas block above getting shorter there would be
 * too little left on the page. The link behaviour is kept too: every card
 * goes to the single Services page and scrolls to its own section.
 *
 * The one change is the arrows. Each card carried its own chevron pill,
 * which read as eight separate destinations when all eight lead to the same
 * page — so they come off, and the feature card's existing "Explore
 * Engineering Services" pill becomes the single arrow for the whole block.
 */
export function EngineeringServicesHome3() {
  return (
    <section
      id="quality"
      className="relative bg-gradient-to-b from-white to-[#eee] pb-16 lg:pb-24"
    >
      <div className="shell relative">
        <header className="gap-12 lg:flex lg:items-start lg:justify-between">
          <div className="lg:max-w-[590px]">
            <Eyebrow className="!text-[18px]">Engineering Services</Eyebrow>
            <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
              Capabilities That Drive Innovation.
            </h2>
          </div>

          <div className="mt-6 lg:mt-2 lg:max-w-[660px] lg:flex-1">
            <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
              Horizontal — across all three sectors. From concept to
              deployment, our engineering services span embedded systems,
              electronics, software, safety, and validation.
            </p>
            <Button href="/capabilities" className="mt-6">
              Explore More
            </Button>
          </div>
        </header>

        <div className="mt-12 gap-[21px] lg:mt-[64px] lg:flex lg:items-start">
          {/* Capability cards ---------------------------------------- */}
          <ScrollConvergeGroup
            as="ul"
            spread={0}
            lift={26}
            className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-[21px]"
          >
            {CAPABILITIES.map((item, i) => (
              <ScrollConvergeItem
                as="li"
                key={item.title}
                index={i}
                className={cx(i % 2 === 1 && 'lg:translate-y-[49px]')}
              >
                {/* 274px down to 226px: the chevron pill and the `mt-auto`
                    gap above it are gone, so the old floor left every card
                    ending in ~48px of nothing. Also page length, which the
                    review treats as a page-wide budget. */}
                <article className="group relative flex h-full min-h-[226px] flex-col rounded-[19.75px] border border-[#d8d8d8] bg-white p-[17px] transition-all duration-300 hover:-translate-y-1.5 hover:border-lime hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
                  <span className="grid h-[63px] w-[64px] place-items-center rounded-[5px] border border-[#f0f0f0] bg-lime-tint transition-colors duration-300 group-hover:border-lime group-hover:bg-lime">
                    <item.icon
                      aria-hidden
                      strokeWidth={1.6}
                      className="h-[30px] w-[30px] text-ink"
                    />
                  </span>

                  <h3 className="mt-[20px] font-display text-[18px] leading-[1.2] font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[290px] font-body text-[14px] leading-[1.5] text-body">
                    {item.blurb}
                  </p>

                  {/* The per-card chevron pill that sat here is gone (16 Sep
                      review) — one arrow now covers the block, on the
                      feature card below. The hover lift and lime border stay,
                      so a card still signals it is interactive. */}
                </article>
              </ScrollConvergeItem>
            ))}
          </ScrollConvergeGroup>

          {/* Feature card — sticks in view while the taller list scrolls past */}
          <article className="relative mt-8 aspect-[507/615] overflow-hidden rounded-[18px] lg:sticky lg:top-24 lg:mt-0 lg:w-[507px] lg:shrink-0 lg:self-start">
            <img
              src={rndFeature}
              alt="Engineer monitoring an automated motor assembly cell"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.74] to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 lg:p-[16px]">
              {/* Plain link, not a titled card — a 3rd "Engineering Services"
                  label here duplicated the eyebrow and heading above. */}
              <AppLink
                href="/capabilities"
                className="flex items-center justify-between gap-2 rounded-full border border-white bg-black/[0.22] py-[3px] pr-[3px] pl-3 backdrop-blur-sm min-[360px]:pl-4 transition-colors hover:bg-black/40 sm:gap-4 sm:pl-[37px]"
              >
                {/* One line on every phone (24 Oct): the size scales with the
                    viewport down to 11px, and the pill narrows below sm. */}
                <span className="font-sans text-[clamp(11px,3.6vw,18px)] whitespace-nowrap text-white sm:text-[18px] lg:text-[21px]">
                  Explore Engineering Services
                </span>
                <ChevronPill
                  className="!h-[40px] !w-[48px] shrink-0 min-[360px]:!h-[42px] min-[360px]:!w-[64px] !bg-white shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] sm:!h-[50px] sm:!w-[102px]"
                  iconClassName="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]"
                  label="Explore Engineering Services"
                />
              </AppLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
