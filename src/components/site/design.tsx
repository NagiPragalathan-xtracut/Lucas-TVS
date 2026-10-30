import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

/* ------------------------------------------------------------------
   Phase 1 design primitives

   The 29 Sep reference ("Lucas-TVS Phase 1 Wireframes (2)") draws every
   inner page from one small vocabulary: a 1440 artboard with 80px
   margins, mono eyebrows, 44px section headings with a coloured second
   phrase, pill buttons, and hatched plates standing in for photographs.
   These are those pieces, sized to the reference's desktop and mobile
   artboards, so each page built to it only has to arrange them.

   Typefaces: the reference is drawn in Plus Jakarta Sans and Space Mono,
   which the site does not load. Headings use the homepage's display face
   (Instrument Sans) and eyebrows its mono (IBM Plex Mono) instead, at the
   reference's sizes, weights and tracking — so the pages match the drawing
   in every measurement and still match the homepage in voice. Switching to
   the reference faces is two font-family changes in index.css plus the
   @fontsource imports at its top; nothing here would need to move.

   Colours: the reference's hexes are close approximations of the brand
   tokens (#B8E62E ≈ lime, #2E7D1F ≈ green-deep, #F5F5F3 ≈ surface-mute,
   #F2F8E4 ≈ lime-tint), so the tokens are used. Only the dark-glass
   greys, which have no token, are written out.
------------------------------------------------------------------- */

/** The artboard: 1440 wide, 80px margins; 40px at tablet, 20px on a phone. */
export const FRAME = 'mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20'

/** Vertical rhythm of a standard band: 96px desktop, 56px mobile. */
export const BAND = 'py-14 lg:py-24'

/** Mono uppercase eyebrow. `tone` follows the surface it sits on. */
export function Eyebrow({
  children,
  tone = 'green',
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'lime' | 'light'
  className?: string
}) {
  return (
    <p
      className={cx(
        'font-mono text-[12px] tracking-[0.12em] uppercase lg:text-[13px]',
        tone === 'green' && 'text-green-ink',
        tone === 'lime' && 'text-lime-light',
        tone === 'light' && 'text-white/90',
        className,
      )}
    >
      {children}
    </p>
  )
}

/**
 * Section heading: 44px desktop / 30px mobile, medium weight, tight
 * tracking. `accent` is the second phrase the reference sets in colour —
 * green on white, lime on dark.
 */
export function Heading({
  children,
  accent,
  dark = false,
  className,
}: {
  children: ReactNode
  accent?: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <h2
      className={cx(
        'font-display text-[30px] leading-[1.12] font-medium tracking-[-0.01em] lg:text-[44px]',
        dark ? 'text-white' : 'text-ink',
        className,
      )}
    >
      {children}
      {accent && (
        <>
          {' '}
          <span className={dark ? 'text-lime-light' : 'text-green-deep'}>{accent}</span>
        </>
      )}
    </h2>
  )
}

/**
 * The header row most bands open with: eyebrow and heading on the left,
 * a paragraph (and optional actions) in a 440px column on the right, the
 * two bottom-aligned. Stacks on mobile.
 */
export function SplitHeader({
  eyebrow,
  title,
  accent,
  body,
  actions,
  dark = false,
}: {
  eyebrow: ReactNode
  title: ReactNode
  accent?: ReactNode
  body?: ReactNode
  actions?: ReactNode
  /** On a dark band: light eyebrow, white heading, lime accent. */
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:gap-16">
      <div className="flex min-w-0 grow flex-col gap-3.5">
        <Eyebrow tone={dark ? 'light' : 'green'}>{eyebrow}</Eyebrow>
        <Heading accent={accent} dark={dark}>
          {title}
        </Heading>
      </div>
      {(body || actions) && (
        <div className="flex flex-col gap-5 lg:w-[440px] lg:shrink-0">
          {body && (
            <p
              className={cx(
                'font-body text-[15px] leading-[1.65] lg:text-[16px]',
                dark ? 'text-white/80' : 'text-body',
              )}
            >
              {body}
            </p>
          )}
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      )}
    </div>
  )
}

/** Eyebrow + heading, stacked, for bands whose header has no right column. */
export function StackHeader({
  eyebrow,
  title,
  accent,
  dark = false,
}: {
  eyebrow: ReactNode
  title: ReactNode
  accent?: ReactNode
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <Eyebrow tone={dark ? 'light' : 'green'}>{eyebrow}</Eyebrow>
      <Heading accent={accent} dark={dark}>
        {title}
      </Heading>
    </div>
  )
}

/* ------------------------------------------------------------------
   Buttons
------------------------------------------------------------------- */

const PILL =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-[13px] font-body text-[14px] font-medium whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 lg:px-6 lg:text-[15px]'

const PILL_TONE = {
  lime: 'bg-lime text-white hover:scale-[1.03] focus-visible:outline-ink',
  /** White outline, for dark surfaces. */
  outline: 'border-[1.5px] border-white text-white hover:bg-white hover:text-ink focus-visible:outline-white',
  /** White fill with a hairline, for light surfaces. */
  ghost: 'border-[1.5px] border-line-soft bg-white text-ink hover:border-green-deep focus-visible:outline-ink',
} as const

export function Pill({
  children,
  to,
  href,
  tone = 'lime',
  className,
}: {
  children: ReactNode
  to?: string
  href?: string
  tone?: keyof typeof PILL_TONE
  className?: string
}) {
  const cls = cx(PILL, PILL_TONE[tone], className)
  // In-page anchors: a plain link, so the browser scrolls to the target.
  // Through the router a bare hash only changes the URL.
  if (href?.startsWith('#')) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  )
}

