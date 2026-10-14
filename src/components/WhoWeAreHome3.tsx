import { Button } from './primitives'
import { aboutEngineering } from '../lib/assets'

/**
 * Home3's About block — the parent `WhoWeAre` minus its stat strip.
 *
 * The 16 Sep review asked for three changes here: drop the aerial campus
 * photo, drop the stat strip, and rename the eyebrow to "About Us". All
 * three were built, then on 18 Sep the client reverted the section — and
 * then asked for the stat strip alone to come back off. So of the three:
 *
 *   - the campus photo is gone after all, but by replacement rather than
 *     removal: `aboutEngineering` (src/assets/about-mobility-sectors.webp)
 *     is a supplied engineering composite — e-motor, control units and a
 *     board, with automotive and defence in the background — with the same
 *     aspect and the same transparent corner notch, so the layout below is
 *     unchanged from the parent's,
 *   - the "Who we are" eyebrow stays (revert stands),
 *   - the stat strip is gone, which is where the review landed anyway:
 *     3 sectors / 5 focus areas / 8 service lines / ∞ concept-to-SOP had
 *     nothing behind the numbers yet, and the page-wide rule is to show
 *     nothing we cannot back.
 *
 * Kept as its own file rather than re-importing `WhoWeAre`: Home and Home2
 * still run the full version, stat strip included, and must not move.
 */
export function WhoWeAreHome3() {
  return (
    <section id="about" className="shell-wide pb-16 lg:pb-24">
      <div className="relative">
        {/*
          The photo export carries a transparent notch across its top-left
          corner that this copy block is designed to sit in. At `lg` the block
          is absolutely placed into that notch; below `lg` it runs in normal
          flow and the image is cropped from the bottom so the notch never
          shows.
        */}
        <div className="mb-8 lg:absolute lg:top-[6px] lg:left-[36px] lg:z-10 lg:mb-0 lg:w-[540px]">
          <p className="font-body text-[18px] leading-none font-medium text-green lg:text-[20px]">
            About Us
          </p>
          <h2 className="mt-4 max-w-[514px] font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:mt-6 lg:text-[40px]">
            Products, Systems &amp; Engineering Services
          </h2>
          {/* 13 Oct copy. Held to three lines (line-clamp ends it with "…")
              so the block always fits the photo's notch, however long the
              copy grows; the full text stays in the DOM for screen readers
              and search. */}
          <p className="mt-4 line-clamp-3 max-w-[532px] font-body text-[15px] leading-[1.5] text-body lg:mt-5 lg:text-[16px]">
            Lucas TVS – Products, Systems &amp; Engineering Services is a global engineering and technology partner helping leading
            OEMs, Tier-1 suppliers, industrial enterprises, and defence
            organizations develop next-generation products, intelligent
            systems, and digital platforms.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[15px]">
          <img
            src={aboutEngineering}
            alt="A scooter, car, truck, loader, tank and military tanker in front of mountains, with aircraft overhead, beside an electric motor, control units and a circuit board and a vehicle design on a display screen"
            className="h-[380px] w-full object-cover object-bottom sm:h-[460px] lg:h-auto lg:object-fill"
          />

          <Button
            href="/about"
            variant="ghost"
            className="absolute top-5 right-5 !border-white !bg-white !px-9 shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] lg:top-[47px] lg:right-[40px]"
          >
            Explore More
          </Button>

          {/* The stat strip that sat across the bottom of the photo is
              gone. It was an overlay, so nothing below it needs to reflow —
              the image keeps its own height and simply has no band on it
              now. */}
        </div>
      </div>
    </section>
  )
}
