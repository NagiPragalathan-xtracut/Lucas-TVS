import type { ComponentType } from 'react'
import { ArrowRight, FileUser, Handshake, MessagesSquare, Wrench, type LucideIcon } from 'lucide-react'
import { PageShell } from '../../components/site/PageShell'
import {
  IconBoard,
  IconBurst,
  IconChip,
  IconClipboardCheck,
  IconGauge,
  IconNetwork,
  IconPeople,
  IconShieldCheck,
  IconTarget,
  IconTile,
  IconTrend,
  BAND,
  FRAME,
  Pill,
  SplitHeader,
} from '../../components/site/design'
import {
  ArrowCircle,
  BODY_GAP,
  Band,
  DarkBand,
  DarkHero,
  type LinkTarget,
  SmartLink,
} from '../../components/site/blocks'
import { COMPANY, ROUTES } from '../../lib/routes'
import {
  careersScene,
  solutionsPanelWaves,
  whyCareer,
  whyExperts,
  whyImpact,
  whyTomorrow,
} from '../../lib/assets'

/**
 * "More than a job. A mission." — after the client's 1 Oct reference: four
 * photo cards, title only. Each title is split where the reference breaks
 * it. Every card leads somewhere related: the sectors the work ships into,
 * the engineering teams, the open roles, and the technologies ahead.
 */
const REASONS: {
  lines: [string, string]
  icon: ComponentType
  image: string
  link: LinkTarget
}[] = [
  { lines: ['Work on real-world', 'impact'], icon: IconTarget, image: whyImpact, link: { to: ROUTES.industries } },
  { lines: ['Collaborate with', 'experts'], icon: IconPeople, image: whyExperts, link: { to: ROUTES.capabilities } },
  { lines: ['Grow your', 'career'], icon: IconTrend, image: whyCareer, link: { href: COMPANY.careersPortal } },
  { lines: ['Shape a smarter', 'tomorrow'], icon: IconBurst, image: whyTomorrow, link: { to: ROUTES.technologies } },
]

const TEAMS = [
  { title: 'Embedded Software', icon: IconChip },
  { title: 'Electronics Hardware', icon: IconBoard },
  { title: 'Controls & Power Electronics', icon: IconGauge },
  { title: 'Functional Safety & Security', icon: IconShieldCheck },
  { title: 'Cloud, Data & AI', icon: IconNetwork },
  { title: 'Verification & Testing', icon: IconClipboardCheck },
]

/** The four hiring steps, each with an icon read off its line. */
const HIRING_STEPS: { title: string; sub: string; icon: LucideIcon }[] = [
  { title: 'Apply', sub: 'Pick a role on our careers portal', icon: FileUser },
  { title: 'Conversation', sub: 'Meet the team, talk engineering', icon: MessagesSquare },
  { title: 'Technical Round', sub: 'Solve a real-world problem', icon: Wrench },
  { title: 'Offer & Onboarding', sub: 'Get set up to build from day one', icon: Handshake },
]

/**
 * Careers, built to the Careers artboards of the 29 Sep reference. Copy is
 * the reference's.
 *
 * Every role link goes to the careers portal the reference names
 * (career.lucas-tvs.com); the site lists no roles itself.
 */
