import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '../../components/site/PageShell'
import {
  BAND,
  Eyebrow,
  FRAME,
  Heading,
  IconArrowUpRight,
  ImageSlot,
  Pill,
  SplitHeader,
} from '../../components/site/design'
import {
  Band,
  CtaPlate,
  DarkHero,
} from '../../components/site/blocks'
import { cx } from '../../lib/cx'
import { ROUTES } from '../../lib/routes'
import {
  aboutWhoWeAre,
  logoBat,
  logoDelphiTvs,
  logoIndeon,
  logoInel,
  logoLucasIndianService,
  logoLucasTvs,
  rndFeature,
} from '../../lib/assets'

/* ------------------------------------------------------------------
   Content — every string below is the 29 Sep reference's, verbatim.
------------------------------------------------------------------- */

/** "Who we are" copy (13 Oct). The first paragraph always shows; the
 *  rest sit behind "Read more". */
const WHO_WE_ARE = [
  'Lucas TVS – Products, Systems & Engineering Services is a global engineering and technology partner helping leading OEMs, Tier-1 suppliers, industrial enterprises, and defence organizations develop next-generation products, intelligent systems, and digital platforms.',
  'With deep expertise in embedded systems, software-defined platforms, electronics engineering, controls, cloud technologies, AI, and validation services, we support organizations across Automotive, Industrial, and Defence sectors in developing next-generation products and technologies.',
  'Our multidisciplinary teams work across the complete product lifecycle, from concept, architecture, and design to development, validation, deployment, and long-term support.',
  'Backed by the trusted Lucas TVS legacy and powered by modern engineering and digital capabilities, we help global customers accelerate time-to-market, reduce engineering complexity, improve product performance, and create sustainable competitive advantage.',
]
const WHO_WE_ARE_VISIBLE = 1

/** "Our R&D Tech Center, Hosur." band — hidden until its photos arrive. */
const SHOW_RD_CENTER = false

/**
 * Heritage milestones (14 Oct), newest first: 2025, then 1962 — the year Lucas TVS was
 * established as a Lucas UK – TVS joint venture (lucas-tvs.com/about-us).
 * The old 1930 opener was a Lucas Indian Service date, not Lucas TVS's,
 * and was dropped. A 1986 INEL milestone was tried and removed the same day.
 */
const TIMELINE: { year: string; text: string }[] = [
  {
    year: '2025',
    text: 'A dedicated software & product-engineering entity is formed to build the next generation of intelligent products.',
  },
  {
    year: '1962',
    text: 'Lucas TVS is established as a joint venture between Lucas UK and the TVS Group, India.',
  },
]

/**
 * The six group companies, from the client's group slide (14 Oct). Each
 * point is a list of segments; `b: true` sets a segment bold, as the
 * slide does for its figures. Website destinations follow the client's
 * About Us ecosystem link comments.
 */
