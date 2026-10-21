import { useState } from 'react'
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

// [feature, pillar0, pillar1, pillar2, pillar3] — always sums to 100.
const BASE_SHARE = [44, 14, 14, 14, 14]
const HOVER_SHARE: Record<number, number[]> = {
  0: [50, 12.5, 12.5, 12.5, 12.5],
  1: [38, 26, 12, 12, 12],
  2: [38, 12, 26, 12, 12],
  3: [38, 12, 12, 26, 12],
  4: [38, 12, 12, 12, 26],
}

export function WhyChooseUs() {
  const canHover = useHasFinePointer()
  const [hovered, setHovered] = useState(-1)
  const active = canHover ? (hovered >= 0 ? hovered : 0) : 0
  const shares = canHover && hovered >= 0 ? HOVER_SHARE[hovered] : BASE_SHARE

  const squeezeStyle = (col: number) =>
    canHover
      ? {
          width: `${shares[col]}%`,
          transition: `width ${SQUEEZE_MS}ms ${SQUEEZE_EASE}`,
        }
      : undefined

  const fade = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? ('auto' as const) : ('none' as const),
    transition: `opacity ${SQUEEZE_MS}ms ${SQUEEZE_EASE}`,
  })

  return (
    <section className="shell pt-16 pb-4 lg:pt-24 lg:pb-8">
      <header className="gap-12 lg:flex lg:items-start lg:justify-between">
        <div className="lg:max-w-[590px]">
          <Eyebrow className="!text-[18px]">Why Choose us</Eyebrow>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Engineering Services That Power Every Stage
          </h2>
        </div>

        <div className="mt-6 lg:mt-2 lg:max-w-[660px] lg:flex-1">
          <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            From concept and architecture to development, validation,
            deployment, and lifecycle support, we deliver end-to-end
            engineering services across electrification, software-defined
            platforms.
          </p>
          <Button className="mt-6">Explore More</Button>
        </div>
      </header>

      <div
        className="mt-10 flex gap-[18px] overflow-x-auto pb-2 lg:mt-[86px] lg:overflow-visible"
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
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                // Static (no-hover) layout keeps the feature card's original
                // fixed-size crop instead of stretching it to cover.
                <img
                  src={item.image}
                  alt={item.alt}
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

              {/* Collapsed: vertical label, cross-fades out as the panel opens. */}
              <h3
                className="absolute bottom-6 left-1/2 origin-center -translate-x-1/2 rotate-180 font-display text-[22px] font-medium whitespace-nowrap text-white lg:text-[30px] [writing-mode:vertical-rl]"
                style={fade(!isActive)}
              >
                {item.label}
              </h3>

              {/* Active: icon, live heading and paragraph, cross-fades in. */}
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
    </section>
  )
}
