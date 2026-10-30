import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, ChevronPill, Eyebrow } from './primitives'
import { cx } from '../lib/cx'
import { useHasFinePointer } from '../lib/useHasFinePointer'
import {
  whyFeature,
  whyQualityFirst,
  whyEngineeringExcellence,
  whyGlobalPerspective,
  whySustainableMobility,
} from '../lib/assets'

const ITEMS = [
  {
    label: 'End-to-End Lifecycle Support',
    title: 'End-to-End Lifecycle Support',
    description: 'From concept to validation, deployment and support.',
    image: whyFeature,
    alt: 'Electric vehicle progressing from digital concept to validated prototype',
  },
  {
    label: 'Deep Domain Expertise',
    title: 'Deep Domain Expertise',
    description: 'Automotive, Industrial and Defence engineering experience.',
    image: whyQualityFirst,
    alt: 'Automotive, industrial and defence systems in an advanced engineering test facility',
  },
  {
    label: 'Product + Engineering DNA',
    title: 'Product + Engineering DNA',
    description: 'Product heritage combined with advanced engineering.',
    image: whyEngineeringExcellence,
    alt: 'Engineer developing a physical electric motor alongside its digital model',
  },
  {
    label: 'HW+SW Integration',
    title: 'Hardware + Software Integration',
    description: 'Electronics, embedded, cloud and AI under one roof.',
    image: whyGlobalPerspective,
    alt: 'Embedded controller connected to hardware-in-the-loop validation equipment',
  },
  {
    label: 'Future-Ready Technologies',
    title: 'Future-Ready Technologies',
    description: 'Electrification, SDV, IIoT, AI and digital engineering.',
    image: whySustainableMobility,
    alt: 'Connected electric vehicle platform in a next-generation engineering lab',
  },
]

/**
 * Hover-to-widen "squeeze" animation for the row below, adapted from
 * `ui/carousel-squeeze.tsx` — same easeOutExpo curve and hover-grow/squeeze
 * share model, but applied to this section's fixed 5-card row instead of
 * that component's sliding/stepping carousel (there's nothing to page here).
 * Only kicks in on devices that can actually hover; touch keeps the
 * original fixed-width horizontal scroller untouched, with the feature card
 * always open and the pillars always collapsed.
 */
const SQUEEZE_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SQUEEZE_MS = 700

/**
 * One rule for every card rather than a per-card table: whichever card is
 * open takes `EXPANDED_SHARE` and the other four split the remainder evenly.
 * The old hand-written table gave the feature card 50% but any hovered
 * pillar only 26% (with the feature card still holding 38%), so hovering
 * card 2 opened it to roughly half the width card 1 opens to.
 */
const EXPANDED_SHARE = 50
const COLLAPSED_SHARE = (100 - EXPANDED_SHARE) / (ITEMS.length - 1)

/**
 * The row's flex gaps sit outside these percentage widths, so the shares
 * alone add up to 100% *plus* every gap and the row overruns the shell.
 * Each card gives back its even slice of the total gap.
 */
const GAP_PX = 18
const GAP_OFFSET = (GAP_PX * (ITEMS.length - 1)) / ITEMS.length

/**
 * Home3-only replacement for `WhyChooseUs`. Heading & sub-line follow the
 * Sep-11 content review doc — the old copy duplicated Engineering Services'
 * "Engineering Services That…" heading and repeated Section 05's lifecycle
 * list, both flagged by the CHRO. The 5 pillar cards are unchanged (doc
 * keeps them as-is). Header now fades/rises into view on scroll.
 */
