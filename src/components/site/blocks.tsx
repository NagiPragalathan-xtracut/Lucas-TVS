import { useId, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cx } from '../../lib/cx'
import { ROUTES } from '../../lib/routes'
import { approachBackdrop } from '../../lib/assets'
import { capabilityIcon } from '../../data/capabilityIcons'
import {
  BAND,
  Eyebrow,
  FRAME,
  IconArrowUpRight,
  IconTile,
  ImageSlot,
} from './design'

/* ------------------------------------------------------------------
   Section blocks for the Phase 1 inner pages.

   design.tsx holds the primitives (frame, eyebrow, heading, pill, image
   slot, icons). These are the larger pieces the reference repeats from
   page to page — the dark hero, the numbered statement, the stat row,
   the card families, the dark band, the closing plate — each sized to
   the reference's desktop and mobile artboards. A page built to the
   reference is these, arranged, plus its copy.
------------------------------------------------------------------- */

/* ------------------------------------------------------------------
   Links
------------------------------------------------------------------- */

export type LinkTarget = { to?: string; href?: string }

/** Internal route via react-router, external URL in a new tab. */
export function SmartLink({
  to,
  href,
  className,
  children,
  label,
}: LinkTarget & { className?: string; children: ReactNode; label?: string }) {
  if (to) {
    return (
      <Link to={to} className={className} aria-label={label}>
        {children}
      </Link>
    )
  }
  if (href?.startsWith('#')) {
    return (
      <a href={href} className={className} aria-label={label}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  )
}

/**
 * The 36px ringed arrow that ends most cards. `lime-on-dark` keeps the
 * lime ring but draws the arrow white, for a dark card — the ink arrow of
 * `lime` would vanish there.
 */
export function ArrowCircle({ tone = 'lime' }: { tone?: 'lime' | 'white' | 'lime-on-dark' }) {
  return (
    <span
      aria-hidden
      className={cx(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-300',
        tone === 'lime' && 'border-lime text-ink group-hover:bg-lime',
        tone === 'white' && 'border-white text-white group-hover:bg-white group-hover:text-ink',
        tone === 'lime-on-dark' && 'border-lime text-white group-hover:bg-lime group-hover:text-ink',
      )}
    >
      <IconArrowUpRight />
    </span>
  )
}

/* ------------------------------------------------------------------
   Bands
------------------------------------------------------------------- */

/** A full-width band of the page: white or the pale grey, framed and padded. */
export function Band({
  tone = 'white',
  children,
  className,
  id,
}: {
  tone?: 'white' | 'mute'
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    // scroll-mt clears the pinned header when a band is an in-page anchor
    // target ("#explore", "#stories"...) and the browser jumps natively.
    <section id={id} className={cx('scroll-mt-[104px]', tone === 'mute' && 'bg-surface-mute')}>
      <div className={cx(FRAME, BAND, className)}>{children}</div>
    </section>
  )
}

/** The gap between a band's header and its body: 40px desktop, 28px mobile. */
export const BODY_GAP = 'mt-7 lg:mt-10'

/* ------------------------------------------------------------------
   Hero
------------------------------------------------------------------- */

export type Crumb = { label: string; to?: string }

/**
 * The dark, full-bleed opening band every designed page shares. The
 * overlay header floats over its top edge; the copy sits at its foot.
 *
 * `heightClass` carries the reference's artboard heights for the page
 * (they differ with the length of the headline). They are minimums, not
 * fixed heights: a headline that wraps one line more than the drawing —
 * a narrower phone, a longer translation — grows the band instead of
 * running up under the header.
 *
 * The reference sets a mono eyebrow above the headline. It is not
 * rendered: it was taken off About on review because the breadcrumb
 * directly above already names the page, and the other pages follow
 * About so the set stays consistent.
 */
export function DarkHero({
  image,
  video,
  position = 'center',
  heightClass,
  crumbs,
  title,
  accent,
  intro,
  actions,
  below,
}: {
  image: string
  /** Optional looping clip over `image`. The image doubles as its poster,
   *  so the hero is never blank while the clip loads, and it is all that
   *  shows under prefers-reduced-motion. */
  video?: string
  position?: string
  /** Literal Tailwind min-height classes, e.g. "min-h-[564px] lg:min-h-[640px]". */
  heightClass: string
  crumbs: Crumb[]
  title: ReactNode
  accent?: ReactNode
  /** Optional — the About Us banner runs without one (13 Oct). */
  intro?: ReactNode
  actions?: ReactNode
  /** An extra row under the actions — the sector pills on the industry pages. */
  below?: ReactNode
}) {
  return (
    <section className={cx('relative flex overflow-hidden bg-[#242624]', heightClass)}>
      <img
        src={image}
        alt=""
        aria-hidden
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      {video && (
        <video
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          style={{ objectPosition: position }}
        />
      )}
      {/* The reference's hero is a flat charcoal plate. Over a photograph
          that becomes a scrim, and it has to answer to two things at once:
          the copy needs charcoal behind it, and the photograph needs to
          still be a photograph.

          Desktop: charcoal behind the copy on the left, opening to ~20% on
          the right where every one of these images keeps its subject. A
          uniform scrim — or the heavy floor gradient this used to carry —
          turned the darker images (the Automotive car, the Industrial
          robots) into a flat black plate.

          Phone: the copy runs the full width, so the scrim is even and
          heavier, with a floor under the buttons. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[rgba(20,22,20,0.74)] lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(20,22,20,0.7)] to-transparent lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(20,22,20,0.94)_0%,rgba(20,22,20,0.84)_38%,rgba(20,22,20,0.45)_68%,rgba(20,22,20,0.2)_100%)] lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-[rgba(20,22,20,0.55)] to-transparent lg:block"
      />

      <div className={cx(FRAME, 'relative flex flex-col justify-end pt-[128px] pb-9 lg:pt-[140px] lg:pb-14')}>
        <div className="flex max-w-[350px] flex-col gap-5 sm:max-w-[640px] lg:max-w-[820px]">
          <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-white/80">
            <Link to={ROUTES.home} className="transition-colors hover:text-lime">
              Home
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={crumb.label}>
                <span aria-hidden> / </span>
                {crumb.to && i < crumbs.length - 1 ? (
                  <Link to={crumb.to} className="transition-colors hover:text-lime">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col gap-5">
            <h1 className="font-display text-[36px] leading-[1.06] font-semibold tracking-[-0.02em] text-white lg:text-[60px]">
              {title}
              {accent && (
                <>
                  {' '}
                  <span className="text-lime">{accent}</span>
                </>
              )}
            </h1>
            {intro && (
              <p className="max-w-[640px] font-body text-[15px] leading-[1.6] text-white/90 lg:text-[18px]">
                {intro}
              </p>
            )}
          </div>

          {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
          {below}
        </div>
      </div>
    </section>
  )
}

/** The sector switcher under the industry heroes. */
export function SectorPills({
  items,
}: {
  items: { label: string; to: string; current: boolean }[]
}) {
  return (
    <nav aria-label="Industries" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          aria-current={item.current ? 'page' : undefined}
          className={cx(
            'rounded-full px-4 py-2 font-body text-[13px] transition-colors duration-300',
            item.current
              ? 'bg-white font-semibold text-ink'
              : 'border border-[#6e706c] text-white/90 hover:border-white hover:text-white',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

/* ------------------------------------------------------------------
   Statement, stats
------------------------------------------------------------------- */

/**
 * The opening band's left/right pair: a large statement under an eyebrow
 * with a short lime rule, beside a stack of numbered points.
 */
export function Statement({
  eyebrow,
  statement,
  points,
}: {
  eyebrow: ReactNode
  statement: ReactNode
  points: string[]
}) {
  return (
    <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex flex-col gap-[22px] lg:w-[460px] lg:shrink-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="font-display text-[21px] leading-[1.4] font-medium tracking-[-0.01em] text-ink lg:text-[27px]">
          {statement}
        </p>
        <span aria-hidden className="h-1 w-16 rounded-full bg-lime" />
      </div>

      <ol className="flex min-w-0 grow flex-col gap-4">
        {points.map((text, i) => (
          <li
            key={i}
            className="flex items-start gap-4 rounded-[20px] bg-surface-mute p-5 lg:gap-6 lg:px-[30px] lg:py-[26px]"
          >
            <span className="pt-0.5 font-mono text-[15px] font-bold text-green-deep">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-body text-[16px] leading-[1.65] text-body">{text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export type Stat = { value: string; accent?: string; label: string }

/** Four figures on grey tiles; two per row on a phone. */
export function StatGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={cx('grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:gap-4', className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 rounded-[20px] bg-surface-mute p-5 lg:p-7">
          {/* <dt> first in the markup, as a description list requires;
              `order-last` puts the label under the figure. */}
          <dt className="order-last font-body text-[14px] leading-[1.5] text-body">{stat.label}</dt>
          <dd className="font-display text-[32px] leading-[1.25] font-semibold tracking-[-0.02em] text-ink lg:text-[44px]">
            {stat.value}
            {stat.accent && <span className="text-green-deep">{stat.accent}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------
   Tags
------------------------------------------------------------------- */

export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-surface-mute px-3 py-1.5 font-body text-[13px] leading-[1.3] text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------
   Cards
------------------------------------------------------------------- */

const CARD = 'rounded-[20px] border-[1.5px] border-line-soft bg-white'

/**
 * Icon, title, one line — optionally a link with the ringed arrow at its
 * foot. The reference's most common card: focus areas, engagement models,
 * reasons to join, the ways to reach us.
 */
export function FeatureCard({
  icon,
  title,
  body,
  link,
  titleClassName,
}: {
  icon: ReactNode
  title: ReactNode
  body: ReactNode
  link?: LinkTarget & { label: string }
  /** For the standards cards, whose title is a 32px code. */
  titleClassName?: string
}) {
  return (
    <article className={cx(CARD, 'flex h-full flex-col gap-3.5 p-[22px] lg:p-7')}>
      <IconTile tone="tint">{icon}</IconTile>
      <h3
        className={cx(
          'font-display font-semibold text-ink',
          titleClassName ?? 'text-[19px] leading-[1.3]',
        )}
      >
        {title}
      </h3>
      <p className="font-body text-[14px] leading-[1.6] text-body">{body}</p>
      {link && (
        <SmartLink
          to={link.to}
          href={link.href}
          className="group mt-auto flex items-center gap-2.5 pt-1.5 font-body text-[14px] font-medium text-ink"
        >
          {link.label}
          <ArrowCircle />
        </SmartLink>
      )}
    </article>
  )
}

/**
 * Capabilities as icon chips, two to a row from tablet up (one on a
 * phone), each with an icon matched to its label (data/capabilityIcons.ts).
 * Shared by the solution rows and the service-line cards (14 Oct).
 * The chips are information, not links.
 */
export function CapabilityChips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx('grid gap-3 sm:grid-cols-2', className)}>
      {items.map((item) => {
        const Icon = capabilityIcon(item)
        return (
          <li
            key={item}
            className="flex items-center gap-3 rounded-[14px] border border-line-soft bg-white py-3 pr-3 pl-3 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors duration-200 hover:border-green-deep/30"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-lime-tint text-green-deep"
            >
              <Icon strokeWidth={1.8} className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 grow font-body text-[14px] leading-[1.35] font-medium text-ink">
              {item}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/** Title beside its icon, a line, then the service tags — Capabilities. */
export function ServiceCard({
  icon,
  title,
  body,
  tags,
}: {
  icon: ReactNode
  title: string
  body: string
  tags: string[]
}) {
  return (
    <article className={cx(CARD, 'flex h-full flex-col gap-3.5 p-[22px] lg:p-8')}>
      <div className="flex items-center gap-4">
        <IconTile tone="tint">{icon}</IconTile>
        <h3 className="font-display text-[20px] leading-[1.3] font-semibold text-ink">{title}</h3>
      </div>
      <p className="font-body text-[15px] leading-[1.6] text-body">{body}</p>
      {/* 14 Oct: icon chips instead of grey pills, as on the industry pages. */}
      <CapabilityChips items={tags} className="pt-1" />
    </article>
  )
}

/** A sector: photograph, name, line, ringed arrow. The whole card links. */
export function SectorCard({
  image,
  imageLabel,
  title,
  body,
  to,
}: {
  image?: string
  imageLabel: string
  title: string
  body: string
  to: string
}) {
  return (
    <Link
      to={to}
      className={cx(
        CARD,
        'group flex h-full flex-col gap-4 p-3 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] lg:p-3.5',
      )}
    >
      <span className="block overflow-hidden rounded-[14px]">
        <ImageSlot
          src={image}
          label={imageLabel}
          className="h-[200px] w-full rounded-[14px] transition-transform duration-500 group-hover:scale-105 lg:h-[260px]"
        />
      </span>
      <span className="flex items-start justify-between gap-4 px-1.5 pb-1.5">
        <span className="flex flex-col gap-1.5">
          <span className="font-display text-[19px] leading-[1.25] font-semibold text-ink">{title}</span>
          <span className="font-body text-[14px] leading-[1.55] text-body">{body}</span>
        </span>
        <ArrowCircle />
      </span>
    </Link>
  )
}

export type ProductTileData = {
  slug: string
  name: string
  category: string
  blurb: string
  image?: string
  imageAlt?: string
}

/**
 * A product. White at rest; turns to the charcoal the reference draws on
 * its first card when hovered or focused — that card is the state, drawn
 * statically, so here every card has it.
 */
export function ProductTile({ product }: { product: ProductTileData }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex h-full flex-col gap-3 rounded-[18px] border-[1.5px] border-line-soft bg-white p-4 transition-colors duration-300 hover:border-[#101211] hover:bg-[#101211] focus-visible:border-[#101211] focus-visible:bg-[#101211]"
    >
      {product.image ? (
        <span className="flex h-[150px] items-center justify-center rounded-[12px] bg-surface-mute p-3 lg:h-[160px]">
          <img
            src={product.image}
            alt={product.imageAlt ?? product.name}
            decoding="async"
            className="max-h-full w-auto object-contain"
          />
        </span>
      ) : (
        <ImageSlot label="Product image" className="h-[150px] w-full rounded-[12px] lg:h-[160px]" />
      )}
      <span className="font-mono text-[11px] tracking-[0.08em] text-body uppercase transition-colors duration-300 group-hover:text-white/80 group-focus-visible:text-white/80">
        {product.category}
      </span>
      <span className="flex items-center justify-between gap-2">
        <span className="font-display text-[17px] leading-[1.25] font-semibold text-ink transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
          {product.name}
        </span>
        <span className="relative inline-flex">
          <span className="transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
            <ArrowCircle />
          </span>
          <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowCircle tone="white" />
          </span>
        </span>
      </span>
      <span className="font-body text-[13px] leading-[1.55] text-body transition-colors duration-300 group-hover:text-white/80 group-focus-visible:text-white/80">
        {product.blurb}
      </span>
    </Link>
  )
}

/**
 * The lime-tinted tile that closes a product grid with an onward link.
 * Full height, so it matches the product cards in its row rather than
 * sitting short beside them.
 */
export function MoreTile({ label, to, href }: LinkTarget & { label: string }) {
  return (
    <SmartLink
      to={to}
      href={href}
      className="group flex h-full min-h-[120px] flex-col justify-between gap-4 rounded-[18px] border-[1.5px] border-[#ddebc0] bg-lime-tint p-6 text-ink"
    >
      <span className="font-display text-[22px] leading-[1.25] font-semibold">{label}</span>
      <ArrowCircle />
    </SmartLink>
  )
}

/* ------------------------------------------------------------------
   Solutions, alternating
------------------------------------------------------------------- */

export type SolutionRowData = {
  title: string
  description: string
  items: string[]
  icon: ReactNode
  image?: string
  imageLabel: string
}

/**
 * Splits a solution title for its two-tone heading: everything after the
 * last " & " is the green accent ("Electrification & | Powertrain
 * Systems"); a title with no ampersand accents its last word.
 */
function splitTitle(title: string): [string, string] {
  const amp = title.lastIndexOf(' & ')
  if (amp > 0) return [title.slice(0, amp + 3), title.slice(amp + 3)]
  const sp = title.lastIndexOf(' ')
  return sp > 0 ? [title.slice(0, sp + 1), title.slice(sp + 1)] : ['', title]
}

/**
 * One solution: a 380px photograph beside a 560px column of copy, the
 * sides swapping on alternate rows. On a phone the photograph always leads.
 *
 * 14 Oct restyle, site-wide (industry pages and Technologies): two-tone
 * heading, a "Capabilities" divider, and the capabilities as icon chips —
 * two to a row from tablet up (one on a phone) — each with an icon matched to its label
 * (data/capabilityIcons.ts). The chips are information, not links; the
 * chevron is the reference's ornament and is hidden from assistive tech.
 */
export function SolutionRow({ solution, flip }: { solution: SolutionRowData; flip: boolean }) {
  const [lead, accent] = splitTitle(solution.title)
  return (
    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
      <ImageSlot
        src={solution.image}
        label={solution.imageLabel}
        className={cx(
          'h-[220px] w-full min-w-0 rounded-[24px] lg:h-[400px] lg:grow',
          flip && 'lg:order-last',
        )}
      />
      <div className="flex flex-col justify-center gap-4 lg:w-[680px] lg:shrink-0">
        <IconTile tone="tint">{solution.icon}</IconTile>
        <h3 className="font-display text-[24px] leading-[1.15] font-semibold text-ink lg:text-[32px]">
          {lead}
          <span className="text-green-deep">{accent}</span>
        </h3>
        <p className="font-body text-[16px] leading-[1.6] text-body lg:text-[17px]">
          {solution.description}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <p className="font-mono text-[12px] tracking-[0.12em] text-green-deep uppercase">
            Capabilities
          </p>
          <span aria-hidden className="h-[2px] w-8 rounded-full bg-lime" />
          <span aria-hidden className="h-px grow bg-line" />
        </div>
        <CapabilityChips items={solution.items} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Dark band, steps
------------------------------------------------------------------- */

/**
 * The inset charcoal panel: 24px in from the page edge and rounded on
 * desktop, edge to edge on a phone. The reference's hatched plate is a
 * photograph slot, so it gets one — the same dark engineering texture on
 * every band, under a scrim heavy enough that the band reads as a surface
 * rather than a picture.
 */
export function DarkBand({
  children,
  image = approachBackdrop,
  className,
}: {
  children: ReactNode
  image?: string
  className?: string
}) {
  return (
    <section className="mx-auto max-w-[1440px] lg:p-6">
      <div className="relative overflow-hidden bg-[#242624] lg:rounded-[28px]">
        <img
          src={image}
          alt=""
          aria-hidden
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-[rgba(20,22,20,0.78)]" />
        <div
          className={cx(
            'relative flex flex-col gap-7 px-5 py-14 md:px-10 lg:gap-10 lg:px-14 lg:py-[72px]',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

/**
 * Numbered stages on dark glass — the lifecycle, the validation levels,
 * the hiring steps. Two to a row on desktop, one on a phone.
 *
 * A step with an `icon` shows it inside the lime ring; one without keeps
 * the plain lime dot.
 */
export function StepGrid({
  steps,
}: {
  steps: { title: string; sub: string; icon?: LucideIcon }[]
}) {
  return (
    <ol className="grid gap-3 lg:grid-cols-2">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex items-center gap-3.5 rounded-[18px] border border-[#3a3c3a] bg-black/70 px-4 py-3.5 lg:gap-[18px] lg:px-[22px] lg:py-4"
        >
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lime text-lime"
          >
            {step.icon ? (
              <step.icon strokeWidth={1.75} className="h-5 w-5" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-lime" />
            )}
          </span>
          <span className="flex grow flex-col gap-0.5">
            <span className="font-display text-[17px] leading-[1.25] font-semibold text-white lg:text-[19px]">
              {step.title}
            </span>
            <span className="font-body text-[13px] text-white/70">{step.sub}</span>
          </span>
          <span className="border-l border-[#3a3c3a] pl-3.5 font-mono text-[20px] font-bold text-lime lg:pl-5 lg:text-[26px]">
            {String(i + 1).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------------------------------------------
   Filters
------------------------------------------------------------------- */

/** Rounded filter chips: lime when chosen, a hairline outline otherwise. */
export function ChipFilter({
  options,
  value,
  onChange,
  label,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cx(
              'rounded-full px-[18px] py-2.5 font-body text-[14px] transition-colors duration-300',
              active
                ? 'border-[1.5px] border-lime bg-lime text-ink'
                : 'border-[1.5px] border-line-soft text-ink hover:border-green-deep',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

/** Pill-shaped search input — the reference's 320 x 44 field. */
export function PillSearch({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
}) {
  const id = useId()
  return (
    <div className="relative w-full sm:w-[320px]">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-full border-[1.5px] border-line-soft bg-white px-[18px] font-body text-[13px] text-ink placeholder:text-body focus:border-green-deep focus:outline-none"
      />
    </div>
  )
}

/* ------------------------------------------------------------------
   Closing plate
------------------------------------------------------------------- */

/** Site-wide closing CTA is temporarily hidden. */
export function CtaPlate(_props: {
  title?: string
  body?: string
}) {
  return null
}
