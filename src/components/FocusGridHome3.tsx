import { useEffect, useState, type ElementType } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronRight as Chevron } from 'lucide-react'
import { cx } from '../lib/cx'
import { AppLink } from './AppLink'
import {
  focusGridElectrification,
  focusGridElectrification2,
  focusGridSoftwareDefined,
  focusGridAutomation,
  focusGridMissionCritical,
  focusGridAiDigital,
} from '../lib/assets'

type Slide = {
  image: string
  alt: string
}

type FocusCard = {
  id: string
  /**
   * Split in two so the second half can take the accent colour, which is
   * how every card in the reference sets its heading. Both halves are plain
   * strings — no markup to keep in sync.
   */
  title: [string, string]
  href: string
  /** Dark cards invert: light type on near-black, lime accent and CTA. */
  tone: 'dark' | 'light'
  /**
   * Widens the card to two columns at `lg` and turns on the call-to-action
   * and the slide controls. Exactly one card should carry it; more than one
   * still renders, it just stops being a 2-1 / 3 bento.
   */
  featured?: boolean
  /** Only read on a featured card. */
  cta?: string
  /**
   * One entry is the normal case and renders a plain image. Add a second
   * and the prev / next arrows and dots appear on their own — they are
   * hidden at a single slide rather than sitting there inert.
   */
  slides: Slide[]
}

/**
 * Everything this section shows. Titles, links, tone, order and artwork are
 * all here, so editing the section does not mean touching the markup below:
 * change a string, swap an `image`, reorder the array, drop a card, or add
 * a sixth and the grid reflows around it.
 */
const CARDS: FocusCard[] = [
  {
    id: 'electrification',
    title: ['Electrification &', 'Powertrain'],
    // 30 Oct (launch audit): was the external Lucas-TVS products page, which
    // left this the one focus area of five with no way into /technologies.
    // It now goes to its own section there, like the other four.
    href: '/technologies#electrification',
    tone: 'dark',
    featured: true,
    cta: 'Explore Electrification',
    slides: [
      {
        image: focusGridElectrification,
        alt: 'Exploded view of an electric drive unit — rotor, stator, gearbox and housing',
      },
      {
        image: focusGridElectrification2,
        alt: 'Electric drive assembly lit from within, motors and housings in a row',
      },
    ],
  },
  {
    id: 'software-defined',
    title: ['Software Defined', 'Platforms'],
    href: '/technologies#software-defined',
    tone: 'light',
    slides: [
      {
        image: focusGridSoftwareDefined,
        alt: 'Vehicle software dashboards layered on floating screens',
      },
    ],
  },
  {
    id: 'automation',
    title: ['Intelligent', 'Automation'],
    href: '/technologies#automation',
    tone: 'light',
    slides: [
      {
        image: focusGridAutomation,
        alt: 'Robotic arms and autonomous mobile robots on a factory floor',
      },
    ],
  },
  {
    id: 'mission-critical',
    title: ['Mission-Critical', 'Systems'],
    href: '/technologies#mission-critical',
    tone: 'light',
    slides: [
      {
        image: focusGridMissionCritical,
        alt: 'Main battle tank on a rocky shoreline, with a warship and a drone beyond',
      },
    ],
  },
  {
    id: 'ai-digital',
    title: ['AI & Digital', 'Engineering'],
    href: '/technologies#ai-digital',
    tone: 'light',
    slides: [
      {
        image: focusGridAiDigital,
        alt: 'Layered silicon stack with a data visualisation rising from it',
      },
    ],
  },
]

/** How long a slide holds before the card advances itself. */
const AUTOPLAY_MS = 5000

/** Circular chevron in the corner of a non-featured card. */
function CornerChevron() {
  return (
    <span
      aria-hidden
      // Only drawn on the light cards, where lime is 1.4:1 against the
      // pale scrim — green-ink keeps the chevron legible (launch audit).
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-green-ink/50 text-green-ink transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-white"
    >
      <Chevron className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-px" />
    </span>
  )
}

