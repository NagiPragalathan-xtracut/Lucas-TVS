import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from './primitives'
import { cx } from '../lib/cx'
import {
  heroSlideAutomotive,
  heroSlideIndustrial,
  heroSlideDefenceAerospace,
} from '../lib/assets'

const SLIDES = [
  { id: 'automotive', no: '01', label: 'Automotive', video: heroSlideAutomotive },
  { id: 'industrial', no: '02', label: 'Industrial', video: heroSlideIndustrial },
  { id: 'defence-aerospace', no: '03', label: 'Defence & Aerospace', video: heroSlideDefenceAerospace },
]

const AUTOPLAY_MS = 5000
const EASE = [0.16, 1, 0.3, 1] as const
const DESKTOP_QUERY = '(min-width: 1024px)'

/** Matches Tailwind's `lg` breakpoint — lets us mount only one of the two
 *  video layouts below, instead of loading all six clips on every device. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

const riseIn = (reduceMotion: boolean | null, delay: number) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EASE },
      }

/**
 * Home2-only replacement for `Hero`. Rebuilt per the client's reference
 * (three-domain diagonal slider, Sep 12): the robot-arm clip is swapped
 * for the three supplied domain videos (src/assets/Hero/slide{1,2,3}.mp4),
 * shown side by side with a diagonal skew between panels — one expanded,
 * the other two collapsed to their number + label. Copy is unchanged from
 * the Sep-11 content review (headline, sub-line, eyebrow, CTA); only the
 * backdrop and its interaction model are new.
 */
