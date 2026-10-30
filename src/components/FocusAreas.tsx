import { useEffect, useRef, useState, type ComponentType, type MouseEventHandler } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import {
  Zap,
  Cog,
  BatteryCharging,
  Cpu,
  Code2,
  Server,
  Cloud,
  ShieldCheck,
  Bot,
  Eye,
  Truck,
  Factory,
  Radar,
  Satellite,
  Lock,
  HardDrive,
  BrainCircuit,
  CloudCog,
  Database,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  type LucideProps,
} from 'lucide-react'
import { ChevronPill } from './primitives'
import { cx } from '../lib/cx'
import {
  focusElectrification,
  focusSoftwareDefined,
  focusAutomation,
  focusMissionCritical,
  focusAiDigital,
  productInverter,
  productTractionMotor,
  productBms,
  productVcu,
  productVehicleComputingUnit,
  productDomainController,
  productCloudIntegration,
  productCybersecurity,
  productIndustrialRobotics,
  productMachineVision,
  productAgvAmr,
  productSmartFactory,
  productRuggedCompute,
  productDefenceAvionics,
  productSurveillanceComms,
  productSafetyCriticalControl,
  productCloudEngineering,
  productDataPlatforms,
  productAiMl,
  productDigitalEngineering,
} from '../lib/assets'

type Product = {
  label: string
  icon: ComponentType<LucideProps>
  href: string
  /** Product shot for the hotspot tile. Falls back to `icon` when absent. */
  image?: string
}

type FocusArea = {
  id: string
  tab: string
  tabIcon: ComponentType<LucideProps>
  heading: [string, string]
  blurb: string
  image: string
  products: [Product, Product, Product, Product]
}

const PRODUCTS_URL = 'https://lucas-tvs.com/automotive-solutions-products/'
const AUTOPLAY_MS = 5500

/**
 * Home2-only. Rebuilt as a dark, cinematic showcase per the client's Focus
 * Areas reference (screens + interaction spec, Sep 12): a full-bleed hero
 * image per focus area with an auto-rotating, hover-pausable carousel,
 * crossfading background, staggered product hotspots, a mouse-parallax
 * hero image and a pill tab bar. Product names for the 4 non-Electrification
 * tabs come straight from that reference — the Figma export only shipped
 * real tiles for Electrification, so those still link to a generic
 * products page pending client-supplied per-product URLs.
 */