type Seg = { t: string; b?: boolean }
const ECOSYSTEM: {
  name: string
  logos: string[]
  points: Seg[][]
  link?: { label: string; to?: string; href?: string }
}[] = [
  {
    name: 'Lucas TVS',
    logos: [logoLucasTvs],
    points: [
      [{ t: 'Leading provider of motors and controllers' }],
      [{ t: '10M+', b: true }, { t: ' motors produced annually' }],
      [{ t: '50+', b: true }, { t: ' countries, ' }, { t: '5+', b: true }, { t: ' global offices' }],
    ],
    link: { label: 'Lucas TVS Products', href: 'https://lucas-tvs.com/automotive-solutions-products/' },
  },
  {
    name: 'Bavarian Automotive Technologies',
    logos: [logoLucasTvs, logoBat],
    points: [
      [{ t: 'Strategic investment in Bavarian Automotive Technologies GmbH (software company) – HQ in Munich, Germany' }],
      [{ t: 'Extensive ECU development and industrialization experience' }],
    ],
    link: { label: 'Visit BAT', href: 'https://bat-electrification.com/' },
  },
  {
    name: 'India Nippon Electricals (INEL)',
    logos: [logoInel],
    points: [
      [{ t: 'Leading provider of electronic ignition products, sensors, controllers, actuators, and display solutions' }],
      [{ t: '10M+', b: true }, { t: ' units produced annually' }],
      [{ t: '14+', b: true }, { t: ' countries, export sales' }],
    ],
    link: { label: 'INEL Products', href: 'https://indianippon.com/Products-Solutions' },
  },
  {
    name: 'Lucas Indian Service Limited',
    logos: [logoLucasIndianService],
    points: [
      [{ t: 'Aftermarket service and parts distribution' }],
      [{ t: '17K+', b: true }, { t: ' distribution footprint in India' }],
      [{ t: '550+', b: true }, { t: ' service centers' }],
    ],
    link: { label: 'Visit Lucas Indian Service', href: 'https://www.lucas-service.com' },
  },
  {
    name: 'Delphi-TVS Technologies',
    logos: [logoDelphiTvs],
    points: [
      [{ t: 'Leading provider of Fuel Injection Equipment' }],
      [{ t: '650K+', b: true }, { t: ' FIE systems produced annually' }],
      [{ t: '6+', b: true }, { t: ' countries, export sales' }],
    ],
    link: { label: 'Visit Delphi-TVS', href: 'https://delphitvs.com' },
  },
  {
    name: 'Indeon',
    logos: [logoIndeon],
    points: [
      [{ t: 'Partnership with ' }, { t: '24M', b: true }, { t: ', global battery player for lithium-ion production' }],
      [{ t: 'Giga factory based on Semisolid platform technology' }],
    ],
    link: { label: 'Visit TVS Indeon', href: 'https://tvsindeon.com' },
  },
]

/**
 * About Us, built to "Lucas-TVS — Who We Are" in the 29 Sep reference
 * ("Lucas-TVS Phase 1 Wireframes (2)"), desktop and mobile artboards.
 *
 * Layout, copy, sizes, spacing, radii and section order follow that
 * reference exactly; see design.tsx for the two systematic departures
 * (typefaces and colour tokens) and why.
 *
 * Photography. The reference marks every image slot with what belongs in
 * it. Three slots are atmospheric backgrounds under dark type treatments,
 * and take approved imagery already on the homepage:
 *
 *   - hero, "R&D centre / engineering team" — the engineer at the
 *     workstation, the homepage's lead Insights image,
 *   - Vision card and the "What drives us" band (both removed 14 Oct) — dark engineering
 *     composites, each under a scrim so the reference's dark surface holds.
 *
 * The rest ask for specific things that do not exist yet — the INEL and
 * BAT logos and photographs of the Hosur labs — and render as the
 * reference draws them, labelled placeholders, until they
 * arrive. One is a conflict rather than a gap: the heritage slot asks for
 * "manufacturing floor", and the 16 Sep review ruled out all factory and
 * plant imagery. It stays a placeholder until that is resolved.
 */
/**
 * The heritage timeline: a static rail of green dots down the left, one
 * card per milestone. (14 Oct: the stepper — current-card highlight,
 * "next" button, progress line and "01 / 03" counter — was removed.)
 *
 * Each row is a two-column grid — rail, then card — and the rail cell is
 * a line in, the dot, a line out, both lines growing to fill. That keeps
 * every dot level with the middle of its own card whatever height the
 * card's copy runs to, and the lines meet across rows because the gap
 * between cards is the cards' own margin, not a gap in the list.
 */
