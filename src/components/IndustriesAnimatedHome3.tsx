import CircularSplitRoll from '@/components/ui/circular-split-roll'
import {
  sectorAutomotive,
  sectorIndustrial,
  sectorDefenceAerospace,
} from '../lib/assets'
import { ROUTES } from '../lib/routes'

const INDUSTRIES = [
  {
    title: 'Automotive',
    description:
      'Accelerating the transition to connected, electric, autonomous and software-defined mobility.',
    image: sectorAutomotive,
    alt: 'Electric SUV driving on a highway with a city skyline behind it',
    href: ROUTES.automotive,
  },
  {
    title: 'Industrial',
    description:
      'Enabling digitization and connected industrial ecosystem.',
    image: sectorIndustrial,
    alt: 'Robotic arm welding on an automated factory production line',
    href: ROUTES.industrial,
  },
  {
    title: 'Defence & Aerospace',
    description:
      'Supporting mission-critical programs through advanced engineering, embedded systems, electronics and digital technologies.',
    image: sectorDefenceAerospace,
    alt: 'Fighter jet flying past a mobile radar system at sunset',
    href: ROUTES.defence,
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
        {/* The sub-line ("Automotive, Industrial and Defence & Aerospace —
            end-to-end engineering, software and digital solutions across
            every domain.") was removed on 13 Oct. */}
      </header>
    </div>
  </div>
)

/**
 * Home3-only replacement for `IndustriesAnimated`. Same three sectors and
 * scroll-driven rotation — the only difference is `showOrbitRing`, a new
 * opt-in prop on `CircularSplitRoll` that draws the decorative dotted
 * orbit + gradient arcs + per-sector dot behind the rotating titles,
 * brightening whichever dot matches the sector currently in focus.
 *
 * 30 Sep: each sector card links to that sector's page — Automotive to
 * /industries/automotive and so on — through `CircularSplitRoll`'s
 * optional per-item `href`. Home and Home2 pass none, so theirs are
 * unchanged.
 */
export function IndustriesAnimatedHome3() {
  return (
    <section id="industries" className="relative overflow-hidden pt-8 lg:pt-12">
      <CircularSplitRoll
        items={INDUSTRIES}
        header={HEADER}
        radius={260}
        // Landscape, not the shared 240px square: the refreshed sector art
        // (1-3sectors.png) is 2043x770, and a square card cropped almost all
        // of it away. Sized from the Figma frame — card ~620x360 at a
        // 1810px-wide section.
        // Below 1025px: one landscape photo card per row on a phone (three
        // across on a tablet), title and line over the photo (24 Oct).
        gridLayout="stack"
        imageCardWidth={620}
        imageCardHeight={360}
        // Brand green on hover. `group-hover` fires from anywhere on the
        // card (the badge alone is a 32px target on a card that drifts as
        // you scroll); `hover` keeps it lit once the cursor is on the badge.
        cardIconClassName="group-hover:bg-lime group-hover:text-ink group-hover:ring-lime hover:bg-lime hover:text-ink hover:ring-lime"
        viewportHeight="100vh"
        titleSize="clamp(20px, 2.4vw, 36px)"
        // Reduce the scroll time on this section (16 Sep review, tightened
        // again on 18 Sep). CircularSplitRoll pins the section and holds it
        // for `sectionHeight * items` percent of the viewport: 90 over three
        // sectors was 270vh of scrolling to clear the block, 55 took it to
        // 165vh, 37 to ~111vh, and 30 brings it to ~90vh.
        //
        // The later steps are not further speed-ups: `rotationTurns` came
        // down alongside them, so the pin covers less rotation and the
        // length comes off to match, holding the pace at ~45vh per sector.
        // Change one without the other and the rotation speeds up or slows
        // down as a side effect.
        sectionHeight={30}
        // Stop on the last sector instead of spinning back to the first,
        // with a quarter-step of lead-in and lead-out so every sector gets a
        // real moment in focus.
        //
        // At the default of 1, the pinned range covers a FULL revolution, so
        // the sequence ran Defence -> Automotive -> Industrial -> Defence:
        // the closing stretch rotated back to the frame the section opened
        // on, spending real scroll to show something already seen.
        //
        // Cutting straight to 2/3 fixed that but broke Defence. It put
        // Defence's focus at exactly progress 0, so it was only ever the
        // section's arrival state — the first scroll input rotated it away
        // and it never held. Effectively it stopped appearing at all.
        //
        // A sector is at full focus when its position on the circle reaches
        // localProgress 0.75 (that is where `sin(angle + leftAngleOffset)`
        // peaks, with the default `leftAngleOffset` of PI). Working back
        // from that, `focusPhase` 0.25 puts the three foci exactly a third
        // of a turn apart starting at zero:
        //
        //   spin 0    Defence & Aerospace
        //   spin 1/3  Automotive
        //   spin 2/3  Industrial
        //
        // So `rotationTurns` is 2/3 — the last focus, and no further. The
        // rotation ENDS on Industrial at full focus and the pin releases on
        // that frame.
        //
        // Both halves of this matter, and each was got wrong once. At
        // `focusPhase` 0 the foci sit at 11/12, 1/4 and 7/12, which puts
        // Defence a twelfth of a turn PAST focus at the start — already
        // fading before the section pins, so it never held and read as
        // missing. And at `rotationTurns` 3/4 the pin ran a twelfth of a
        // turn PAST Industrial, so the section's parting frame was a
        // half-faded card (opacity 0.78) rather than the sector itself.
        //
        // Worth knowing if a fourth sector is ever added: both numbers are
        // tied to the item count and would need recomputing.
        focusPhase={0.25}
        rotationTurns={2 / 3}
        background="transparent"
        titleColor="var(--color-ink)"
        textCenterScale={1.1}
        imageCenterScale={1.15}
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