/* ------------------------------------------------------------------
   Image slots
------------------------------------------------------------------- */

/**
 * A photograph, or — until one is supplied — the reference's own
 * placeholder for it: a hatched grey plate carrying an image glyph and a
 * label saying what goes there.
 *
 * Rendering the placeholder rather than borrowing a near-enough photo is
 * deliberate. The review rule is "show nothing we cannot back", and the
 * slots left empty here ask for specific things — named people, a named
 * building, logos of named companies — that no stock image can stand in
 * for. Pass `src` and the plate becomes the photograph, at the same size
 * and radius, with nothing else to change.
 *
 * Size and radius come from `className`; the slot fills whatever box it
 * is given.
 */
export function ImageSlot({
  src,
  alt = '',
  label,
  className,
  imgClassName,
  tone = 'light',
}: {
  src?: string
  alt?: string
  label: string
  className?: string
  imgClassName?: string
  /** 'dark' is the reference's charcoal plate, for slots inside dark bands. */
  tone?: 'light' | 'dark'
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        aria-hidden={!alt}
        decoding="async"
        className={cx('object-cover', className, imgClassName)}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`${label} — photograph to come`}
      className={cx(
        'flex flex-col items-center justify-center gap-2 p-3 text-center font-mono text-[12px]',
        tone === 'light'
          ? 'bg-[repeating-linear-gradient(135deg,#d9d9d5_0px,#d9d9d5_14px,#cfcfcb_14px,#cfcfcb_28px)] text-[#5e605c]'
          : 'bg-[repeating-linear-gradient(135deg,#2a2c2a_0px,#2a2c2a_14px,#242624_14px,#242624_28px)] text-[#9a9c97]',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M21 17l-5-5-8 8" />
      </svg>
      <span>{label}</span>
    </div>
  )
}

/** 48px rounded square holding a 22px line icon. */
export function IconTile({
  children,
  tone = 'dark',
}: {
  children: ReactNode
  tone?: 'dark' | 'tint'
}) {
  return (
    <span
      className={cx(
        'grid h-12 w-12 shrink-0 place-items-center rounded-[12px]',
        tone === 'dark' ? 'bg-[#1e211e] text-lime-light' : 'bg-lime-tint text-ink',
      )}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------
   Icons
   Line icons drawn exactly as the reference draws them: 24-unit grid,
   1.6 stroke, round caps. Kept here so the pages carry the reference's
   iconography rather than the nearest match from an icon set.
------------------------------------------------------------------- */

function Svg({ children, size = 22, stroke = 1.6 }: { children: ReactNode; size?: number; stroke?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function IconTarget() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </Svg>
  )
}

export function IconBurst() {
  return (
    <Svg>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M6 18l3-3" />
    </Svg>
  )
}

export function IconShieldCheck() {
  return (
    <Svg>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  )
}

export function IconPeople() {
  return (
    <Svg>
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M16 6a3 3 0 010 6M18 14c2 .7 3 2.5 3 5" />
    </Svg>
  )
}

export function IconClipboardCheck() {
  return (
    <Svg>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4h6v3H9zM9.5 13l2 2 3.5-4" />
    </Svg>
  )
}

export function IconTrend() {
  return (
    <Svg>
      <path d="M4 17l5-5 4 4 7-7" />
      <path d="M15 9h5v5" />
    </Svg>
  )
}

export function IconChat() {
  return (
    <Svg>
      <path d="M4 5h16v11H9l-5 4z" />
    </Svg>
  )
}

export function IconArrowUpRight() {
  return (
    <Svg size={14} stroke={2}>
      <path d="M7 17L17 7M9 7h8v8" />
    </Svg>
  )
}

export function IconCube() {
  return (
    <Svg>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </Svg>
  )
}

export function IconChip() {
  return (
    <Svg>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </Svg>
  )
}

export function IconBoard() {
  return (
    <Svg>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="M13 9h4M7 15h4M15 13v4" />
    </Svg>
  )
}

export function IconCode() {
  return (
    <Svg>
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />
    </Svg>
  )
}

export function IconGauge() {
  return (
    <Svg>
      <path d="M4 16a8 8 0 1116 0" />
      <path d="M12 16l4-5" />
    </Svg>
  )
}

export function IconNetwork() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </Svg>
  )
}

export function IconCar() {
  return (
    <Svg>
      <path d="M5 16h14M6 16l1.5-5h9L18 16M7 16v2M17 16v2" />
      <circle cx="8.5" cy="16" r="1" />
      <circle cx="15.5" cy="16" r="1" />
    </Svg>
  )
}

export function IconBolt() {
  return (
    <Svg>
      <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
    </Svg>
  )
}

export function IconLink() {
  return (
    <Svg>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </Svg>
  )
}

export function IconFactory() {
  return (
    <Svg>
      <path d="M3 20V10l5 3V10l5 3V6h4l1 14z" />
    </Svg>
  )
}

export function IconMedal() {
  return (
    <Svg>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
    </Svg>
  )
}

export function IconPin() {
  return (
    <Svg>
      <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  )
}

export function IconPhone() {
  return (
    <Svg>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Svg>
  )
}

export function IconMail() {
  return (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  )
}

export function IconDocument() {
  return (
    <Svg>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </Svg>
  )
}