export default function CareersPage() {
  const portal = COMPANY.careersPortal

  return (
    <PageShell title="Careers">
      <DarkHero
        image={careersScene}
        position="72% center"
        heightClass="min-h-[588px] lg:min-h-[692px]"
        crumbs={[{ label: 'Careers' }]}
        title="Solve hard engineering problems."
        accent="Build what’s next."
        intro="Join a young software & product-engineering division inside Lucas-TVS — electrification, SDV, embedded systems, defence electronics and AI."
        actions={
          <>
            <Pill href={portal}>View Open Roles</Pill>
          </>
        }
      />

      {/* Why join us — on the same pale mint waves as Contact's "Other
          ways to reach us", faded out top and bottom. */}
      <section className="relative overflow-hidden">
        <img
          src={solutionsPanelWaves}
          alt=""
          aria-hidden
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_82%,transparent_100%)]"
        />
        <div className={`${FRAME} ${BAND} relative`}>
          <SplitHeader
            eyebrow="Why join us"
            title="More than a job."
            accent="A mission."
            body="We believe an organization’s most valued assets are its people — who individually and collectively make our goals possible."
          />
          {/* Four across from xl; two across below that, where four would
              leave each card too small for its photograph. */}
          <ul className={`${BODY_GAP} grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4`}>
            {REASONS.map((reason) => (
              <li key={reason.lines.join(' ')}>
                <ReasonCard reason={reason} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Band tone="mute">
        <SplitHeader
          eyebrow="Teams we hire for"
          title="Find your"
          accent="place."
          actions={
            <Pill href={portal} tone="ghost">
              See All Roles ↗
            </Pill>
          }
        />
        <ul className={`${BODY_GAP} grid gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-4`}>
          {TEAMS.map((team) => (
            <li key={team.title}>
              <SmartLink
                href={portal}
                label={`${team.title} roles on the careers portal`}
                className="group flex items-center justify-between gap-3.5 rounded-[18px] border-[1.5px] border-line-soft bg-white px-5 py-[18px] transition-colors duration-300 hover:border-green-deep/50"
              >
                <span className="flex items-center gap-3.5">
                  <IconTile tone="tint">
                    <team.icon />
                  </IconTile>
                  <span className="font-display text-[17px] leading-[1.25] font-semibold text-ink">{team.title}</span>
                </span>
                <ArrowCircle />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Band>

      <div className="pt-10 pb-10 lg:pt-16 lg:pb-16">
        <DarkBand>
          <SplitHeader
            dark
            eyebrow="How we hire"
            title="A simple,"
            accent="transparent process."
            body="Four steps from application to your first day — usually within a few weeks."
            actions={<Pill href={portal}>View Open Roles ↗</Pill>}
          />
          <HiringProcess />
        </DarkBand>
      </div>
    </PageShell>
  )
}

/**
 * A "Why join us" card. The photograph is the reference's own, cut to the
 * card (src/assets/Careers); the arrow, icon tile and title it carried
 * were painted out of the crop, and are drawn back here live.
 *
 * Everything on top is placed and sized as a share of the card — the card
 * keeps the reference's 424:400 proportion, and the title is set in
 * container-width units — so the overlays land exactly where the
 * reference had them, and over the painted-out patches, at any card size.
 */
function ReasonCard({ reason }: { reason: (typeof REASONS)[number] }) {
  return (
    <SmartLink
      to={reason.link.to}
      href={reason.link.href}
      className="group @container relative block aspect-[424/400] overflow-hidden rounded-[18px] bg-[#1c282f] shadow-[0_18px_40px_rgba(16,40,47,0.16)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(16,40,47,0.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-deep motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <img
        src={reason.image}
        alt=""
        aria-hidden
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,40,47,0.7)_0%,rgba(28,40,47,0)_42%)]"
      />
      <span
        aria-hidden
        className="absolute top-[6%] right-[5.6%] grid aspect-square w-[13.4%] place-items-center rounded-full bg-lime text-white transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
      >
        <ArrowRight strokeWidth={2.25} className="h-[44%] w-[44%] transition-transform duration-300 group-hover:translate-x-[8%]" />
      </span>
      <span
        aria-hidden
        className="absolute top-[59.25%] left-[7.3%] grid aspect-square w-[14.4%] place-items-center rounded-[16%] bg-[#e9f8c5] text-ink [&>svg]:h-[46%] [&>svg]:w-[46%]"
      >
        <reason.icon />
      </span>
      <h3 className="absolute top-[79.5%] right-[5%] left-[7.3%] font-display text-[length:6.6cqw] leading-[1.2] font-semibold text-white">
        <span className="block">{reason.lines[0]}</span>{' '}
        <span className="block">{reason.lines[1]}</span>
      </h3>
    </SmartLink>
  )
}

/**
 * "How we hire" as a four-card process (1 Oct): the steps in one row on
 * desktop, read left to right. Same dark glass, lime ring and mono
 * numerals as the site's other step lists, so it sits with them — but
 * each card stands up rather than lying flat, which is what lets four fit
 * across.
 *
 * Two across on a tablet and one on a phone. The numbers carry the order
 * at every width; the chevrons that once sat in the gaps came off at the
 * client's request.
 */
function HiringProcess() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {HIRING_STEPS.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col gap-5 rounded-[18px] border border-[#3a3c3a] bg-black/70 p-5 lg:gap-7 lg:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lime text-lime-light"
            >
              <step.icon strokeWidth={1.75} className="h-[22px] w-[22px]" />
            </span>
            <span className="font-mono text-[22px] leading-none font-bold text-lime-light lg:text-[26px]">
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-[18px] leading-[1.25] font-semibold text-white lg:text-[19px]">
              {step.title}
            </h3>
            <p className="font-body text-[13px] leading-[1.5] text-white/70 lg:text-[14px]">{step.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