export function HeroHome2() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Width is driven by `active` alone (click or autoplay) — hover only adds
  // a light glow/zoom on top, so a lingering hover state can never desync
  // the panel widths from whichever slide is actually selected.
  const expanded = active

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, active])

  const goTo = (i: number) => setActive((i + SLIDES.length) % SLIDES.length)

  return (
    <section
      // `sticky`, not `fixed`: the hero keeps its place in flow (so it still
      // sets the scroll distance before the next section arrives) but pins to
      // the top of the viewport and stays there while everything below scrolls
      // up over it. Works because no ancestor scrolls or clips — `main` and the
      // page wrapper are both plain blocks. `z-0` puts it under the stacking
      // context that wraps the rest of the page in Home2.
      className="sticky top-0 z-0 overflow-hidden bg-white pb-16 lg:pb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[560px] bg-black sm:h-[620px] lg:h-[720px]">
        {/* Desktop / tablet — three diagonal panels, one expanded. Only
            mounted above the `lg` breakpoint, so mobile never loads these
            three clips on top of its own single full-bleed one. */}
        {isDesktop && (
        <div
          className="grid h-full transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            gridTemplateColumns: SLIDES.map((_, i) => (i === expanded ? '70fr' : '15fr')).join(' '),
          }}
        >
          {SLIDES.map((slide, i) => {
            const isExpanded = i === expanded
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${slide.label}`}
                aria-current={i === active}
                className="group relative h-full min-w-0 cursor-pointer overflow-visible"
              >
                {/* The slab is overscanned so the skew can't open a black
                    triangle at a panel edge, but the overscan must only run
                    to the RIGHT. Panels paint in DOM order, so each one's
                    left edge is the visible seam with its neighbour: a left
                    overscan on panels 2-3 stole 70px back from the panel
                    before them, while the last panel had no successor to
                    take its own 70px — which is why 03 rendered ~58% wider
                    than 02. Overscanning right only puts every seam exactly
                    on a column boundary; the previous panel's right overscan
                    fills the triangle behind it. Panel 0 still needs a left
                    overscan, since the section edge is what clips it. */}
                <div
                  className={cx(
                    'absolute inset-y-0 -right-[70px] -skew-x-6 overflow-hidden bg-black',
                    i === 0 ? '-left-[70px]' : 'left-0',
                  )}
                >
                  <div className="absolute inset-0 skew-x-6 scale-x-110">
                    <video
                      src={slide.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-hidden="true"
                      className={cx(
                        'h-full w-full object-cover transition-transform duration-700 ease-out',
                        isExpanded ? 'scale-105' : 'scale-100',
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35" />
                    <div
                      className={cx(
                        'absolute inset-0 bg-lime/10 opacity-0 transition-opacity duration-500',
                        !isExpanded && 'group-hover:opacity-100',
                      )}
                    />
                  </div>
                </div>

                <div
                  className={cx(
                    'absolute inset-x-0 bottom-8 text-left transition-[padding] duration-500 xl:bottom-10',
                    isExpanded ? 'px-6 xl:px-8' : 'px-3',
                  )}
                >
                  <span
                    className={cx(
                      'block font-display font-bold text-white/25 transition-all duration-500',
                      isExpanded ? 'text-[64px] xl:text-[72px]' : 'text-[40px] xl:text-[48px]',
                    )}
                  >
                    {slide.no}
                  </span>
                  <span
                    className={cx(
                      'mt-1 block truncate font-body font-semibold whitespace-nowrap text-white uppercase transition-all duration-500',
                      // The collapsed size steps with the breakpoint because
                      // a collapsed panel is a fixed 15% of the viewport:
                      // "DEFENCE & AEROSPACE" is the longest label, and at
                      // 1024px it only has ~130px to live in. 10/13/15px
                      // measure 119/155/178px, so it never hits `truncate`.
                      isExpanded
                        ? 'text-[16px] tracking-[0.14em] xl:text-[18px]'
                        : 'text-[10px] tracking-[0.02em] xl:text-[13px] 2xl:text-[15px]',
                    )}
                  >
                    {slide.label}
                  </span>
                  <span
                    className={cx(
                      'mt-2 block h-[3px] bg-lime transition-all duration-500',
                      isExpanded ? 'w-12' : 'w-6 opacity-50',
                    )}
                  />
                </div>
              </button>
            )
          })}
        </div>
        )}

        {/* Mobile — one full-bleed clip at a time, only mounted below `lg`. */}
        {!isDesktop && (
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
        </div>
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
        <div className="shell pointer-events-none absolute inset-0 flex flex-col justify-center pt-24 lg:pt-[92px]">
          <div className="pointer-events-auto flex flex-col">
            <motion.div {...riseIn(reduceMotion, 0.1)} className="order-1 lg:mt-0">
              {/* No hard breaks — the max-width does the wrapping, so it
                  lands on two balanced lines at `lg` without overflowing
                  narrow screens. */}
              <h1 className="max-w-[560px] font-display text-[36px] leading-[1.15] font-semibold text-balance text-white sm:text-[48px] lg:max-w-[780px] lg:text-[56px]">
                Indian Engineering For The World&rsquo;s{' '}
                <span className="text-lime-light">Hardest Problems.</span>
              </h1>
              {/* The sub-line sets to 1081px on one line, so anything under
                  ~541px forces a third row — 460px was giving three. 600px
                  plus `text-balance` lands it on two even lines. */}
              <p className="mt-4 max-w-[480px] font-body text-[15px] leading-[1.5] font-medium text-balance text-white/75 lg:mt-5 lg:max-w-[600px] lg:text-[16px]">
                End-to-end engineering, software and digital solutions across
                Automotive, Industrial and Defence &amp; Aerospace — concept to
                lifecycle.
              </p>
            </motion.div>

            <motion.div {...riseIn(reduceMotion, 0.2)} className="order-2 mt-6 self-start lg:mt-8">
              <Button>Talk to Engineering</Button>
            </motion.div>
          </div>
        </div>

        {/* No prev/next arrows — the panels themselves are the click target,
            and the vertical indicator below covers direct jumps. */}

        {/* Vertical domain indicator — desktop only. */}
        <div className="absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${slide.label}`}
              aria-current={i === active}
              className="group flex flex-col items-center gap-1"
            >
              <span
                className={cx(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  i === active ? 'scale-125 bg-lime' : 'bg-white/35 group-hover:bg-white/60',
                )}
              />
              <span
                className={cx(
                  'font-body text-[11px] transition-colors duration-300',
                  i === active ? 'text-lime-light' : 'text-white/40 group-hover:text-white/70',
                )}
              >
                {slide.no}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile dots. */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 lg:hidden">
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
    </section>
  )
}
