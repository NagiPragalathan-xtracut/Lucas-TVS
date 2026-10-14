import { useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from './primitives'
import { cx } from '../lib/cx'
import {
  heroSlideAutomotive,
  heroSlideIndustrialHome3,
  heroSlideDefenceAerospaceHome3,
  logoBat,
  germanyFlagMap,
  heroThumbEmbeddedSoftware,
  heroThumbPowerElectronics,
  heroThumbDigitalElectronics,
  heroThumbProductDevelopment,
  heroThumbEngineeringServices,
} from '../lib/assets'
import { insightPath } from '../lib/routes'

// Automotive still runs the original clip — the 16 Sep review kept it as it
// stands and asked for no change. Industrial and Defence are the re-shot
// versions the same review called for; see the note on their imports.
// 14 Oct: the strip follows the client's reference — five capability
// slides, each with the thumbnail cropped from that reference. There are
// three domain clips, so the backdrops reuse them: the car for the software
// and product slides, the robot cell for power electronics and services,
// the command-centre clip for digital electronics.
const SLIDES = [
  { id: 'embedded-software', label: 'Embedded Software', video: heroSlideAutomotive, thumb: heroThumbEmbeddedSoftware },
  { id: 'power-electronics', label: 'Power Electronics', video: heroSlideIndustrialHome3, thumb: heroThumbPowerElectronics },
  { id: 'digital-electronics', label: 'Digital Electronics', video: heroSlideDefenceAerospaceHome3, thumb: heroThumbDigitalElectronics },
  { id: 'product-development', label: 'Product Development', video: heroSlideAutomotive, thumb: heroThumbProductDevelopment },
  { id: 'engineering-services', label: 'Engineering Services', video: heroSlideIndustrialHome3, thumb: heroThumbEngineeringServices },
]

const AUTOPLAY_MS = 5000
const EASE = [0.16, 1, 0.3, 1] as const

const riseIn = (reduceMotion: boolean | null, delay: number) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EASE },
      }

/**
 * Home3-only replacement for `Hero`.
 *
 * 14 Oct: rebuilt to the client's slider reference. The three diagonal
 * panels became one full-bleed clip that crossfades between slides. The
 * five capability cards ride a curved track along the bottom (`SlideArc`)
 * — the homepage sectors carousel's orbit and glowing dot, laid flat — with
 * the active card at the crest, ringed in lime, its bar filling over the
 * slide's run. No prev/next arrows (asked to remove them).
 * Copy, CTA and the BAT card above it are unchanged.
 *
 * Timing is driven by the progress animation itself: an always-rendered
 * timer element runs the same keyframes as the visible bar and its
 * `animationend` advances the slide. Hovering the hero pauses both (one
 * `animation-play-state`), so the bar and the slide change never drift,
 * and pausing resumes from where it stopped rather than restarting.
 * Under reduced motion nothing autoplays and the active bar shows full.
 */