function HeritageTimeline() {
  const count = TIMELINE.length
  return (
    <ol>
      {TIMELINE.map((row, i) => (
        <li key={row.year} className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-5">
          <span aria-hidden className="flex flex-col items-center">
            <span className={cx('w-[2px] flex-1', i === 0 ? 'bg-transparent' : 'bg-green-deep')} />
            <span className="h-3 w-3 shrink-0 rounded-full bg-green-deep shadow-[0_0_0_4px_rgba(35,143,56,0.14)]" />
            <span className={cx('w-[2px] flex-1', i === count - 1 ? 'bg-transparent' : 'bg-green-deep')} />
          </span>

          <div className="my-[7px] flex flex-col gap-1.5 rounded-[16px] border-[1.5px] border-line-soft bg-white px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6">
            <span className="shrink-0 font-display text-[22px] leading-[1.2] font-semibold text-green-deep sm:w-[76px] lg:text-[24px]">
              {row.year}
            </span>
            <span aria-hidden className="hidden h-10 w-px shrink-0 bg-line sm:block" />
            <span className="font-body text-[14px] leading-[1.55] text-body">{row.text}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function AboutPage() {
  return (
    <PageShell title="About Us">
      {/* 13 Oct: banner and "Who we are" images swapped — the multi-sector
          composite leads here, the engineer photo moved down to the band. */}
      <DarkHero
        image={aboutWhoWeAre}
        position="75% center"
        heightClass="min-h-[603px] lg:min-h-[664px]"
        crumbs={[{ label: 'About Us' }]}
        title="Engineering Intelligent Products for a"
        accent="Smarter Tomorrow."
        // The intro line ("End-to-end engineering, software and digital
        // solutions for Automotive, Industrial and Defence & Aerospace.")
        // was removed from the banner on 13 Oct.
        actions={
          <>
            <Pill to={ROUTES.capabilities}>Explore Capabilities</Pill>
            <Pill to={ROUTES.contact} tone="outline">
              Talk to Engineering
            </Pill>
          </>
        }
      />

      <Band>
        {/* 13 Oct: the "We help customers build…" statement and its three
            numbered points became the client's full company copy with the
            homepage composite beside it. The stat strip that sat under the
            old statement was removed the same day. */}
        <WhoWeAreSection />
      </Band>
      {/* 14 Oct: the separate "Our heritage" band ("Six decades of
          engineering trust.", its intro line and the holographic-display
          photo) was folded into "Who we are" above — only its timeline
          carried over. */}

      {/* The "Vision & Mission — What we’re here to do." band was removed
          on 14 Oct: it belongs on the parent Lucas TVS site, not here. */}

      {/* Ecosystem -------------------------------------------------- */}
      <section className="bg-surface-mute">
        <div className={`${FRAME} ${BAND}`}>
          <SplitHeader
            eyebrow="Our ecosystem"
            title="One group."
            accent="Shared strength."
            body="We draw on the manufacturing depth, product portfolio and global partnerships of the wider Lucas-TVS group."
          />

          {/* Six companies, three to a row from lg (two rows), two on a
              tablet, one on a phone. */}
          <div className="mt-7 grid gap-3.5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            {ECOSYSTEM.map((company) => {
              const link = company.link
              const linkInner = link && (
                <>
                  {link.label}
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lime text-ink transition-colors duration-300 group-hover:bg-lime">
                    <IconArrowUpRight />
                  </span>
                </>
              )
              const linkCls =
                'group mt-auto flex items-center gap-2.5 pt-2 font-body text-[14px] font-medium text-ink'
              return (
                <article
                  key={company.name}
                  className="flex flex-col gap-4 rounded-[20px] border-[1.5px] border-line-soft bg-white p-[22px] lg:p-7"
                >
                  <span className="flex h-12 items-center gap-3">
                    {company.logos.map((logo, i) => (
                      <img
                        key={i}
                        src={logo}
                        alt={i === 0 ? `${company.name} logo` : ''}
                        decoding="async"
                        className="max-h-11 w-auto max-w-[200px] object-contain"
                      />
                    ))}
                  </span>
                  <h3 className="font-display text-[20px] leading-[1.25] font-semibold text-ink">
                    {company.name}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {company.points.map((segs, i) => (
                      <li key={i} className="flex gap-2.5 font-body text-[14px] leading-[1.55] text-body">
                        <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                        <span>
                          {segs.map((seg, j) =>
                            seg.b ? (
                              <strong key={j} className="font-semibold text-green-deep">
                                {seg.t}
                              </strong>
                            ) : (
                              <span key={j}>{seg.t}</span>
                            ),
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {link &&
                    (link.to ? (
                      <Link to={link.to} className={linkCls}>
                        {linkInner}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                        {linkInner}
                      </a>
                    ))}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* The "What drives us / Values behind every build." band (four value
          cards) was removed on 14 Oct. */}

      {/* Where we build: hidden 14 Oct until the R&D Tech Center photos
          arrive. Set SHOW_RD_CENTER to true to bring it back. */}
      {SHOW_RD_CENTER && <RdCenterSection />}

      <CtaPlate />
    </PageShell>
  )
}

/**
 * "Who we are": the company copy and the heritage timeline on the left,
 * the engineer photo on the right, stretched to the column's height on
 * desktop. A two-line heading drawn from the first paragraph ("a global
 * engineering and technology partner"), then the client's copy as plain
 * paragraphs — the first always, the rest expanding in place behind
 * "Read more" — then the 2025 / 1962 milestones.
 */
function WhoWeAreSection() {
  const [expanded, setExpanded] = useState(false)
  const shown = WHO_WE_ARE.slice(0, WHO_WE_ARE_VISIBLE)
  const more = WHO_WE_ARE.slice(WHO_WE_ARE_VISIBLE)

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-16">
      <div className="flex flex-col gap-[22px] lg:w-[520px] lg:shrink-0">
        <Eyebrow>Who we are</Eyebrow>
        <Heading accent="Technology Partner.">Global Engineering &amp;</Heading>
        <span aria-hidden className="h-1 w-16 rounded-full bg-lime" />
        {shown.map((text) => (
          <p key={text} className="font-body text-[16px] leading-[1.65] text-body">
            {text}
          </p>
        ))}
        <div id="who-we-are-more" hidden={!expanded} className="flex flex-col gap-[22px]">
          {more.map((text) => (
            <p key={text} className="font-body text-[16px] leading-[1.65] text-body">
              {text}
            </p>
          ))}
        </div>
        {more.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="who-we-are-more"
            className="inline-flex items-center gap-2 self-start font-body text-[15px] font-medium text-green-deep transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-deep"
          >
            {expanded ? 'Read less' : 'Read more'}
            <ArrowRight
              aria-hidden
              strokeWidth={2}
              className={cx('h-4 w-4 transition-transform duration-300', expanded ? '-rotate-90' : 'rotate-90')}
            />
          </button>
        )}
        {/* The heritage milestones, merged in from the old heritage band. */}
        <div className="mt-2">
          <HeritageTimeline />
        </div>
      </div>

      <div className="relative min-w-0 grow overflow-hidden rounded-[24px] bg-surface-mute">
        <img
          src={rndFeature}
          alt="A Lucas TVS engineer reviewing data on a monitor in an engineering lab"
          decoding="async"
          loading="lazy"
          className="aspect-[1600/931] h-full w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto"
        />
      </div>
    </div>
  )
}

/**
 * "Where we build — Our R&D Tech Center, Hosur." Hidden from the page
 * (14 Oct): every tile is still a labelled placeholder, so it waits for
 * real photographs of the labs before it is shown again.
 */
function RdCenterSection() {
  return (
    <section className="bg-surface-mute">
      <div className={`${FRAME} ${BAND}`}>
        <SplitHeader
          eyebrow="Where we build"
          title="Our R&D Tech Center,"
          accent="Hosur."
          body="Labs for electronics, embedded software and validation — including HIL rigs for faster, safer testing."
          actions={
            <Pill to={ROUTES.contact} tone="ghost">
              Visit Us
            </Pill>
          }
        />

        {/* Desktop: the centre photograph takes a 2x2 block, two tiles
            beside it, and a wide tile under those. Mobile keeps the
            reference's lighter set — the photograph, then two tiles. */}
        <div className="mt-7 grid grid-cols-2 gap-3.5 lg:mt-10 lg:grid-cols-4 lg:grid-rows-[222px_222px] lg:gap-4">
          <ImageSlot
            label="Image: INEL R&D Tech Center, Hosur"
            className="col-span-2 h-[240px] rounded-[24px] md:h-[320px] lg:row-span-2 lg:h-full"
          />
          <ImageSlot
            label="Electronics lab"
            className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]"
          />
          <ImageSlot
            label="HIL test bench"
            className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]"
          />
          {/* Desktop only. Wrapped for the same reason as the CTA's second
              button: ImageSlot's plate is `flex`, and `hidden` on the
              same element only wins by accident of stylesheet order. */}
          <div className="hidden lg:col-span-2 lg:block">
            <ImageSlot label="Engineering team at work" className="h-full w-full rounded-[20px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
