import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cx } from '../lib/cx'
import { logoLucasTvs } from '../lib/assets'
import { NAV, ROUTES } from '../lib/routes'
import { useScrolled } from '../lib/useScrolled'
import { MEGA_BY_ROUTE, useMegaMenu } from '../lib/useMegaMenu'
import { MegaNavItem } from './site/MegaMenu'

/**
 * The header links, flattened from the site-wide `NAV` in lib/routes.ts.
 *
 * That list is the wireframe sitemap — About · Capabilities · Products ·
 * Industries · Quality · Insights · Careers — and it is what the inner
 * pages' header renders too, so the two can't disagree. Products and
 * Industries open the same mega menus the inner header does (30 Sep; see
 * site/MegaMenu.tsx); the rest are plain links. The mobile sheet stays a
 * flat list — the landing pages carry the child links one tap later.
 */
const LINKS = NAV.map((item) => ({ label: item.label, to: item.to }))

/**
 * Home3-only replacement for `SiteHeader`. Same markup and behaviour —
 * only the skin changes: the white plate becomes a dark blurred glass bar
 * so it reads against Home3's dark video hero, with white nav text and a
 * white-knocked-out logo (`brightness-0 invert` rather than a second
 * asset, so there's one logo file to keep in sync).
 *
 * 29 Sep: the links now go somewhere. They were `#about`-style anchors
 * into the homepage; with the inner pages built they resolve to those
 * pages, per the sitemap. Rendered with react-router's `Link` so the
 * navigation is client-side and Lenis keeps its state, rather than a full
 * reload.
 *
 * 30 Sep: sticky, and white once scrolled — the same behaviour as the
 * inner pages' header. Fixed to the viewport throughout; over the hero at
 * the top of the page it is the dark glass bar it always was, and past
 * 60px of scroll it turns solid white with dark type, the logo in its own
 * colours, and a lime CTA in place of the white one (which would vanish on
 * white).
 */
export function SiteHeaderHome3() {
  const [open, setOpen] = useState(false)
  const solid = useScrolled()
  const mega = useMegaMenu()

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[padding] duration-300',
        solid ? 'pt-3' : 'pt-4',
      )}
    >
      <div className="shell">
        <nav
          className={cx(
            'relative flex items-center gap-6 rounded-[10px] border px-6 py-3 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 lg:px-8',
            solid
              ? 'border-line-soft bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
              : 'border-white/10 bg-black/40',
          )}
        >
          {/* The logo and CTA sides grow equally (flex-1 basis-0) so the links
              land on the bar's true centre despite the sides' unequal widths.
              Flex, not absolute/translate: the mega panels are positioned
              against the <nav>, and a positioned <ul> would squash them. */}
          <div className="flex shrink-0 xl:flex-1 xl:basis-0">
            <Link to={ROUTES.home} className="shrink-0" aria-label="Lucas-TVS home">
              <img
                src={logoLucasTvs}
                alt="Lucas-TVS"
                width={480}
                height={138}
                className={cx(
                  'h-[38px] w-auto transition-[filter] duration-300 lg:h-[49px]',
                  !solid && 'brightness-0 invert',
                )}
              />
            </Link>
          </div>

          <ul className="hidden shrink-0 items-center gap-10 xl:flex">
            {LINKS.map((item) => {
              const id = MEGA_BY_ROUTE[item.to]
              const open = id !== undefined && mega.openId === id
              const tone = cx(
                'font-body text-[15px] leading-[1.25] transition-colors duration-300',
                solid
                  ? cx('hover:text-green-ink', open ? 'text-green-ink' : 'text-ink')
                  : cx('hover:text-lime', open ? 'text-lime' : 'text-white/85'),
              )
              return id ? (
                <MegaNavItem key={item.to} id={id} label={item.label} mega={mega} className={tone} />
              ) : (
                <li key={item.to}>
                  <Link to={item.to} className={tone}>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* The site-wide `Button` primitive is a plain <a>, so the CTA is a
              `Link` carrying the same classes. White over the dark bar, lime
              once the bar turns white — a white pill on white would vanish.
              The focus ring follows: white on dark, ink on white. */}
          <div className="ml-auto flex items-center justify-end gap-3 lg:gap-4 xl:flex-1 xl:basis-0">
            {/* Site search (30 Oct, launch audit): /search existed but had no
                way in. An icon rather than a nav item, so the bar's four
                links stay as reviewed. */}
            <Link
              to={ROUTES.search}
              aria-label="Search the site"
              className={cx(
                'grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2',
                solid
                  ? 'border-line text-ink hover:text-green-ink focus-visible:outline-ink'
                  : 'border-white/25 text-white hover:text-lime focus-visible:outline-white',
              )}
            >
              <Search aria-hidden strokeWidth={2} className="h-[18px] w-[18px]" />
            </Link>

            <Link
              to={ROUTES.contact}
              className={cx(
                'hidden items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap text-ink-slate shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex',
                solid ? 'bg-lime focus-visible:outline-ink' : 'bg-white focus-visible:outline-white',
              )}
            >
              Talk to Engineering
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cx(
                'grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 xl:hidden',
                solid ? 'border-line' : 'border-white/25',
              )}
            >
              <span className="relative block h-[14px] w-[18px]">
                {[0, 6, 12].map((y, i) => (
                  <span
                    key={y}
                    className={cx(
                      'absolute left-0 h-[2px] w-full rounded transition-all duration-200',
                      solid ? 'bg-ink' : 'bg-white',
                      open && i === 0 && 'top-[6px] rotate-45',
                      open && i === 1 && 'opacity-0',
                      open && i === 2 && 'top-[6px] -rotate-45',
                    )}
                    style={open ? undefined : { top: y }}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <ul
            className={cx(
              'mt-2 grid gap-1 rounded-[10px] border p-4 shadow-lg backdrop-blur-md xl:hidden',
              // black/90 + full-white links (were black/80 + white/85): the
              // sheet opens over the hero video, and the links read faint
              // against its brighter frames (launch audit).
              solid ? 'border-line-soft bg-white' : 'border-white/10 bg-black/90',
            )}
          >
            {LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cx(
                    'block rounded-lg px-3 py-2.5 font-body text-[15px]',
                    solid
                      ? 'text-ink hover:bg-surface-mute hover:text-green-ink'
                      : 'text-white hover:bg-white/10 hover:text-lime',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to={ROUTES.contact}
                onClick={() => setOpen(false)}
                className={cx(
                  'inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap text-ink-slate shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2',
                  solid ? 'bg-lime focus-visible:outline-ink' : 'bg-white focus-visible:outline-white',
                )}
              >
                Talk to Engineering
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
