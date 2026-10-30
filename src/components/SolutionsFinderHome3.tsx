import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import {
  Package,
  Settings2,
  Cpu,
  Building2,
  Check,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  RotateCcw,
  MessagesSquare,
  Boxes,
  Code2,
  MonitorSmartphone,
  CircuitBoard,
  SlidersHorizontal,
  Cloud,
  ShieldCheck,
  SearchCheck,
  Car,
  LineChart,
  Plane,
  type LucideProps,
} from 'lucide-react'
import { cx } from '../lib/cx'
import { AppLink } from './AppLink'
import {
  solutionsBgVehicle,
  solutionsBgServices,
  solutionsBgTechnologies,
  solutionsBgIndustry,
  solutionsPanelWaves,
  productAcGenerator,
  productIsgController,
  productIgnitionCoils,
  productInverterShot,
  productTractionMotorShot,
  productBmsShot,
  productReductionGear,
  productBatteryCooling,
  techElectrification,
  techSoftwareDefined,
  techAutomation,
  techMissionCritical,
  techAiDigital,
  programmeElectrifiedPowertrain,
  programmeVehicleControlUnits,
  programmeValidationHomologation,
} from '../lib/assets'

type Icon = ComponentType<LucideProps>

/* -------------------------------------------------------------------------
 * Content. Everything the section shows is in this block — the four tabs,
 * their copy, and the cards under each one. Nothing below reads anything
 * that is not defined here, so the section can be re-stocked without
 * touching a line of markup.
 * ---------------------------------------------------------------------- */

type Product = {
  name: string
  category: string
  image: string
  href: string
  featured?: boolean
}

const PRODUCTS: Product[] = [
  {
    name: 'AC Generator',
    category: 'Electrical Systems',
    image: productAcGenerator,
    href: '/products',
    featured: true,
  },
  { name: 'ISG - Controller', category: 'Power Electronics', image: productIsgController, href: '/products/motor-controllers' },
  { name: 'Ignition Coils', category: 'Ignition Systems', image: productIgnitionCoils, href: '/products' },
  { name: 'Inverter', category: 'Power Electronics', image: productInverterShot, href: '/products' },
  { name: 'Traction Motor', category: 'Powertrain', image: productTractionMotorShot, href: '/products' },
  { name: 'BMS', category: 'Energy Systems', image: productBmsShot, href: '/products/battery-management-systems' },
  { name: 'Reduction Gear', category: 'Drivetrain', image: productReductionGear, href: '/products' },
  {
    name: 'Battery Cooling System',
    category: 'Thermal Systems',
    image: productBatteryCooling,
    href: '/products',
  },
]

type Service = { title: string; blurb: string; icon: Icon; href: string }

const SERVICES: Service[] = [
  {
    title: 'Product Engineering',
    blurb: 'Concept to deployment and lifecycle management.',
    icon: Boxes,
    href: '/capabilities',
  },
  {
    title: 'Embedded Systems',
    blurb: 'Intelligent embedded platforms for connected products.',
    icon: Code2,
    href: '/capabilities',
  },
  {
    title: 'Software Engineering',
    blurb: 'Scalable software platforms and applications.',
    icon: MonitorSmartphone,
    href: '/capabilities',
  },
  {
    title: 'Electronics Engineering',
    blurb: 'Design and development of electronic hardware.',
    icon: CircuitBoard,
    href: '/capabilities',
  },
  {
    title: 'Electronics & Controls',
    blurb: 'Control hardware engineered for series production.',
    icon: SlidersHorizontal,
    href: '/capabilities',
  },
  {
    title: 'Digital Engineering',
    blurb: 'Digital platforms, cloud and data-driven solutions.',
    icon: Cloud,
    href: '/capabilities',
  },
  {
    title: 'Functional Safety & Cybersecurity',
    blurb: 'Safety, security and compliance across the lifecycle.',
    icon: ShieldCheck,
    href: '/capabilities',
  },
  {
    title: 'Verification & Testing',
    blurb: 'Comprehensive validation and testing services.',
    icon: SearchCheck,
    href: '/capabilities',
  },
]

type Technology = { title: string; blurb: string; image: string; href: string }

const TECHNOLOGIES: Technology[] = [
  {
    title: 'Electrification & Powertrain',
    blurb: 'Traction hardware and energy management engineered as one system.',
    image: techElectrification,
    href: '/technologies#electrification',
  },
  {
    title: 'Software Defined Platforms',
    blurb: 'Service-oriented architectures and over-the-air capable stacks.',
    image: techSoftwareDefined,
    href: '/technologies#software-defined',
  },
  {
    title: 'Automation',
    blurb: 'Drives, control systems and instrumentation for continuous duty.',
    image: techAutomation,
    href: '/technologies#automation',
  },
  {
    title: 'Mission-Critical Systems',
    blurb: 'Functional safety and cybersecurity to ISO 26262 and ISO 21434.',
    image: techMissionCritical,
    href: '/technologies#mission-critical',
  },
  {
    title: 'AI & Digital Engineering',
    blurb: 'Simulation, analytics and digital threads across the lifecycle.',
    image: techAiDigital,
    href: '/technologies#ai-digital',
  },
]