export function WhyChooseUsHome3() {
  const canHover = useHasFinePointer()
  const [hovered, setHovered] = useState(-1)
  const active = canHover ? (hovered >= 0 ? hovered : 0) : 0

  const squeezeStyle = (col: number) =>
    canHover
      ? {
          width: `calc(${col === active ? EXPANDED_SHARE : COLLAPSED_SHARE}% - ${GAP_OFFSET}px)`,
          transition: `width ${SQUEEZE_MS}ms ${SQUEEZE_EASE}`,
        }
      : undefined

  const fade = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? ('auto' as const) : ('none' as const),
    transition: `opacity ${SQUEEZE_MS}ms ${SQUEEZE_EASE}`,
  })

  return (
    <section className="shell pt-12 pb-[100px] sm:pt-8 lg:pt-12">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="gap-12 lg:flex lg:items-start lg:justify-between"
      >
        <div className="lg:max-w-[590px]">
          {/* tone="green": lime on this white band was 1.46:1 (launch audit). */}
          <Eyebrow tone="green" className="!text-[18px]">
            Why Choose us
          </Eyebrow>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Why Engineering Teams Choose Us
          </h2>
        </div>

        <div className="mt-6 lg:mt-2 lg:max-w-[660px] lg:flex-1">
          <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            Product-engineering heritage combined with modern digital
            engineering — electronics, embedded, cloud and AI under one roof,
            across Automotive, Industrial and Defence.
          </p>
          <Button href="/about" className="mt-6">
            Explore More
          </Button>
        </div>
      </motion.header>

      {canHover ? (
      <div
        className="mt-10 flex overflow-x-auto pb-2 lg:mt-[86px] lg:overflow-visible"
        style={{ gap: `${GAP_PX}px` }}
        onMouseLeave={() => setHovered(-1)}
      >
        {ITEMS.map((item, i) => {
          const isActive = i === active
          const isFeature = i === 0

          return (
            <article
              key={item.label}
              className={cx(
                'relative h-[420px] overflow-hidden rounded-[18.3px] lg:h-[576px]',
                isFeature ? 'w-[300px] sm:w-[420px]' : 'w-[110px]',
                canHover ? '' : cx('shrink-0', isFeature ? 'lg:w-[549px]' : 'lg:w-[140px]'),
              )}
              style={squeezeStyle(i)}
              onMouseEnter={() => canHover && setHovered(i)}
            >
              {canHover || !isFeature ? (
                // Below the fold; both fill a fixed-size card, so no
                // width/height is needed to hold the layout.
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute max-w-none"
                  style={{
                    height: '163.71%',
                    width: '257.33%',
                    left: '-7.22%',
                    top: '-54.12%',
                  }}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.66]" />

              <h3
                className="absolute bottom-6 left-1/2 origin-center -translate-x-1/2 rotate-180 font-display text-[22px] font-medium whitespace-nowrap text-white lg:text-[30px] [writing-mode:vertical-rl]"
                style={fade(!isActive)}
              >
                {item.label}
              </h3>

              <div
                className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6"
                style={fade(isActive)}
              >
                <ChevronPill
                  className="absolute top-4 right-4 !h-[30px] !w-[62px] lg:top-6 lg:right-6 lg:!h-9 lg:!w-[73px]"
                  label={`Read more about ${item.title}`}
                />
                <h3 className="max-w-[420px] font-display text-[20px] leading-[1.2] font-medium text-white lg:text-[26px]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[420px] font-body text-[14px] leading-[1.5] text-white/85 lg:text-[15px]">
                  {item.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>
      ) : (
        <TouchCarousel />
      )}
    </section>
  )
}

/**
 * Touch devices (24 Oct). The hover squeeze can't run without a pointer,
 * and the old fallback left the four pillar cards as 110px slivers with
 * sideways labels that never opened — their copy was unreachable. Here
 * every card is a full card: photo, title and line, swiped one at a time
 * with scroll-snap, the next card peeking in so it reads as a carousel,
 * and dots below that track the position and jump on tap.
 */
function TouchCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    if (!card) return
    const step = card.offsetWidth + GAP_PX
    setCurrent(Math.min(ITEMS.length - 1, Math.max(0, Math.round(track.scrollLeft / step))))
  }

  const goTo = (i: number) => {
    const track = trackRef.current
    const card = track?.children[i] as HTMLElement | undefined
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="mt-8">
      <div
        ref={trackRef}
        onScroll={onScroll}
        aria-label="Why engineering teams choose us"
        className="-mx-5 flex snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: `${GAP_PX}px` }}
      >
        {ITEMS.map((item, i) => (
          <article
            key={item.label}
            aria-label={`${i + 1} of ${ITEMS.length}: ${item.title}`}
            className="relative h-[360px] w-[84%] shrink-0 snap-start overflow-hidden rounded-[18px] sm:w-[46%]"
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
            <span className="absolute top-4 left-4 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[12px] text-lime-light backdrop-blur-sm">
              {String(i + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-[21px] leading-[1.2] font-medium text-white">{item.title}</h3>
              <p className="mt-2 font-body text-[14px] leading-[1.5] text-white/85">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {ITEMS.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${item.title}`}
            aria-current={i === current}
            className="grid h-11 w-6 place-items-center"
          >
            <span
              className={cx(
                'block h-2 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-green-deep' : 'w-2 bg-line',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