function Card({ card }: { card: FocusCard }) {
  const [slide, setSlide] = useState(0)
  const dark = card.tone === 'dark'
  const many = card.slides.length > 1
  const count = card.slides.length
  const go = (i: number) => setSlide((i + count) % count)

  // Depends on `slide`, so clicking an arrow or a dot restarts the countdown
  // rather than leaving a part-spent timer to jump the card a moment later.
  useEffect(() => {
    if (!many) return
    const id = setTimeout(() => setSlide((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [slide, many, count])

  const Wrapper: ElementType = card.featured ? 'div' : AppLink

  return (
    // The featured card is a <div>, not an <a>: it holds its own CTA link
    // and, once a second slide is added, prev/next buttons. Nesting those
    // inside an anchor is invalid, and it would make the whole card one
    // giant click target that fights the controls sitting on top of it.
    <Wrapper
      {...(card.featured ? {} : { href: card.href })}
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-[20px] transition-all duration-300',
        // The artwork is the card: it fills the frame edge to edge and the
        // copy rides on top of it. These ratios only set the height a card
        // asks for — a card sharing a grid row with a taller one stretches
        // past them, which is what squares row 1 off in the reference.
        card.featured
          ? 'aspect-[4/3] md:aspect-[12/5] lg:col-span-2 lg:row-span-1'
          : 'aspect-[5/4] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]',
        dark
          ? 'bg-[#0d1410] shadow-[0_18px_44px_rgba(0,0,0,0.35)]'
          : 'border border-line-soft bg-surface-mute',
      )}
    >
      {/* Artwork, covering the whole card. Everything else sits on top. */}
      {card.slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={i === slide ? s.alt : ''}
          aria-hidden={i !== slide}
          // No `loading="lazy"`. Nothing else in the app uses it, and here
          // it did not fire at all: <ReactLenis root> drives the scroll, and
          // the browser's deferred-image pass never re-evaluated these, so
          // the cards sat empty even with the section filling the viewport.
          decoding="async"
          className={cx(
            'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500',
            i === slide ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {/* Scrim under the copy — the artwork runs edge to edge now, so the
          headings need their own contrast rather than a solid panel. */}
      <span
        aria-hidden
        className={cx(
          'pointer-events-none absolute inset-0',
          dark
            ? 'bg-[linear-gradient(100deg,rgba(9,14,11,0.95)_0%,rgba(9,14,11,0.78)_32%,rgba(9,14,11,0.15)_60%,transparent_78%)]'
            : 'bg-[linear-gradient(to_bottom,rgba(244,244,244,0.94)_0%,rgba(244,244,244,0.72)_28%,transparent_52%)]',
        )}
      />

      <div
        className={cx(
          'relative z-10 flex flex-1 gap-4 p-6 lg:p-7',
          card.featured ? 'flex-col justify-center' : 'items-start justify-between',
        )}
      >
        <div>
          <h3
            className={cx(
              'font-display leading-[1.12] font-semibold',
              card.featured ? 'text-[26px] lg:text-[34px]' : 'text-[20px] lg:text-[23px]',
              dark ? 'text-white' : 'text-ink',
            )}
          >
            {card.title[0]}
            <br />
            {/* Lime on the dark card; green-ink on the light ones, where
                lime over the pale scrim was ~1.4:1 (launch audit). */}
            <span className={dark ? 'text-lime-light' : 'text-green-ink'}>{card.title[1]}</span>
          </h3>

          {card.featured && card.cta && (
            <AppLink
              href={card.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-lime px-5 py-2.5 font-body text-[14px] font-medium text-lime-light transition-colors duration-300 hover:bg-lime hover:text-white lg:mt-8"
            >
              {card.cta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </AppLink>
          )}

          {/* Rendered only with something to page through — see `slides`. */}
          {card.featured && many && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => go(slide - 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-lime hover:text-lime-light"
                >
                  <ChevronLeft aria-hidden className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => go(slide + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-lime hover:text-lime-light"
                >
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center">
                {card.slides.map((s, i) => (
                  // The button is a 24px hit area (WCAG 2.5.8); the dot
                  // drawn inside it keeps its original 8px look.
                  <button
                    key={s.image}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === slide}
                    onClick={() => go(i)}
                    className="group/dot grid h-6 min-w-6 place-items-center"
                  >
                    <span
                      aria-hidden
                      className={cx(
                        'h-2 rounded-full transition-all duration-300',
                        i === slide ? 'w-5 bg-lime' : 'w-2 bg-white/35 group-hover/dot:bg-white/60',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {!card.featured && <CornerChevron />}
      </div>
    </Wrapper>
  )
}

/**
 * Home3-only. The focus areas again, as the bento grid from the client's
 * 19 Sep reference: one featured card across two columns with a
 * call-to-action, then the remaining four at one column each.
 *
 * The artwork is cropped straight out of that reference and stored under
 * `src/assets/FocusGrid`. Only the illustrations were taken — the headings
 * baked into the reference were left behind so the titles here are live
 * text: editable, translatable, selectable and readable by a screen reader,
 * which a picture of a heading is not.
 *
 * Everything the section shows lives in `CARDS` above.
 *
 * Note for review: these are the same five focus areas the carousel higher
 * up the page already covers, so the page now states them twice. Worth a
 * decision at the Namita review on whether both earn their place.
 */
export function FocusGridHome3() {
  return (
    <section id="focus-grid" className="shell-wide pt-[70px] pb-16 lg:pb-24">
      <FocusGrid />
    </section>
  )
}

/**
 * The bento on its own, without the homepage's section spacing, so another
 * page can drop the same five cards into its own band — the Industries
 * landing does, under its "Five areas, every sector" header.
 */
export function FocusGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {CARDS.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}