const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'electrification',
    tab: 'Electrification & Powertrain',
    tabIcon: Zap,
    heading: ['Electrification &', 'Powertrain'],
    blurb: 'Power electronics, controls and software accelerating electric mobility.',
    image: focusElectrification,
    products: [
      { label: 'Inverter', icon: Zap, href: PRODUCTS_URL, image: productInverter },
      { label: 'Traction Motor', icon: Cog, href: PRODUCTS_URL, image: productTractionMotor },
      {
        label: 'Battery Management System (BMS)',
        icon: BatteryCharging,
        href: PRODUCTS_URL,
        image: productBms,
      },
      { label: 'Vehicle Control Unit (VCU)', icon: Cpu, href: PRODUCTS_URL, image: productVcu },
    ],
  },
  {
    id: 'software-defined',
    tab: 'Software Defined Platforms',
    tabIcon: Code2,
    heading: ['Software Defined', 'Platforms'],
    blurb: 'Scalable software architectures for continuous innovation and lifecycle management.',
    image: focusSoftwareDefined,
    products: [
      {
        label: 'Vehicle Computing Unit',
        icon: Cpu,
        href: PRODUCTS_URL,
        image: productVehicleComputingUnit,
      },
      {
        label: 'Domain Controller',
        icon: Server,
        href: PRODUCTS_URL,
        image: productDomainController,
      },
      {
        label: 'Cloud Integration Platforms',
        icon: Cloud,
        href: PRODUCTS_URL,
        image: productCloudIntegration,
      },
      {
        label: 'Cybersecurity Solutions',
        icon: ShieldCheck,
        href: PRODUCTS_URL,
        image: productCybersecurity,
      },
    ],
  },
  {
    id: 'automation',
    tab: 'Intelligent Automation',
    tabIcon: Bot,
    heading: ['Intelligent', 'Automation'],
    blurb: 'Productivity through connected systems, automation and digital manufacturing.',
    image: focusAutomation,
    products: [
      {
        label: 'Industrial Robotics',
        icon: Bot,
        href: PRODUCTS_URL,
        image: productIndustrialRobotics,
      },
      {
        label: 'Machine Vision Systems',
        icon: Eye,
        href: PRODUCTS_URL,
        image: productMachineVision,
      },
      { label: 'AGVs & AMRs', icon: Truck, href: PRODUCTS_URL, image: productAgvAmr },
      {
        label: 'Smart Factory Solutions',
        icon: Factory,
        href: PRODUCTS_URL,
        image: productSmartFactory,
      },
    ],
  },
  {
    id: 'mission-critical',
    tab: 'Mission-Critical Systems',
    tabIcon: ShieldCheck,
    heading: ['Mission-Critical', 'Systems'],
    blurb: 'High-reliability engineering for safety-critical and defence applications.',
    image: focusMissionCritical,
    products: [
      {
        label: 'Rugged Compute Systems',
        icon: HardDrive,
        href: PRODUCTS_URL,
        image: productRuggedCompute,
      },
      {
        label: 'Defence Electronics & Avionics',
        icon: Radar,
        href: PRODUCTS_URL,
        image: productDefenceAvionics,
      },
      {
        label: 'Surveillance & Communication Systems',
        icon: Satellite,
        href: PRODUCTS_URL,
        image: productSurveillanceComms,
      },
      {
        label: 'Safety-Critical Control Systems',
        icon: Lock,
        href: PRODUCTS_URL,
        image: productSafetyCriticalControl,
      },
    ],
  },
  {
    id: 'ai-digital',
    tab: 'AI & Digital Engineering',
    tabIcon: BrainCircuit,
    heading: ['AI & Digital', 'Engineering'],
    blurb: 'Data-driven engineering across product development and operations.',
    image: focusAiDigital,
    products: [
      {
        label: 'Cloud Engineering & Infrastructure',
        icon: CloudCog,
        href: PRODUCTS_URL,
        image: productCloudEngineering,
      },
      {
        label: 'Data Platforms & Analytics',
        icon: Database,
        href: PRODUCTS_URL,
        image: productDataPlatforms,
      },
      { label: 'AI/ML Solutions', icon: BrainCircuit, href: PRODUCTS_URL, image: productAiMl },
      {
        label: 'Digital Product Engineering',
        icon: LayoutGrid,
        href: PRODUCTS_URL,
        image: productDigitalEngineering,
      },
    ],
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export function FocusAreas() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const active = FOCUS_AREAS[index]

  // Auto-rotate every ~5.5s; pauses on hover and restarts its clock
  // whenever the visitor picks a tab manually.
  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FOCUS_AREAS.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, index])

  const goTo = (i: number) => setIndex((i + FOCUS_AREAS.length) % FOCUS_AREAS.length)

  // Subtle mouse-parallax on the hero image only — capped well under the
  // "5-10px max" the reference calls for.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const parallaxX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.3 })
  const parallaxY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.3 })

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (reduceMotion) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    rawX.set(relX * 14)
    rawY.set(relY * 10)
  }

  const resetParallax = () => {
    setPaused(false)
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section id="capabilities" className="px-5 pb-16 lg:pb-24">
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={resetParallax}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-[24px] bg-black"
      >
        {/* Backdrop — spans the whole card, tab bar included, rather than
            stopping at the hero area. All five images stay mounted and swap
            via CSS opacity rather than mount/unmount: the style engine
            drives it, so a dropped animation frame can't strand the wrong
            backdrop on screen, and every image is decoded before its tab is
            picked. `object-cover` scales one copy to fill — an <img> can't
            tile, so there's nothing to repeat. */}
        <motion.div
          aria-hidden
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 h-[104%] w-[104%] -left-[2%] -top-[2%]"
        >
          {FOCUS_AREAS.map((area, i) => (
            <img
              key={area.id}
              src={area.image}
              alt=""
              aria-hidden
              className={cx(
                'absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out',
                i === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0',
              )}
            />
          ))}
        </motion.div>

        {/* Overlays — full card, so the tab bar sits on the same wash. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
        />

        <div className="relative h-[560px] sm:h-[600px] lg:h-[640px]">
          {/* Copy — top-left. */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <div className="max-w-[420px] lg:max-w-[460px]">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-lime" aria-hidden />
                <p className="font-body text-[13px] font-medium tracking-[0.02em] text-lime-light">
                  Focus Areas
                </p>
              </div>

              <motion.div
                key={active.id}
                initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="mt-3 font-display text-[32px] leading-[1.1] font-semibold text-white sm:text-[40px] lg:text-[46px]">
                  {active.heading[0]} <span className="text-lime-light">{active.heading[1]}</span>
                </h2>
                <p className="mt-4 max-w-[360px] font-body text-[15px] leading-[1.5] text-white/75">
                  {active.blurb}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Product hotspots — right side, desktop only. Lime photo tile,
              ringed node on the connector line, label + "View Details →".
              `product.image` is optional: until the product shots land, the
              tile falls back to the step's icon, so dropping the photos in
              later is a data-only change. */}
          <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 lg:block lg:right-12">
            <div className="relative flex flex-col gap-4">
              <span
                aria-hidden
                className="absolute top-[51px] bottom-[51px] left-[6px] w-px overflow-hidden bg-white/25"
              >
                <motion.span
                  key={`${active.id}-line`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ transformOrigin: 'top' }}
                  className="block h-full w-full bg-lime"
                />
              </span>

              {active.products.map((product, i) => (
                <motion.a
                  key={`${active.id}-${product.label}`}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.09, ease: EASE }}
                  className="group relative flex items-center gap-4"
                >
                  {/* Node on the connector line */}
                  <span
                    aria-hidden
                    className="relative z-10 grid h-[13px] w-[13px] shrink-0 place-items-center rounded-full border-2 border-lime bg-black transition-transform duration-300 group-hover:scale-125"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-lime" />
                  </span>

                  {/* Product tile, set in a frosted-glass frame. The frame
                      blurs whatever slice of the backdrop sits behind it, so
                      it re-tints itself as the tabs crossfade — no per-tab
                      colour needed. The inner gradient is the light catch
                      along the top-left edge that sells the glass. */}
                  <span className="relative shrink-0 rounded-[20px] border border-white/25 bg-white/10 p-[9px] shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/15">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/25 via-white/5 to-transparent"
                    />
                    <span className="relative grid h-[84px] w-[84px] place-items-center overflow-hidden rounded-[13px] bg-lime transition-transform duration-300 group-hover:scale-105">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt=""
                          aria-hidden
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <product.icon aria-hidden strokeWidth={1.6} className="h-9 w-9 text-ink" />
                      )}
                    </span>
                  </span>

                  <span className="min-w-0 max-w-[190px]">
                    <span className="block font-body text-[15px] leading-[1.25] font-medium text-white">
                      {product.label}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-2 font-body text-[14px] text-lime-light">
                      View Details
                      <ArrowRight
                        aria-hidden
                        className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Prev / next + dots — bottom-left. */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4 sm:bottom-8 sm:left-10 lg:bottom-10 lg:left-14">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous focus area"
                onClick={() => goTo(index - 1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next focus area"
                onClick={() => goTo(index + 1)}
                className="grid h-9 w-9 place-items-center rounded-full bg-lime text-white transition-transform hover:scale-105"
              >
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Focus areas">
              {FOCUS_AREAS.map((area, i) => (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={area.tab}
                  onClick={() => goTo(i)}
                  className={cx(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-lime' : 'w-2 bg-white/35 hover:bg-white/60',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab bar — sits inside the card, inset from its edges, as a
            bordered glass bar. Hairline dividers separate inactive
            neighbours; the active segment is a rounded lime pill. */}
        <div className="relative p-3 lg:p-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur-md">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent"
            />

            <div className="relative flex snap-x overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
              {FOCUS_AREAS.map((area, i) => {
                const isActive = i === index
                const prevIsActive = i > 0 && index === i - 1
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive}
                    className={cx(
                      'group relative flex shrink-0 snap-start items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-body text-[13px] font-medium whitespace-nowrap transition-all duration-300 ease-in-out lg:w-full lg:shrink lg:px-4 lg:text-[14px]',
                      i > 0 && !isActive && !prevIsActive && 'lg:border-l lg:border-white/10',
                      isActive
                        ? 'bg-lime text-white shadow-[0_4px_14px_rgba(29,122,50,0.35)]'
                        : 'text-white/65 hover:bg-white/[0.06] hover:text-lime-light',
                    )}
                  >
                    <area.tabIcon
                      aria-hidden
                      strokeWidth={1.8}
                      className={cx(
                        'h-4 w-4 transition-colors duration-300 ease-in-out',
                        isActive ? 'text-ink' : 'text-white/55 group-hover:text-lime-light',
                      )}
                    />
                    {area.tab}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile / tablet fallback — the right-side hotspot column is
          desktop-only, so the active area's products still show here.
          Inherits the section's own px-5 gutter. */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
        {active.products.map((product) => (
          <a
            key={product.label}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[14px] border border-line bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
          >
            <product.icon aria-hidden strokeWidth={1.8} className="h-[20px] w-[20px] text-green-deep" />
            <span className="mt-2.5 font-display text-[13.5px] leading-[1.25] font-medium text-ink">
              {product.label}
            </span>
            <span className="mt-auto flex items-center gap-1.5 pt-2.5 font-body text-[12px] text-body">
              View Details
              <ChevronPill
                className="!h-[20px] !w-[38px] transition-transform duration-300 group-hover:translate-x-1"
                iconClassName="h-[10px] w-[10px]"
                label={`View details: ${product.label}`}
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