export function HeroHome3() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = (i: number) => setActive((i + SLIDES.length) % SLIDES.length)

  const progressStyle = {
    animationName: 'hero-progress',
    animationDuration: `${AUTOPLAY_MS}ms`,
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
    animationPlayState: paused ? 'paused' : 'running',
  } as const

  return (
    <section
      // `sticky`, not `fixed`: the hero keeps its place in flow (so it still
      // sets the scroll distance before the next section arrives) but pins to
      // the top of the viewport and stays there while everything below scrolls
      // up over it. Works because no ancestor scrolls or clips — `main` and the
      // page wrapper are both plain blocks. `z-0` puts it under the stacking
      // context that wraps the rest of the page in Home3.
      className="sticky top-0 z-0 overflow-hidden bg-white pb-16 lg:pb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[560px] bg-black sm:h-[620px] lg:h-[720px]">
        {/* One full-bleed clip at a time, crossfading. Only the active clip
            preloads; the others fetch when they come up. */}
        <div className="relative h-full">
          {SLIDES.map((slide, i) => (
            <video
              key={slide.id}
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              preload={i === active ? 'auto' : 'none'}
              aria-hidden="true"
              className={cx(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
          {/* Floor scrim for the slide strip, plus a lighter one up top for
              the floating header. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35" />
        </div>

        {/* The slide timer — see the component note. Always rendered (the
            visible bars are hidden on a phone), never seen. */}
        {!reduceMotion && (
          <span
            key={`timer-${active}`}
            aria-hidden
            className="pointer-events-none absolute h-px w-px opacity-0"
            style={progressStyle}
            onAnimationEnd={() => goTo(active + 1)}
          />
        )}

        {/* Legibility scrim. The per-panel gradient is bottom-weighted for
            the number/label and only reaches black/15 at mid-height, which
            left the headline sitting on bright footage on the Industrial and
            Defence clips. This is horizontal instead of vertical and clears
            to nothing by 78%, so it only darkens the band the copy actually
            occupies and leaves the right-hand panels at full brightness.
            `pointer-events-none` keeps the panels clickable through it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 from-0% via-black/42 via-55% to-transparent to-88%"
        />

        {/* Copy — pinned over the left edge on every panel arrangement.
            Centred, not top-anchored: the padding reserves exactly the band
            the floating header occupies (top-0 + pt-4 + 75px of bar = 91px),
            then `justify-center` splits what's left evenly, so the gap from
            the header down to the headline matches the gap from the CTA to
            the bottom of the video. `lg:block` used to override the flex
            centring, which is what left the headline pinned 13px under the
            header with 311px of dead space below it. */}
        <div className="shell pointer-events-none absolute inset-0 flex flex-col justify-center pt-24 lg:pt-[92px] xl:pb-[210px]">
          <div className="pointer-events-auto flex flex-col">
            <motion.div {...riseIn(reduceMotion, 0.1)} className="order-1 lg:mt-0">
              {/* 16 Sep review: two messages only — what we do, then who it
                  is for. Anything past that reads busy at the few seconds
                  this banner actually gets.

                  This replaces the Sep-11 pairing, which ran a third
                  message ahead of both: an h1 of "Indian Engineering For
                  The World's Hardest Problems." over a sub-line of
                  "End-to-end engineering, software and digital solutions
                  across Automotive, Industrial and Defence & Aerospace —
                  concept to lifecycle." Kept here because the headline is
                  strong and Shrihari cut it for density, not wording — if
                  he wants it back it is a copy-paste, not a rewrite.

                  No hard breaks — the max-width does the wrapping, so it
                  lands on balanced lines at `lg` without overflowing
                  narrow screens. */}
              <h1 className="max-w-[560px] font-display text-[36px] leading-[1.15] font-semibold text-balance text-white sm:text-[48px] lg:max-w-[780px] lg:text-[56px]">
                {/* 13 Oct: was "End-to-End Engineering, Software & Digital
                    Solutions." with the last two words in lime. */}
                Engineering the Future of{' '}
                <span className="text-lime">Intelligent Mobility</span>
              </h1>
              <p className="mt-4 max-w-[480px] font-body text-[15px] leading-[1.5] font-medium text-balance text-white/75 lg:mt-5 lg:max-w-[600px] lg:text-[16px]">
                For Automotive, Industrial and Defence &amp; Aerospace.
              </p>
            </motion.div>

            <motion.div {...riseIn(reduceMotion, 0.2)} className="order-2 mt-6 self-start lg:mt-8">
              <Button href="/contact">Talk to Engineering</Button>
            </motion.div>

            {/* Strategic investment (13 Oct): BAT, Germany, called out under
                the CTA. A real <fieldset>/<legend> so the eyebrow breaks the
                top border natively — the card is translucent, so there is
                no solid fill to mask the line with. The whole card links to
                the BAT announcement. */}
            <motion.div {...riseIn(reduceMotion, 0.3)} className="order-3 mt-8 self-start lg:mt-10">
              <Link
                to={insightPath('lucas-tvs-invests-in-bat-germany')}
                aria-label="Strategic investment: Bavarian Automotive Technologies GmbH, Germany"
                className="group block rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                <fieldset className="flex items-center gap-5 rounded-[14px] border border-lime/40 bg-black/30 px-5 pt-2 pb-5 backdrop-blur-sm transition-[border-color,background-color] duration-300 group-hover:border-lime group-hover:bg-black/45 sm:gap-6 sm:px-7 sm:pb-6">
                  <legend className="mx-auto px-4 font-body text-[11px] leading-none font-medium tracking-[0.26em] text-lime uppercase sm:text-[12px]">
                    Strategic Investment
                  </legend>
                  <img
                    src={germanyFlagMap}
                    alt=""
                    className="h-12 w-auto shrink-0 drop-shadow-[0_0_1px_rgba(255,255,255,0.7)] sm:h-[58px]"
                  />
                  <span className="font-display text-[16px] leading-[1.3] font-medium text-white sm:text-[19px]">
                    Bavarian Automotive
                    <br />
                    Technologies GmbH
                  </span>
                  <img src={logoBat} alt="" className="ml-1 h-12 w-12 shrink-0 rounded-[4px] sm:ml-3 sm:h-[58px] sm:w-[58px]" />
                </fieldset>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide arc — from xl (dots below). See `SlideArc`. */}
        <SlideArc active={active} onSelect={goTo} progressStyle={reduceMotion ? undefined : progressStyle} />

        {/* Below xl: the active slide's name over the dots (14 Oct) — the
            arc's cards need more width than a phone or tablet has. */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-2.5 xl:hidden">
          <p aria-live="polite" className="font-body text-[13px] font-semibold tracking-[0.06em] text-white uppercase">
            <motion.span
              key={SLIDES[active].id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-block"
            >
              {SLIDES[active].label}
            </motion.span>
          </p>
          <div className="flex gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${slide.label}`}
                aria-current={i === active}
                className={cx(
                  'h-2 rounded-full transition-all duration-300',
                  i === active ? 'w-6 bg-lime' : 'w-2 bg-white/40',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Arc geometry, in the track's own 1000 x 210 box. The track is a
   quadratic curve from the bottom corners up to a crest at the centre; each
   card's slot is a point on it, spaced SLOT_STEP apart in curve-time. */
const ARC_W = 1000
const ARC_H = 210
const ARC_EDGE_Y = 214
const ARC_CREST_Y = 96
const SLOT_STEP = 0.205

function arcPoint(t: number) {
  const control = 2 * ARC_CREST_Y - (ARC_EDGE_Y + ARC_EDGE_Y) / 2
  const y = (1 - t) * (1 - t) * ARC_EDGE_Y + 2 * (1 - t) * t * control + t * t * ARC_EDGE_Y
  return { x: t * ARC_W, y }
}

/** Signed distance from the active slide, wrapped into -2..2. */
function slotOffset(i: number, active: number) {
  const n = SLIDES.length
  let k = (((i - active) % n) + n) % n
  if (k > n / 2) k -= n
  return k
}

/**
 * The hero's slide picker, from xl up: the five cards sit on a curved
 * track along the bottom — a dotted orbit with a lime arc at its crest and
 * a glowing dot marking the active slot, after the homepage sectors
 * carousel, turned horizontal. The active card rides the crest at full
 * size, ringed in lime with its progress bar filling; neighbours step down
 * the curve, smaller and fainter. Advancing rotates every card one slot.
 *
 * The card leaving one end for the other would otherwise sweep across the
 * whole track, so a card whose slot jumps more than two places moves
 * without a transition — both ends are faint, so it simply reappears.
 */
function SlideArc({
  active,
  onSelect,
  progressStyle,
}: {
  active: number
  onSelect: (i: number) => void
  progressStyle?: CSSProperties
}) {
  // The slide we are rotating away from, captured when `active` changes
  // (React's "adjust state on prop change" pattern — no ref read in render).
  const [last, setLast] = useState(active)
  const [from, setFrom] = useState(active)
  if (active !== last) {
    setFrom(last)
    setLast(active)
  }

  const crest = arcPoint(0.5)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-[210px] xl:block">
      <div className="shell relative h-full">
        {/* The track: a faint dotted orbit, and a lime arc that glows at the
            crest and fades out along the curve. */}
        <svg
          aria-hidden
          viewBox={`0 0 ${ARC_W} ${ARC_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="hero-arc-glow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#b3e718" stopOpacity="0" />
              <stop offset="0.5" stopColor="#b3e718" stopOpacity="0.9" />
              <stop offset="1" stopColor="#b3e718" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 ${ARC_EDGE_Y + 14} Q ${ARC_W / 2} ${2 * (ARC_CREST_Y + 14) - (ARC_EDGE_Y + 14)} ${ARC_W} ${ARC_EDGE_Y + 14}`}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M 0 ${ARC_EDGE_Y} Q ${ARC_W / 2} ${2 * ARC_CREST_Y - ARC_EDGE_Y} ${ARC_W} ${ARC_EDGE_Y}`}
            fill="none"
            stroke="url(#hero-arc-glow)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Slot ticks along the track. */}
        {[-2, -1, 1, 2].map((k) => {
          const pt = arcPoint(0.5 + k * SLOT_STEP)
          return (
            <span
              key={k}
              aria-hidden
              className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
              style={{ left: `${(pt.x / ARC_W) * 100}%`, top: `${(pt.y / ARC_H) * 100}%` }}
            />
          )
        })}

        {/* The glowing dot at the crest — the active slot. */}
        <span
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: `${(crest.y / ARC_H) * 100}%` }}
        >
          <span className="absolute inset-0 -m-2 rounded-full bg-lime/25 blur-[6px]" />
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-lime/60 bg-black/40">
            <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_rgba(179,231,24,0.9)]" />
          </span>
        </span>

        {SLIDES.map((slide, i) => {
          const k = slotOffset(i, active)
          const jumped = Math.abs(k - slotOffset(i, from)) > 2
          const pt = arcPoint(0.5 + k * SLOT_STEP)
          const depth = Math.abs(k)
          const current = k === 0
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show ${slide.label}`}
              aria-current={current}
              tabIndex={0}
              className={cx(
                'pointer-events-auto absolute flex w-[236px] items-center gap-3 rounded-[16px] border p-2 text-left backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
                !jumped &&
                  'transition-[left,top,transform,opacity,border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                current
                  ? 'border-lime bg-lime/10 shadow-[0_0_28px_rgba(179,231,24,0.35)]'
                  : 'border-white/15 bg-black/50 hover:border-white/40',
              )}
              style={{
                left: `${(pt.x / ARC_W) * 100}%`,
                top: `${(pt.y / ARC_H) * 100}%`,
                // Sit the card on the track: centred on its slot, bottom edge
                // just above the line. Upright, as in the reference.
                transform: `translate(-50%, calc(-100% - 14px)) scale(${current ? 1 : depth === 1 ? 0.86 : 0.74})`,
                transformOrigin: '50% 100%',
                opacity: current ? 1 : depth === 1 ? 0.85 : 0.5,
                zIndex: 10 - depth,
              }}
            >
              <img
                src={slide.thumb}
                alt=""
                decoding="async"
                className="h-[64px] w-[80px] shrink-0 rounded-[10px] object-cover"
              />
              <span className="flex min-w-0 grow flex-col gap-2.5 pr-1">
                <span className="font-body text-[15px] leading-[1.25] font-semibold text-white">
                  {slide.label}
                </span>
                <span aria-hidden className="relative block h-[3px] w-full max-w-[100px] overflow-hidden rounded-full bg-white/25">
                  {current && (
                    <span
                      key={`bar-${active}`}
                      className="absolute inset-0 origin-left rounded-full bg-lime"
                      style={progressStyle}
                    />
                  )}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