type Programme = { title: string; blurb: string; image: string; href: string }
type Industry = { id: string; label: string; icon: Icon; programmes: Programme[] }

/**
 * The reference only specifies Automotive, so that is the only sector with
 * programmes behind it. Industrial and Defence & Aerospace are deliberately
 * left empty rather than filled with invented programmes — the page-wide
 * rule from the 16 Sep review is to show nothing we cannot back. Each
 * renders the empty state below until real content arrives; adding it is a
 * matter of filling in the array.
 */
const INDUSTRIES: Industry[] = [
  {
    id: 'automotive',
    label: 'Automotive',
    icon: Car,
    programmes: [
      {
        title: 'Electrified Powertrain',
        blurb: 'Traction motors, inverters and BMS for two, three and four-wheel platforms.',
        image: programmeElectrifiedPowertrain,
        href: '/industries/automotive',
      },
      {
        title: 'Vehicle Control Units',
        blurb: 'Body, motor and gateway ECUs built on AUTOSAR Classic.',
        image: programmeVehicleControlUnits,
        href: '/products/vehicle-control-units',
      },
      {
        title: 'Validation & Homologation',
        blurb: 'Test benches, road correlation and release evidence.',
        image: programmeValidationHomologation,
        href: '/quality',
      },
    ],
  },
  { id: 'industrial', label: 'Industrial', icon: LineChart, programmes: [] },
  { id: 'defence', label: 'Defence & Aerospace', icon: Plane, programmes: [] },
]

type Tab = {
  id: string
  /** Label on the pill. */
  label: string
  icon: Icon
  /** Shown beside the step counter, top right. */
  title: string
  description: string
  backdrop: string
  /** Heading and sub-line above the cards. */
  heading: string
  subheading: string
  /** Footer call-to-action heading. The industry tab prefixes it with the
   *  selected sector, which is why that state lives in the section rather
   *  than inside the panel. */
  ctaTitle: string
}

const TABS: Tab[] = [
  {
    id: 'product',
    label: 'A Product',
    icon: Package,
    title: 'Products',
    description: 'Hardware that ships at volume across electrified platforms.',
    backdrop: solutionsBgVehicle,
    heading: 'Explore our products',
    subheading: 'High-performance hardware and systems for next-generation mobility.',
    ctaTitle: 'Talk to the engineering team',
  },
  {
    id: 'service',
    label: 'An Engineering Service',
    icon: Settings2,
    title: 'Engineering Services',
    description: 'End-to-end engineering services across all three sectors.',
    backdrop: solutionsBgServices,
    heading: 'How can we help?',
    subheading: 'Engineering services that run horizontally across all three sectors.',
    ctaTitle: 'Talk to the engineering team',
  },
  {
    id: 'technology',
    label: 'A Technology',
    icon: Cpu,
    title: 'Technologies',
    description: 'Core technologies that power smarter, safer and more connected systems.',
    backdrop: solutionsBgTechnologies,
    heading: 'Explore our technologies',
    subheading: 'The five areas our engineering teams are organised around.',
    ctaTitle: 'Talk to the engineering team',
  },
  {
    id: 'industry',
    label: 'An Industry Solution',
    icon: Building2,
    title: 'Industry Solutions',
    description: 'Tailored engineering programmes for real-world impact.',
    backdrop: solutionsBgIndustry,
    heading: 'Recommended solutions',
    subheading: 'Programmes matched to how your sector actually operates.',
    ctaTitle: 'Talk to the programme team',
  },
]

const CTA_BLURB =
  'Not finding the right fit? Send us the programme brief and we will route it to the engineering team that owns it.'

/* -------------------------------------------------------------------------
 * Shared pieces
 * ---------------------------------------------------------------------- */

/** Outlined circular arrow used on every card in the reference. */
function ArrowButton({
  direction = 'diagonal',
  className,
}: {
  direction?: 'diagonal' | 'right'
  className?: string
}) {
  const Glyph = direction === 'right' ? ArrowRight : ArrowUpRight
  return (
    <span
      aria-hidden
      className={cx(
        'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-green-deep group-hover:bg-green-deep group-hover:text-white',
        className,
      )}
    >
      <Glyph className="h-[18px] w-[18px]" />
    </span>
  )
}

function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  label: string
}) {
  return (
    <div className="relative w-full sm:w-[340px]">
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-body-soft"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 font-body text-[14px] text-ink outline-none transition-colors placeholder:text-body-soft focus:border-green-deep"
      />
    </div>
  )
}

function SelectField({
  value,
  onChange,
  options,
  label,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  label: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-12 w-full appearance-none rounded-full border border-line bg-white pr-11 pl-5 font-body text-[14px] text-ink outline-none transition-colors focus:border-green-deep sm:w-[190px]"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 h-[18px] w-[18px] -translate-y-1/2 text-ink"
      />
    </div>
  )
}

/** Heading + sub-line on the left, controls on the right. */
function PanelHeader({
  heading,
  subheading,
  children,
}: {
  heading: string
  subheading: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <div>
        <h3 className="font-display text-[26px] leading-[1.15] font-medium text-ink lg:text-[30px]">
          {heading}
        </h3>
        <p className="mt-2 font-body text-[14px] leading-[1.5] text-body lg:text-[15px]">
          {subheading}
        </p>
      </div>
      {children && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">{children}</div>
      )}
    </header>
  )
}

