import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { logoLucasTvs } from '../../lib/assets'
import { NAV, ROUTES } from '../../lib/routes'
import { useScrolled } from '../../lib/useScrolled'
import { FRAME } from './design'
import { MEGA_BY_ROUTE, PRODUCT_SECTOR_LINKS, useMegaMenu } from '../../lib/useMegaMenu'
import { MegaNavItem } from './MegaMenu'

/**
 * The mobile sheet's state: closed on navigation and on Escape, with page
 * scroll locked while it is open.
 */
function useMenus() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  // Close the sheet on navigation — without this the mobile sheet stays
  // open over the page it just navigated to.
  //
  // Adjusted during render rather than in an effect. An effect would paint
  // the new page once with the sheet still over it and then close it, and
  // it also covers back/forward, which a close-on-click handler would miss.
  // The query counts too: /products?sector=… from /products is still a
  // navigation, and the sheet should get out of its way.
  const [lastPath, setLastPath] = useState(pathname + search)
  if (lastPath !== pathname + search) {
    setLastPath(pathname + search)
    setOpen(false)
  }

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** A section counts as current when the URL is in its subtree. */
  const isActive = (item: { to: string }) =>
    pathname === item.to || pathname.startsWith(`${item.to}/`)

  return { open, setOpen, isActive }
}

/**
 * Header for every inner page.
 *
 * Every designed inner page in the 29 Sep reference opens on a full-bleed
 * dark photograph with this bar floating over its top edge: dark glass,
 * white type, the current section marked by a lime underline, a white
 * "Talk to Engineering" pill. It is the Home3 header's treatment carried
 * through to the inner pages, which is presumably the point.
 *
 * Against the reference:
 *
 *   - The reference draws the logo as a "Lucas TVS" text box. That is a
 *     wireframe stand-in; the real logo is used, knocked out to white the
 *     way Home3 does it.
 *   - Parents render as plain links, as drawn — except Products and
 *     Industries, which open mega menus (30 Sep; see MegaMenu.tsx). The
 *     mobile sheet lists the children instead, Products' sector ranges
 *     included.
 *   - Below `xl` the links collapse behind the reference's round lime menu
 *     button.
 *
 * Sticky, and white once scrolled (30 Sep). It is fixed to the top of the
 * viewport throughout — at the top of the page that looks exactly like the
 * bar sitting on the hero, since the hero is under it either way. Past
 * 60px of scroll it turns into a solid white bar: dark type, the logo in
 * its own colours rather than knocked out, the current section in green,
 * and a lime CTA, since a white pill would vanish on a white bar. The mobile
 * sheet follows the same tone. Home3's header does the same.
 */
export function SiteHeader() {
  const { open, setOpen, isActive } = useMenus()
  const solid = useScrolled()
  const mega = useMegaMenu()

  /** Link colours for the bar, shared by plain links and mega triggers. */
  const linkClass = (active: boolean, open = false) =>
    cx(
      'border-b-2 py-1 font-body text-[15px] transition-colors duration-300',
      active
        ? solid
          ? 'border-green-deep font-semibold text-green-deep'
          : 'border-lime font-semibold text-white'
        : solid
          ? cx('border-transparent hover:text-green-deep', open ? 'text-green-deep' : 'text-ink')
          : cx('border-transparent hover:text-lime', open ? 'text-lime' : 'text-white/90'),
    )

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[padding] duration-300',
        solid ? 'pt-3' : 'pt-5',
      )}
    >
      <div className={FRAME}>
        <nav
          aria-label="Primary"
          className={cx(
            'relative flex h-[60px] items-center justify-between gap-6 rounded-[16px] border pr-2.5 pl-3 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 lg:h-[72px] lg:rounded-[18px] lg:pr-3 lg:pl-4',
            solid
              ? 'border-line-soft bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
              : 'border-[#3a3c3a] bg-[rgba(16,18,17,0.72)]',
          )}
        >
          {/* Both sides grow equally so the links sit on the bar's true centre. */}
          <div className="flex shrink-0 xl:flex-1 xl:basis-0">
            <Link to={ROUTES.home} className="shrink-0 py-1" aria-label="Lucas-TVS home">
              <img
                src={logoLucasTvs}
                alt="Lucas-TVS"
                className={cx(
                  'h-[34px] w-auto transition-[filter] duration-300 lg:h-[42px]',
                  !solid && 'brightness-0 invert',
                )}
              />
            </Link>
          </div>

          <ul className="hidden shrink-0 items-center gap-10 xl:flex">
            {NAV.map((item) => {
              const id = MEGA_BY_ROUTE[item.to]
              return id ? (
                <MegaNavItem
                  key={item.label}
                  id={id}
                  label={item.label}
                  mega={mega}
                  className={linkClass(isActive(item), mega.openId === id)}
                />
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    aria-current={isActive(item) ? 'page' : undefined}
                    className={cx('block', linkClass(isActive(item)))}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center justify-end gap-3 xl:flex-1 xl:basis-0">
            <Link
              to={ROUTES.contact}
              className={cx(
                'hidden rounded-full px-[22px] py-3 font-body text-[15px] font-medium whitespace-nowrap text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex',
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
              className="grid h-11 w-11 place-items-center rounded-full bg-lime xl:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                {[0, 6, 12].map((y, i) => (
                  <span
                    key={y}
                    className={cx(
                      'absolute left-0 h-[2px] w-full rounded bg-ink transition-all duration-200',
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
          <div
            className={cx(
              'mt-2 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-[16px] border p-4 backdrop-blur-md xl:hidden',
              solid
                ? 'border-line-soft bg-white shadow-[0_18px_44px_rgba(0,0,0,0.12)]'
                : 'border-[#3a3c3a] bg-[rgba(16,18,17,0.94)]',
            )}
          >
            <ul className="grid gap-1">
              {NAV.map((item) => {
                // Products' sector ranges, only while its mega menu is on.
                const children =
                  item.children ??
                  (MEGA_BY_ROUTE[item.to] === 'products' ? PRODUCT_SECTOR_LINKS : undefined)
                return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={cx(
                      'block rounded-lg px-3 py-3 font-body text-[15px] font-medium transition-colors',
                      solid
                        ? isActive(item)
                          ? 'bg-lime-tint text-green-deep'
                          : 'text-ink hover:bg-surface-mute'
                        : isActive(item)
                          ? 'bg-white/10 text-lime'
                          : 'text-white hover:bg-white/10',
                    )}
                  >
                    {item.label}
                  </Link>
                  {children && (
                    <ul
                      className={cx(
                        'mt-1 mb-2 ml-3 grid gap-0.5 border-l pl-3',
                        solid ? 'border-line-soft' : 'border-white/15',
                      )}
                    >
                      {children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className={cx(
                              'block rounded-lg px-3 py-3 font-body text-[14px] transition-colors',
                              solid
                                ? 'text-body hover:bg-surface-mute hover:text-ink'
                                : 'text-white/75 hover:bg-white/10 hover:text-white',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                )
              })}
            </ul>
            <Link
              to={ROUTES.contact}
              className={cx(
                'mt-3 flex w-full items-center justify-center rounded-full px-6 py-3.5 font-body text-[15px] font-medium text-ink',
                solid ? 'bg-lime' : 'bg-white',
              )}
            >
              Talk to Engineering
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
