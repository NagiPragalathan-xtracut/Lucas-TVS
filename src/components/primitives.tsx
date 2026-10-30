import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '../lib/cx'
import { AppLink } from './AppLink'

/** Small uppercase/coloured kicker that sits above most section headings. */
export function Eyebrow({
  children,
  className,
  tone = 'lime',
}: {
  children: ReactNode
  className?: string
  tone?: 'lime' | 'green'
}) {
  return (
    <p
      className={cx(
        'font-sans text-[16px] leading-[1.25] font-medium',
        // 'green' is for light surfaces: green-ink clears WCAG AA there (5.4:1),
        // where lime (1.46:1) and plain green (2.28:1) do not.
        tone === 'lime' ? 'text-lime-light' : 'text-green-ink',
        className,
      )}
    >
      {children}
    </p>
  )
}

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: 'solid' | 'outline' | 'ghost'
}

/**
 * Pill button. `solid` is the lime primary used across the page.
 *
 * Renders through AppLink, so an internal href ("/contact") navigates
 * client-side and an external one opens in a new tab. The default "#" is a
 * plain anchor, exactly as before.
 */
export function Button({
  variant = 'solid',
  className,
  children,
  href = '#',
  ...rest
}: ButtonProps) {
  return (
    <AppLink
      href={href}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4',
        'font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap',
        'transition-transform duration-200 hover:-translate-y-0.5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        variant === 'solid' &&
          'bg-lime text-white shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)]',
        variant === 'outline' &&
          'border-2 border-white text-white shadow-[0_4px_4px_0_rgba(211,211,211,0.25)]',
        variant === 'ghost' && 'border border-line bg-white text-ink-slate',
        className,
      )}
      {...rest}
    >
      {children}
    </AppLink>
  )
}

/**
 * The lime "»" pill that appears on the R&D cards, insight cards and the
 * dark discover bar. Rendered as vector so it stays crisp at any size.
 */
export function ChevronPill({
  className,
  iconClassName = 'h-[13px] w-[13px]',
  label = 'Read more',
}: {
  className?: string
  iconClassName?: string
  label?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex h-[26px] w-[52px] shrink-0 items-center justify-center rounded-full bg-lime',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <ChevronDoubleRight className={cx('text-white', iconClassName)} />
    </span>
  )
}

export function ChevronDoubleRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 5l7 7-7 7M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 12h15m0 0l-6-6m6 6l-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Horizontal auto-scrolling strip. Children are rendered twice so the
 * -50% keyframe loops seamlessly; the duplicate is hidden from a11y.
 */
export function Marquee({
  children,
  speed = 'normal',
  className,
}: {
  children: ReactNode
  speed?: 'normal' | 'slow'
  className?: string
}) {
  return (
    <div className={cx('overflow-hidden pause-on-hover', className)}>
      <div
        className={cx(
          'flex w-max',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
