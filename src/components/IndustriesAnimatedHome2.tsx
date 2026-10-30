import CircularSplitRoll from '@/components/ui/circular-split-roll'
import {
  sectorAutomotive,
  sectorIndustrial,
  sectorDefenceAerospace,
} from '../lib/assets'

const INDUSTRIES = [
  {
    title: 'Automotive',
    description:
      'Accelerating the transition to connected, electric, autonomous and software-defined mobility.',
    image: sectorAutomotive,
    alt: 'Electric SUV driving on a highway with a city skyline behind it',
  },
  {
    title: 'Industrial',
    description:
      'Enabling intelligent manufacturing, automation, digitalization and connected industrial ecosystems.',
    image: sectorIndustrial,
    alt: 'Robotic arm welding on an automated factory production line',
  },
  {
    title: 'Defence & Aerospace',
    description:
      'Supporting mission-critical programs through advanced engineering, embedded systems, electronics and digital technologies.',
    image: sectorDefenceAerospace,
    alt: 'Fighter jet flying past a mobile radar system at sunset',
  },
]

const HEADER = (
  // The padding, not a negative `top`, is what lifts the watermark clear of
  // the heading. This block is the first child of CircularSplitRoll's sticky
  // wrapper, which clips with its own `overflow-hidden` — so any negative
  // offset on the watermark crops its cap heights off. Padding pushes the
  // heading down instead, which reads the same and stays inside the clip.
  <div className="relative pt-8 lg:pt-16">
    {/* Oversized watermark behind the heading — same treatment as the
        original static Industries section. */}
    <p
      aria-hidden
      // Sized in vw at every breakpoint. The old `lg:text-[80px]` cap froze
      // the watermark at 80px from 1024 up, so on a 1440 screen it filled
      // only 63% of the width and stopped reading as a watermark. The string
      // measures 11.26x its font size, so 8.2vw holds it at ~94% of the
      // section width on any viewport — big, and it can never outgrow the
      // line and get clipped.
      className="watermark pointer-events-none absolute inset-x-0 top-2 text-center font-display text-[8.2vw] leading-none font-bold whitespace-nowrap uppercase select-none lg:top-0"
    >
      Industries we serve
    </p>

    <div className="shell relative">
      <header className="mx-auto max-w-[973px] text-center">
        <h2 className="font-display text-[24px] leading-[1.15] font-medium text-ink sm:text-[30px] lg:text-[38px]">
          One Engineering Core, Three Sectors.
        </h2>
        <p className="mx-auto mt-3 max-w-[955px] font-body text-[14px] leading-[1.5] text-body lg:text-[15px]">
          Automotive, Industrial and Defence &amp; Aerospace — end-to-end
          engineering, software and digital solutions across every domain.
        </p>
      </header>
    </div>
  </div>
)

/**
 * Home2-only replacement for `IndustriesAnimated`. Same three sectors and
 * scroll-driven rotation — the only difference is `showOrbitRing`, a new
 * opt-in prop on `CircularSplitRoll` that draws the decorative dotted
 * orbit + gradient arcs + per-sector dot behind the rotating titles,
 * brightening whichever dot matches the sector currently in focus.
 */
export function IndustriesAnimatedHome2() {
  return (
    <section id="industries" className="relative overflow-hidden py-8 lg:py-12">
      <CircularSplitRoll
        items={INDUSTRIES}
        header={HEADER}
        radius={260}
        // Landscape, not the shared 240px square: the refreshed sector art
        // (1-3sectors.png) is 2043x770, and a square card cropped almost all
        // of it away. Sized from the Figma frame — card ~620x360 at a
        // 1810px-wide section.
        imageCardWidth={620}
        imageCardHeight={360}
        // Brand green on hover. `group-hover` fires from anywhere on the
        // card (the badge alone is a 32px target on a card that drifts as
        // you scroll); `hover` keeps it lit once the cursor is on the badge.
        cardIconClassName="group-hover:bg-lime group-hover:text-white group-hover:ring-lime hover:bg-lime hover:text-white hover:ring-lime"
        viewportHeight="100vh"
        titleSize="clamp(20px, 2.4vw, 36px)"
        sectionHeight={90}
        background="transparent"
        titleColor="var(--color-ink)"
        textCenterScale={1.1}
        imageCenterScale={1.15}
        focusPhase={0}
        showOrbitRing
        orbitRingSize={300}
        orbitRingRadius={110}
        orbitDotRadius={135}
        // The text column's orbit centre sits ~140px left of the viewport
        // edge, so an un-offset ring renders entirely off-screen and its
        // focused dot stops ~130px short of the sector name. This slides it
        // back into view and parks the active dot against the title.
        orbitRingOffsetX={124}
      />
    </section>
  )
}
