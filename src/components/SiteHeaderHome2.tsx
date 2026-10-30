import { useEffect, useState } from 'react'
import { Button } from './primitives'
import { cx } from '../lib/cx'
import { logoLucasTvs } from '../lib/assets'

const NAV = [
  'About',
  'Capabilities',
  'Products',
  'Industries',
  'Quality',
  'Global',
  'Insights',
  'Careers',
]

/**
 * Home2-only replacement for `SiteHeader`. Same markup and behaviour —
 * only the skin changes: the white plate becomes a dark blurred glass bar
 * so it reads against Home2's dark video hero, with white nav text and a
 * white-knocked-out logo (`brightness-0 invert` rather than a second
 * asset, so there's one logo file to keep in sync).
 */
export function SiteHeaderHome2() {
  const [open, setOpen] = useState(false)

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-4">
      <div className="shell">
        <nav className="flex items-center gap-6 rounded-[10px] border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md lg:px-8">
          <a href="#" className="shrink-0" aria-label="Lucas-TVS home">
            <img
              src={logoLucasTvs}
              alt="Lucas-TVS"
              className="h-[38px] w-auto brightness-0 invert lg:h-[49px]"
            />
          </a>

          <ul className="ml-4 hidden flex-1 items-center gap-7 xl:flex">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-body text-[15px] leading-[1.25] text-white/85 transition-colors hover:text-lime-light"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* White rather than the site-wide lime solid: the Home2 header is
              a dark blurred bar, and `!` is needed because `bg-white` and
              `bg-lime` are both plain utilities — class order in the
              attribute wouldn't decide the winner. The focus ring flips to
              white too; the default `outline-ink` would sit on the dark bar
              and all but disappear. */}
          <Button className="ml-auto !hidden !bg-white !px-8 !py-3.5 focus-visible:!outline-white lg:!inline-flex">
            Talk to Engineering
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/25 xl:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              {[0, 6, 12].map((y, i) => (
                <span
                  key={y}
                  className={cx(
                    'absolute left-0 h-[2px] w-full rounded bg-white transition-all duration-200',
                    open && i === 0 && 'top-[6px] rotate-45',
                    open && i === 1 && 'opacity-0',
                    open && i === 2 && 'top-[6px] -rotate-45',
                  )}
                  style={open ? undefined : { top: y }}
                />
              ))}
            </span>
          </button>
        </nav>

        {open && (
          <ul className="mt-2 grid gap-1 rounded-[10px] border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-md xl:hidden">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-body text-[15px] text-white/85 hover:bg-white/10 hover:text-lime-light"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Button className="w-full !bg-white focus-visible:!outline-white">
                Talk to Engineering
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