function ResultCount({ n }: { n: number }) {
  return (
    <p className="font-body text-[12px] tracking-[0.12em] whitespace-nowrap text-body-soft uppercase">
      {n} {n === 1 ? 'Result' : 'Results'}
    </p>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[16px] border border-dashed border-line bg-surface-mute/60 px-6 py-14 text-center">
      <p className="font-body text-[14px] text-body">{message}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * Panels
 * ---------------------------------------------------------------------- */

/**
 * The green a product card carries: on the featured one always, and on every
 * other card while it is hovered.
 *
 * Sampled off the 22 Sep reference rather than picked — that card runs from
 * about `#113121` at its lightest to `#091f14` at its darkest, a far shorter
 * range than the near-black it replaces. The peak is `#183f2d`, the measured
 * mean of the glow baked into the featured product's own artwork, and it is
 * placed where that product sits so the two read as one lit surface. The
 * shot's background keys out to transparent like the others, but its glow is
 * lighting, not a flat backdrop, and keying that leaves holes in the product.
 *
 * Written out in full twice rather than built from a shared string: Tailwind
 * finds classes by scanning the source as text, so a gradient assembled at
 * runtime would never be generated. The two must stay in step.
 */
const CARD_GREEN =
  'bg-[radial-gradient(125%_125%_at_58%_40%,#183f2d_0%,#123322_40%,#0b2417_75%,#091f14_100%)]'
const CARD_GREEN_HOVER =
  'hover:bg-[radial-gradient(125%_125%_at_58%_40%,#183f2d_0%,#123322_40%,#0b2417_75%,#091f14_100%)]'

function ProductsPanel() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')

  const categories = useMemo(
    () => ['All Categories', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))],
    [],
  )

  const shown = PRODUCTS.filter(
    (p) =>
      (category === 'All Categories' || p.category === category) &&
      (p.name + ' ' + p.category).toLowerCase().includes(query.trim().toLowerCase()),
  )

  const { trackRef, scrollByCard, canPrev, canNext } = useCardSlider(shown.length)

  return (
    <>
      <PanelHeader
        heading="Explore our products"
        subheading="High-performance hardware and systems for next-generation mobility."
      >
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search products, e.g. Inverter, BMS..."
          label="Search products"
        />
        <SelectField
          value={category}
          onChange={setCategory}
          options={categories}
          label="Filter products by category"
        />
        <SliderArrows
          onStep={scrollByCard}
          label="products"
          canPrev={canPrev}
          canNext={canNext}
        />
      </PanelHeader>

      {shown.length === 0 ? (
        <div className="mt-8">
          <EmptyState message="No products match that search yet. Try a different term or clear the category filter." />
        </div>
      ) : (
        /* One row, 4.5 slides per view. The product tiles are the most
           compact cards in the section — a shot and a two-line label — so
           they take a tighter fraction than the service and technology
           sliders, which keeps them close to the width the reference grid
           gave them while still showing a half slide at the edge. */
        <ul ref={trackRef} className={SLIDER_TRACK}>
          {shown.map((p) => (
            <li
              key={p.name}
              className={slideClass(
                'basis-[80%] sm:basis-[calc((100%-1rem)/2.5)] lg:basis-[calc((100%-5rem)/4.5)]',
              )}
            >
              <AppLink
                href={p.href}
                className={cx(
                  'group flex h-full flex-col overflow-hidden rounded-[16px] transition-all duration-300 hover:-translate-y-1',
                  p.featured
                    ? `${CARD_GREEN} shadow-[0_16px_40px_rgba(0,0,0,0.28)]`
                    : // White fading to pale green (30 Sep): white behind the
                      // product for its top third, then down to #eef6ea — the
                      // pale green this section already uses — behind the name.
                      // A flat #eef6ea card read too green. Top-to-bottom, the
                      // same direction as the CTA bar's gradient below. The
                      // hover gradient replaces it (both are background-image,
                      // and the hover variant comes later in the stylesheet).
                      `border border-[#e0ecd9] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_35%,#eef6ea_100%)] ${CARD_GREEN_HOVER} hover:border-transparent hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]`,
                )}
              >
                <div className="relative flex flex-1 items-center justify-center p-5">
                  {p.featured && (
                    <span className="absolute top-4 left-4 z-10 rounded-full border border-lime/70 px-3 py-1 font-body text-[10px] font-semibold tracking-[0.14em] text-lime-light uppercase">
                      Featured
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    decoding="async"
                    className="h-[130px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] lg:h-[140px]"
                  />
                </div>

                <div className="flex items-end justify-between gap-3 px-5 pb-5">
                  <div className="min-w-0">
                    {/* Both labels invert on hover, because the card goes
                        dark green underneath them. */}
                    <p
                      className={cx(
                        'font-body text-[11px] tracking-[0.1em] uppercase transition-colors duration-300',
                        p.featured ? 'text-white/55' : 'text-body-soft group-hover:text-white/55',
                      )}
                    >
                      {p.category}
                    </p>
                    <p
                      className={cx(
                        'mt-1.5 font-display text-[17px] leading-[1.2] font-medium transition-colors duration-300',
                        p.featured ? 'text-white' : 'text-ink group-hover:text-white',
                      )}
                    >
                      {p.name}
                    </p>
                  </div>
                  <ArrowButton
                    className={
                      p.featured
                        ? '!border-transparent !bg-white !text-ink group-hover:!bg-lime group-hover:!text-ink'
                        : // Its default hover fills with green-deep, which
                          // all but disappears once the card itself is
                          // green. White keeps it readable and matches the
                          // featured card's treatment.
                          'group-hover:!border-transparent group-hover:!bg-white group-hover:!text-ink'
                    }
                  />
                </div>
              </AppLink>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function ServicesPanel() {
  const { trackRef, scrollByCard, canPrev, canNext } = useCardSlider(SERVICES.length)

  return (
    <>
      <PanelHeader
        heading="How can we help?"
        subheading="Engineering services that run horizontally across all three sectors."
      >
        <ResultCount n={SERVICES.length} />
        <SliderArrows onStep={scrollByCard} label="services" canPrev={canPrev} canNext={canNext} />
      </PanelHeader>

      {/* One row rather than the two-row grid of four this used to be. At
          3.5 slides per view the cards keep a comfortable reading width —
          wider, in fact, than the 4-up grid gave them — and the half slide
          at the edge shows the other four are there. */}
      <ul ref={trackRef} className={SLIDER_TRACK}>
        {SERVICES.map((s) => (
          <li
            key={s.title}
            className={slideClass(
              'basis-[86%] sm:basis-[calc((100%-1rem)/2.2)] lg:basis-[calc((100%-3.75rem)/3.5)]',
            )}
          >
            <AppLink
              href={s.href}
              className="group flex h-full flex-col rounded-[16px] border border-line-soft bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-lime-tint transition-colors duration-300 group-hover:bg-lime">
                <s.icon aria-hidden strokeWidth={1.7} className="h-[21px] w-[21px] text-green-deep transition-colors duration-300 group-hover:text-white" />
              </span>

              <p className="mt-5 font-body text-[11px] font-medium tracking-[0.1em] text-green-deep uppercase">
                Engineering Service
              </p>
              <h4 className="mt-1.5 font-display text-[17px] leading-[1.2] font-medium text-ink">
                {s.title}
              </h4>
              <p className="mt-2 font-body text-[13.5px] leading-[1.45] text-body">{s.blurb}</p>

              <span className="mt-6 flex items-center justify-between gap-3 pt-1">
                <span className="font-body text-[14px] font-medium text-ink">Explore</span>
                <ArrowButton direction="right" />
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
    </>
  )
}

/* -------------------------------------------------------------------------
 * Slider
 *
 * Shared by the Technologies and Engineering Services panels. It is a hook
 * rather than a copy in each panel because the arrow logic carries three
 * separate workarounds (see `scrollByCard`), and a second copy of those is
 * a second place for them to rot.
 * ---------------------------------------------------------------------- */

/** Track classes: one snapping row, scrollbar hidden. */
/**
 * Track classes: one snapping row, scrollbar hidden.
 *
 * The vertical padding is load-bearing. `overflow-x-auto` does not clip only
 * the horizontal axis — CSS forces the other axis to a scrollport too, so
 * the track was cutting the cards off top and bottom: the drop shadows were
 * sliced into a hard horizontal edge, and the `-translate-y-1` hover lift
 * was shaved off the top. Padding is inside the scrollport, so it gives
 * both room to render.
 *
 * `pb-14` is sized off the largest shadow in the section, the featured
 * product card's `0 16px 40px`, which reaches ~56px below its box. `pt-4`
 * covers the 4px lift and the little shadow that spills upwards.
 *
 * `mt-4` and `-mb-10` pull the box back so the extra padding does not open
 * a gap: 16px of margin plus 16px of padding reproduces the 32px that used
 * to sit above the track, and the negative bottom margin absorbs most of
 * the 56px added below.
 */
const SLIDER_TRACK =
  'mt-4 -mb-10 flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto pt-4 pb-14 lg:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/**
 * Slide classes. `last:snap-end` matters: every other slide snaps to the
 * start of the track, but the last one's start position sits beyond the
 * furthest the track can scroll — so under mandatory snapping the browser
 * refused it and sprang back, leaving the final card permanently half-cut
 * and the next arrow dead on its last press. Snapping the last slide to the
 * END of the track puts its snap point exactly at maximum scroll.
 */
const slideClass = (basis: string) => `shrink-0 snap-start last:snap-end ${basis}`

/**
 * `itemCount` is the number of slides currently rendered. It matters because
 * the search fields can shrink a track to fewer slides than fill it: that
 * changes `scrollWidth` without firing a scroll or a resize, so without it
 * in the dependencies the forward arrow stays lit and clickable on a track
 * that has nowhere left to go.
 */
function useCardSlider(itemCount: number) {
  const trackRef = useRef<HTMLUListElement>(null)
  // Whether there is anywhere left to go in each direction. Drives both the
  // arrow colour and the `disabled` state, so a dead arrow is never styled
  // as though it would do something.
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    // A pixel of slack: sub-pixel layout means scrollLeft rarely lands on
    // exactly 0 or exactly `max`, and without it the end arrow stays lit
    // forever on a track that is already as far right as it goes.
    setCanPrev(track.scrollLeft > 1)
    setCanNext(track.scrollLeft < max - 1)
  }, [])

  // Recheck on the track's own scroll (so swiping and trackpad updates the
  // arrows too, not just the buttons), and on resize, where the slide width
  // changes at every breakpoint and with it whether the track overflows.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    syncEdges()
    track.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges, { passive: true })
    return () => {
      track.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges, itemCount])

  /**
   * Scrolls by exactly one slide. The step is measured off the rendered
   * slides rather than hard-coded, because the slide width is a `calc()`
   * that changes at each breakpoint — reading it back is the only way the
   * arrows stay in step with what is actually on screen.
   */
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const first = track.querySelector('li')
    const second = first?.nextElementSibling
    const step =
      first && second
        ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
        : (first?.getBoundingClientRect().width ?? track.clientWidth * 0.4)
    // The tween is written by hand rather than handed to the browser.
    //
    // Every built-in animated scroll is a no-op on this track: `scrollBy`
    // and `scrollTo` with `behavior: 'smooth'`, and a CSS `scroll-behavior`
    // with the behaviour left to default, all leave `scrollLeft` exactly
    // where it started, so both arrows did nothing while dragging the track
    // by hand worked perfectly. Only an instant scroll moved it. Between
    // `scroll-snap-type: mandatory` on the track and the app-wide Lenis
    // instance driving the page, something cancels the browser's
    // smooth-scroll animation before it commits a frame.
    //
    // Setting `scrollLeft` per frame cannot be cancelled that way. Snap is
    // dropped for the duration so it does not fight the tween, and restored
    // at the end, which also re-snaps the resting position and leaves touch
    // and trackpad scrolling behaving normally.
    const from = track.scrollLeft
    const max = track.scrollWidth - track.clientWidth
    const to = Math.max(0, Math.min(max, from + step * direction))
    if (to === from) return

    const previousSnap = track.style.scrollSnapType
    track.style.scrollSnapType = 'none'

    const DURATION = 420
    const start = performance.now()
    // Cubic ease-out: quick off the mark, settles gently.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    let settled = false
    const settle = () => {
      settled = true
      track.style.scrollSnapType = previousSnap
      // Re-read the edges directly rather than waiting for the scroll event
      // this movement should raise. The listener covers swiping and
      // trackpad scrolling, but a programmatic scroll does not reliably
      // emit one in every embedder — and where it does not, the arrows
      // would keep whatever enabled state they had before the click.
      syncEdges()
    }

    // `scrollTo({behavior: 'instant'})` per frame, not `scrollLeft = x`.
    // Assigning `scrollLeft` is silently ignored on this element in some
    // embedders — it reads straight back as its old value — while the
    // explicit instant `scrollTo` lands every time.
    const jump = (left: number) => track.scrollTo({ left, behavior: 'instant' })

    const frame = (now: number) => {
      if (settled) return
      const t = Math.min(1, (now - start) / DURATION)
      jump(from + (to - from) * ease(t))
      if (t < 1) requestAnimationFrame(frame)
      else settle()
    }
    requestAnimationFrame(frame)

    // Safety net for when animation frames never arrive — a backgrounded
    // tab, a throttled or non-compositing embedder. Without this the arrows
    // would look broken in exactly those cases: the tween would be started,
    // snap would be left switched off, and the track would never move. The
    // scroll still lands, it just lands instantly.
    window.setTimeout(() => {
      if (settled) return
      jump(to)
      settle()
    }, DURATION + 140)
  }

  return { trackRef, scrollByCard, canPrev, canNext }
}

/**
 * Prev / next pair. Desktop only: on a touch screen the track is swipeable,
 * and a pair of 48px buttons there would just take room from the slides.
 */
/**
 * The forward arrow carries the brand lime while it has somewhere to go,
 * which makes it read as the live control of the pair. Whichever arrow is
 * spent goes back to a plain outline and is properly `disabled`, so it
 * cannot be tabbed into or clicked — an arrow that looks pressable and does
 * nothing is worse than one that plainly cannot be.
 */
function SliderArrows({
  onStep,
  label,
  canPrev,
  canNext,
}: {
  onStep: (direction: 1 | -1) => void
  label: string
  canPrev: boolean
  canNext: boolean
}) {
  const base =
    'grid h-12 w-12 place-items-center rounded-full border transition-all duration-300'

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => onStep(-1)}
        disabled={!canPrev}
        className={cx(
          base,
          canPrev
            ? 'border-line bg-white text-ink hover:border-green-deep hover:bg-surface-mute'
            : 'cursor-not-allowed border-line-soft bg-white text-line-strong',
        )}
      >
        <ChevronLeft aria-hidden className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => onStep(1)}
        disabled={!canNext}
        className={cx(
          base,
          canNext
            ? 'border-lime bg-lime text-white shadow-[0_6px_18px_rgba(29,122,50,0.45)] hover:scale-105'
            : 'cursor-not-allowed border-line-soft bg-white text-line-strong',
        )}
      >
        <ChevronRight aria-hidden className="h-[18px] w-[18px]" />
      </button>
    </div>
  )
}

function TechnologiesPanel() {
  const [query, setQuery] = useState('')
  const shown = TECHNOLOGIES.filter((t) =>
    (t.title + ' ' + t.blurb).toLowerCase().includes(query.trim().toLowerCase()),
  )
  const { trackRef, scrollByCard, canPrev, canNext } = useCardSlider(shown.length)

  return (
    <>
      <PanelHeader
        heading="Explore our technologies"
        subheading="The five areas our engineering teams are organised around."
      >
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search technologies..."
          label="Search technologies"
        />
        <SelectField
          value="All Technologies"
          onChange={() => {}}
          options={['All Technologies']}
          label="Filter technologies"
        />
        <SliderArrows onStep={scrollByCard} label="technologies" canPrev={canPrev} canNext={canNext} />
      </PanelHeader>

      {shown.length === 0 ? (
        <div className="mt-8">
          <EmptyState message="No technologies match that search." />
        </div>
      ) : (
        /* A scroll-snap track rather than a grid: two and a half slides sit
           in the viewport at desktop, so the half slide on the right edge
           shows there is more to come without needing a scrollbar to say
           so. The widths are `calc()` off the container, with the gaps
           subtracted, so the fraction holds at any container width.

           Native overflow scrolling, not a transform carousel — it keeps
           the track swipeable on touch, scrollable with a trackpad, and
           reachable by keyboard for free. The scrollbar itself is hidden
           because the half-slide already does that job. */
        <ul ref={trackRef} className={SLIDER_TRACK}>
          {shown.map((t) => {
            // Numbering follows the source order, so it stays stable while a
            // search narrows the list.
            const no = String(TECHNOLOGIES.indexOf(t) + 1).padStart(2, '0')
            return (
              <li
                key={t.title}
                // Two and a half slides at desktop, so the half slide at the
                // right edge shows there is more without needing a scrollbar
                // to say so.
                className={slideClass(
                  'basis-[86%] sm:basis-[calc((100%-1rem)/1.8)] lg:basis-[calc((100%-2.5rem)/2.5)]',
                )}
              >
                <AppLink
                  href={t.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line-soft bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]"
                >
                  {/* Artwork sits behind the copy, anchored right, exactly as
                      the reference has it — the text column is ~60% and the
                      illustration fills the rest and bleeds to the edges. */}
                  <img
                    src={t.image}
                    alt=""
                    aria-hidden
                    decoding="async"
                    className="pointer-events-none absolute top-0 right-0 h-full w-[46%] object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="relative flex flex-1 flex-col p-5">
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-lime-tint font-body text-[11px] font-semibold text-green-deep">
                        {no}
                      </span>
                      <span aria-hidden className="h-px w-7 bg-line" />
                    </span>

                    <h4 className="mt-5 max-w-[60%] font-display text-[17px] leading-[1.2] font-medium text-ink">
                      {t.title}
                    </h4>
                    <p className="mt-2 max-w-[58%] font-body text-[13px] leading-[1.45] text-body">
                      {t.blurb}
                    </p>

                    <span className="mt-auto flex items-center gap-3 pt-6">
                      <span className="font-body text-[14px] font-medium text-ink">Explore</span>
                      <ArrowButton direction="right" className="!h-9 !w-9" />
                    </span>
                  </div>
                </AppLink>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

// `industryId` is owned by the section rather than by this panel, because
// the call-to-action bar underneath names the selected sector ("Automotive
// — talk to the programme team") and lives outside the panel.
function IndustryPanel({
  industryId,
  setIndustryId,
}: {
  industryId: string
  setIndustryId: (id: string) => void
}) {
  const [query, setQuery] = useState('')

  const industry = INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0]
  const shown = industry.programmes.filter((p) =>
    (p.title + ' ' + p.blurb).toLowerCase().includes(query.trim().toLowerCase()),
  )

  const step = (delta: number) => {
    const i = INDUSTRIES.findIndex((x) => x.id === industryId)
    setIndustryId(INDUSTRIES[(i + delta + INDUSTRIES.length) % INDUSTRIES.length].id)
  }

  return (
    <>
      <PanelHeader
        heading="Recommended solutions"
        subheading="Programmes matched to how your sector actually operates."
      >
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search solutions..."
          label="Search solutions"
        />
        <ResultCount n={shown.length} />
      </PanelHeader>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <span className="font-body text-[14px] font-medium text-ink">Which industry?</span>

        <div className="flex flex-wrap items-center gap-2.5" role="tablist" aria-label="Industry">
          {INDUSTRIES.map((i) => {
            const active = i.id === industryId
            return (
              <button
                key={i.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndustryId(i.id)}
                className={cx(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-body text-[14px] font-medium transition-all duration-300',
                  active
                    ? 'border-lime bg-lime text-white'
                    : 'border-line bg-white text-ink hover:border-green-deep',
                )}
              >
                <i.icon aria-hidden strokeWidth={1.7} className="h-[17px] w-[17px]" />
                {i.label}
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous industry"
            onClick={() => step(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-green-deep"
          >
            <ChevronLeft aria-hidden className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Next industry"
            onClick={() => step(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-green-deep"
          >
            <ChevronRight aria-hidden className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            message={
              industry.programmes.length === 0
                ? `Programmes for ${industry.label} are still being confirmed.`
                : 'No programmes match that search.'
            }
          />
        </div>
      ) : (
        <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {shown.map((p, i) => (
            <li key={p.title}>
              <AppLink
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line-soft bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    decoding="async"
                    className="h-[196px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 font-body text-[12px] font-semibold text-ink backdrop-blur-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-body text-[11px] font-medium tracking-[0.1em] text-green-deep uppercase">
                    Programme
                  </p>
                  <h4 className="mt-1.5 font-display text-[18px] leading-[1.2] font-medium text-ink">
                    {p.title}
                  </h4>
                  <p className="mt-2 font-body text-[13.5px] leading-[1.45] text-body">{p.blurb}</p>

                  <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="font-body text-[14px] font-medium text-ink">View Details</span>
                    <ArrowButton direction="right" />
                  </span>
                </div>
              </AppLink>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

/* -------------------------------------------------------------------------
 * Section
 * ---------------------------------------------------------------------- */

/**
 * Home3-only. The "What are you looking for?" solutions finder, built to the
 * client's 22 Sep reference screens: a tinted header band carrying four
 * pill tabs and a per-tab backdrop, a white body whose contents swap with
 * the tab, and a call-to-action bar pinned underneath.
 *
 * The artwork is cropped from those screens and stored under
 * `src/assets/Solutions`. Only the illustrations were taken — every
 * heading, category label, result count, step number and badge in the
 * reference is live markup here, so all of it is editable, translatable and
 * reachable by a screen reader.
 *
 * The search fields and filters are wired rather than decorative: the
 * product search and category filter, the technology search, and the
 * industry search and sector tabs all narrow what is rendered, and each
 * falls through to an empty state.
 */
export function SolutionsFinderHome3() {
  const [tabId, setTabId] = useState(TABS[0].id)
  const [industryId, setIndustryId] = useState(INDUSTRIES[0].id)
  const tabIndex = Math.max(
    0,
    TABS.findIndex((t) => t.id === tabId),
  )
  const tab = TABS[tabIndex]
  const industryLabel =
    INDUSTRIES.find((i) => i.id === industryId)?.label ?? INDUSTRIES[0].label

  return (
    <section id="solutions" className="pb-16 lg:pb-24">
      {/* Header band ---------------------------------------------------- */}
      {/* White, per the 22 Sep reference — the band used to carry a green
          wash (#f7fbf4 to #eef6ea).

          Top hairline only. The matching bottom one used to close the band
          off below the tab pills, but with the band and the body both white
          it had nothing to divide — it read as a stray rule floating in the
          gap between the pills and "Explore our products". The pills
          already mark where the header ends. */}
      <div className="relative overflow-hidden border-t border-line-soft bg-white">
        {/*
          Backdrop, anchored to the band itself rather than to a column
          inside it.

          It used to be a fixed 330x240 box floated in the right-hand
          column, which read as exactly that — a photograph pasted on, with
          four hard edges, not reaching any corner and cutting across the
          copy beside it.

          Now it bleeds to the top and right edges and runs the full height,
          and a radial mask fades it out towards the left and bottom so the
          band shows through instead of an edge.

          The mask is doing the blending, not an overlay in a matching
          colour. That held when the band was a green gradient, where a flat
          overlay would have matched at one height and banded everywhere
          else; it still holds now the band is white, because the mask stays
          correct whatever sits behind it — including the tab pills, which
          the image runs under.

          Hidden below `lg`, where the copy needs the full width.
        */}
        <img
          src={tab.backdrop}
          alt=""
          aria-hidden
          decoding="async"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[38%] object-cover object-center opacity-95 [-webkit-mask-image:radial-gradient(125%_130%_at_92%_42%,#000_25%,transparent_72%)] [mask-image:radial-gradient(125%_130%_at_92%_42%,#000_25%,transparent_72%)] lg:block"
        />

        {/* Asymmetric on purpose, and the two halves answer to different
            things.

            The top sets the band's own breathing room. Engineering Services
            above ends on a #eee gradient, so this section opens on a hard
            grey-to-white edge with nothing to soften it — the eyebrow needs
            clear space under that seam or the band reads as butted up
            against the previous section.

            The bottom only sets how far the tab pills sit from the panel
            they switch. With the band's bottom hairline gone there is
            nothing between the two, so matching the top here read as a
            hole. */}
        <div className="shell-wide relative pt-12 pb-8 lg:pt-20 lg:pb-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start lg:gap-10">
            <div>
              <p className="font-body text-[12px] font-semibold tracking-[0.16em] text-green-deep uppercase">
                Explore our solutions
              </p>
              <h2 className="mt-3 font-display text-[32px] leading-[1.1] font-semibold text-ink sm:text-[40px] lg:text-[46px]">
                What are you looking for?
              </h2>
              <p className="mt-3 max-w-[560px] font-body text-[14px] leading-[1.5] text-body lg:text-[15px]">
                Explore our products, platforms and engineering solutions by your area of interest.
              </p>
            </div>

            {/* Step counter, per-tab copy and backdrop. Below `lg` the
                backdrop would crowd the tabs, so only the copy carries
                over. */}
            {/* The step counter and per-tab copy. The backdrop is no longer
                in here — it belongs to the band — so this is now just the
                text, sitting clear of the vehicle rather than across it. */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="h-[3px] w-10 rounded-full bg-green-deep" />
                  <p className="font-body text-[13px] tracking-[0.1em] text-body-soft">
                    {String(tabIndex + 1).padStart(2, '0')} / {String(TABS.length).padStart(2, '0')}
                  </p>
                </div>
                <div className="mt-4 border-l border-line pl-5">
                  <p className="font-display text-[19px] leading-[1.2] font-medium text-ink">
                    {tab.title}
                  </p>
                  <p className="mt-1.5 max-w-[230px] font-body text-[13px] leading-[1.45] text-body">
                    {tab.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*
            The tabs sit below the two columns and span the full width,
            rather than inside the left one.

            Boxed into the left column they had 756px to work with and
            needed 808px, so "An Industry Solution" dropped to a second row.
            Trimming the pills would have bought back the 52px, but only at
            1440 — at the 1024 breakpoint that column is 580px and no amount
            of trimming fits four pills into it. Spanning the container
            gives them 1256px here and 1000px at 1024, so they hold one row
            across the whole desktop range.

            `relative` keeps them above the backdrop image, which is
            absolutely positioned in the column above and hangs down past
            it — decorative and `pointer-events-none`, but it should not
            paint over the controls.
          */}
          <div
            className="relative mt-8 flex flex-wrap gap-3"
            role="tablist"
            aria-label="What are you looking for?"
          >
            {TABS.map((t) => {
              const active = t.id === tabId
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`solutions-panel-${t.id}`}
                  onClick={() => setTabId(t.id)}
                  className={cx(
                    'inline-flex items-center gap-2.5 rounded-full border px-5 py-3 font-body text-[14px] font-medium transition-all duration-300',
                    active
                      ? 'border-lime bg-lime text-white shadow-[0_6px_18px_rgba(29,122,50,0.45)]'
                      : 'border-line bg-white text-ink hover:border-green-deep',
                  )}
                >
                  <t.icon aria-hidden strokeWidth={1.7} className="h-[18px] w-[18px]" />
                  {t.label}
                  {active && <Check aria-hidden strokeWidth={2.4} className="h-4 w-4" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Body ----------------------------------------------------------- */}
      {/* The pale mint wave artwork sits behind every tab's content as a
          background, not a panel: full width, no border or frame, at half
          strength, and faded out at top and bottom so it has no edge where
          it meets the header band or the call to action. A first pass put
          it in a bordered, rounded card; that read as a box and was taken
          out on review (30 Sep).

          It wraps the tab content rather than each panel, so switching tabs
          keeps the same ground instead of flashing a new one in. */}
      <div className="relative">
        <img
          src={solutionsPanelWaves}
          alt=""
          aria-hidden
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%,#000_72%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%,#000_72%,transparent_100%)]"
        />
        <div className="shell-wide relative pt-4">
          <div id={`solutions-panel-${tab.id}`} role="tabpanel">
            {tab.id === 'product' && <ProductsPanel />}
            {tab.id === 'service' && <ServicesPanel />}
            {tab.id === 'technology' && <TechnologiesPanel />}
            {tab.id === 'industry' && (
              <IndustryPanel industryId={industryId} setIndustryId={setIndustryId} />
            )}
          </div>
        </div>
      </div>

      <div className="shell-wide">

        {/* Call to action ---------------------------------------------- */}
        <div className="mt-8 flex flex-col gap-6 rounded-[16px] border border-line-soft bg-[linear-gradient(180deg,#f8fbf6_0%,#f2f7ef_100%)] p-6 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime-tint">
              <MessagesSquare aria-hidden strokeWidth={1.7} className="h-[22px] w-[22px] text-green-deep" />
            </span>
            <div>
              <p className="font-display text-[17px] leading-[1.2] font-medium text-ink lg:text-[18px]">
                {tab.id === 'industry' ? `${industryLabel} — ${tab.ctaTitle}` : tab.ctaTitle}
              </p>
              <p className="mt-1.5 max-w-[520px] font-body text-[13.5px] leading-[1.45] text-body">
                {CTA_BLURB}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
            <AppLink
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3.5 font-body text-[15px] font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore Solutions
              <ArrowRight aria-hidden className="h-[18px] w-[18px]" />
            </AppLink>
            <button
              type="button"
              onClick={() => setTabId(TABS[0].id)}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-6 py-3.5 font-body text-[15px] font-medium text-ink transition-colors duration-300 hover:border-green-deep"
            >
              <RotateCcw aria-hidden className="h-[17px] w-[17px]" />
              Start Over
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
