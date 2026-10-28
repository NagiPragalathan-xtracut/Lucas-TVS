import { Users, Settings, Rocket, ArrowRight, type LucideIcon } from 'lucide-react'
import { AppLink } from './AppLink'
import { careersScene } from '../lib/assets'

/**
 * The reasons-to-join under the buttons, left to right. There were four;
 * "Shape a smarter tomorrow" came off on 30 Sep at the client's request.
 */
const HIGHLIGHTS: { icon: LucideIcon; lines: [string, string] }[] = [
  { icon: Users, lines: ['Work on', 'real-world impact'] },
  { icon: Settings, lines: ['Collaborate with', 'experts'] },
  { icon: Rocket, lines: ['Grow your', 'career'] },
]

/**
 * Home3-only replacement for `Careers`, built to the client's 22 Sep
 * reference.
 *
 * The parent is a full-bleed campus photo with a black scrim and centred
 * white copy over it. This is the same words over a different photograph:
 * the engineer-and-HUD scene, with the copy sitting in the blurred lab
 * space on its left. Nothing about the message changed — the review kept
 * this section as it was, and only the treatment is new.
 *
 * It also drops the last plant photography on the page. The parent's
 * backdrop is the Lucas-TVS campus, which the 16 Sep review ruled out
 * everywhere; the new scene is an engineer at work instead.
 *
 * `careersBackdrop` stays exactly as it is for Home, NewHome and Home2.
 */
export function CareersHome3() {
  return (
    <section id="careers" className="shell-wide pb-16 lg:pb-24">
      {/* 2px light-grey frame. The panel is white on a white page, so
          without it the only thing defining the section's edge is where the
          photograph happens to end. `inset-0` on the image resolves to the
          padding box, so the photograph sits inside the border rather than
          under it, and the rounding carries through. */}
      <div className="relative overflow-hidden rounded-[20px] border-2 border-line-soft bg-white">
        {/*
          The scene is the section's background, not a panel beside the
          copy. The supplied photograph is 2000x782 and already carries a
          wide stretch of softly blurred lab on its left — the reference is
          this same frame with the copy sitting in exactly that space.

          Below `lg` it cannot work that way: a 2.56 ratio band with text
          over it leaves the copy nowhere to go, so there the image is an
          ordinary banner and the copy runs underneath it. From `lg` it goes
          absolute and fills the panel.

          `object-[68%_center]` holds the engineer and her display in frame
          as the panel gets narrower, rather than centring on empty bench.
        */}
        <img
          src={careersScene}
          alt="Engineer working at a holographic display showing AI simulation, electrification, embedded systems, software defined vehicle and defence electronics around a car"
          decoding="async"
          className="h-[230px] w-full object-cover object-[68%_center] sm:h-[320px] lg:absolute lg:inset-0 lg:h-full"
        />

        {/* Legibility wash, desktop only — on mobile the copy sits on white
            below the image and needs nothing. Clears to transparent well
            before the engineer so the photograph is not dulled. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white from-24% via-white/85 via-50% to-transparent to-70% lg:block"
        />

        <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:min-h-[520px] lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-8 lg:p-12 xl:p-14">
          {/* Copy ------------------------------------------------------- */}
          <div>
          <p className="font-body text-[12px] font-semibold tracking-[0.18em] text-green-deep uppercase">
            Careers
          </p>

          {/* Two sentences, the second in green — the reference breaks the
              colour at the sentence, not at a line. */}
          <h2 className="mt-4 font-display text-[30px] leading-[1.15] font-semibold text-ink sm:text-[34px] lg:text-[36px]">
            Solve hard engineering problems.{' '}
            <span className="text-green">Build what&rsquo;s next.</span>
          </h2>

          <p className="mt-4 max-w-[430px] font-body text-[15px] leading-[1.55] text-body">
            Join a young software &amp; product-engineering division inside
            Lucas-TVS — electrification, SDV, embedded systems, defence
            electronics and AI.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <AppLink
              href="https://career.lucas-tvs.com"
              className="inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3.5 font-body text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              View open roles
              <ArrowRight aria-hidden className="h-[18px] w-[18px]" />
            </AppLink>
            <AppLink
              href="/careers#life"
              className="inline-flex items-center rounded-full border border-line bg-white px-6 py-3.5 font-body text-[15px] font-medium text-ink transition-colors duration-300 hover:border-green-deep"
            >
              Life at Lucas TVS
            </AppLink>
          </div>

          {/* One row with hairlines between them, as the reference has
              it — but only from `sm`. At 375px that row is too narrow for
              labels like "Collaborate with experts", so phones get a
              two-column grid and drop the rules, which have nothing left to
              separate.

              The rules are an explicit border on each item bar the first,
              not `divide-x` on the row: `divide-x` applied its colour here
              but emitted no width, leaving them invisible.

              `items-start` so the four line up on their icons rather than
              being centred against each other. */}
          {/* Phones (24 Oct): an auto-scrolling strip, two highlights in view
              at a time. The list is doubled and the track slides by half its
              width, so the loop is seamless; each item is half the strip
              (50cqw). It stops for reduced motion, where the strip can be
              swiped instead. Screen readers get the static list below. */}
          <div aria-hidden className="@container mt-9 overflow-hidden motion-reduce:overflow-x-auto sm:hidden">
            <ul className="flex w-max animate-[marquee_12s_linear_infinite] motion-reduce:animate-none">
              {[...HIGHLIGHTS, ...HIGHLIGHTS].map((h, i) => (
                <li key={i} className="w-[50cqw] shrink-0 pr-4">
                  <h.icon strokeWidth={1.6} className="h-[22px] w-[22px] text-green-deep" />
                  <p className="mt-3 font-body text-[12px] leading-[1.35] text-ink">
                    <span className="block whitespace-nowrap">{h.lines[0]}</span>
                    <span className="block whitespace-nowrap">{h.lines[1]}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="sr-only sm:not-sr-only sm:mt-9 sm:flex sm:items-start sm:gap-0">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.lines.join(' ')}
                className="min-w-0 sm:flex-1 sm:border-l sm:border-line-soft sm:px-2 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
              >
                <h.icon
                  aria-hidden
                  strokeWidth={1.6}
                  className="h-[22px] w-[22px] text-green-deep"
                />
                {/* Each written line is held to one rendered line.
                    Without this the column decides where the text breaks:
                    "real-world impact" needs 110px and only had 99px, so
                    most ran to three lines while "Grow your career" stayed
                    at two, and the row sat unevenly. The
                    copy column was widened to 540px to give every label
                    the width it measures, with room to spare. */}
                <p className="mt-3 font-body text-[12px] leading-[1.35] text-ink">
                  <span className="block whitespace-nowrap">{h.lines[0]}</span>
                  <span className="block whitespace-nowrap">{h.lines[1]}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

          {/* The PEOPLE / IDEAS / TECHNOLOGY note that used to sit here is
              gone. It worked in the reference, where the photograph had
              clear space at its right edge; against the full-bleed version
              of that photograph it landed on top of the "Embedded Systems"
              card in the display and neither could be read. */}
        </div>
      </div>
    </section>
  )
}
