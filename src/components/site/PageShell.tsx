import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { useHeadingBlurIn } from '../../lib/useHeadingBlurIn'
import { HOME_TITLE, useRouteHead } from '../../lib/seo'

/**
 * The frame every inner page renders inside: header, the page's own
 * sections, footer.
 *
 * It also owns the two behaviours that have to be page-wide rather than
 * per-section:
 *
 *   - the homepage's word-by-word heading blur-in, re-armed on every
 *     navigation so a second page's headings animate like the first's,
 *   - scroll reset on navigation. React Router leaves the scroll position
 *     alone, and Lenis holds its own position independent of the DOM, so
 *     without this a click from the bottom of one page lands halfway down
 *     the next.
 *
 * `title` sets document.title. Pages pass the bare page name; the suffix
 * is added here so it stays consistent. The rest of the head — meta
 * description, canonical, Open Graph, robots — follows the route via
 * `useRouteHead` (src/lib/seo.ts), matching what the build prerenders into
 * each route's HTML.
 */
export function PageShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const contentRef = useRef<HTMLElement>(null)
  const { pathname, hash, key } = useLocation()
  const lenis = useLenis()

  useHeadingBlurIn(contentRef, pathname)

  useEffect(() => {
    // Put the homepage title back on the way out. The homepage sets no
    // title of its own, so without this, following the logo from an inner
    // page left the tab reading "About Us — Lucas-TVS" over the homepage.
    // (It used to restore "whatever was there before", which stopped
    // working once each route's HTML was prerendered with its own <title>:
    // landing on /about and then going home put "About Us" back.)
    document.title = `${title} — Lucas-TVS`
    return () => {
      document.title = HOME_TITLE
    }
  }, [title])

  // After the title effect, so an unknown path (the 404 page) can reuse
  // the title just set for its og:title.
  useRouteHead(pathname)

  useEffect(() => {
    // Lenis owns the scroll position; setting window.scrollTo alone leaves
    // it convinced the page is still where it was, and the next wheel event
    // snaps back. `immediate` skips the easing — a navigation should land
    // at the top, not glide there.
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  // A #hash — arriving at `/technologies#electrification`, or an in-page
  // link like "Explore Products" — lands on that section. Separate from the
  // reset above so an in-page jump doesn't first bounce to the top, and
  // deferred a tick so a freshly navigated page's markup exists. Keyed on
  // the navigation too, so following the same #hash again — say, a second
  // sector from the Products mega menu, /products?sector=…#explore, while
  // already there — scrolls again rather than doing nothing.
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      // Land 104px below the top so the pinned header (12px inset + a 72px
      // bar) doesn't cover the section. Worked out as an absolute position
      // for both paths: on a first load Lenis may not exist yet, and the
      // fallback used to be scrollIntoView, which ignored the offset.
      const y = target.getBoundingClientRect().top + window.scrollY - 104
      if (lenis) lenis.scrollTo(y, { immediate: true })
      else window.scrollTo(0, y)
    }, 0)
    return () => clearTimeout(id)
  }, [pathname, hash, key, lenis])

  return (
    <div className="relative min-h-dvh bg-white">
      <SiteHeader />
      {/*
        `key={pathname}` forces a fresh subtree on every navigation, and it
        is load-bearing rather than defensive.

        The blur-in works by wrapping each heading word in a span — it
        mutates DOM that React owns — and its cleanup puts the original
        markup back. Where a navigation swaps one page component for
        another that is harmless, because the old nodes are discarded. But
        three of these routes are parameterised (`/industries/:slug`,
        `/products/:slug`, `/insights/:slug`), and moving between two of
        their params keeps the same component mounted, so React reuses the
        very <h1> the cleanup is about to overwrite. Automotive's headline
        appeared on the Industrial page exactly this way.

        Keying on the path makes the parameterised routes behave like every
        other navigation: old tree out, new nodes in, nothing to clobber.

        The ref sits on <main> rather than the outer div so the wrap only
        covers page content — the footer's column headings are <h2>s too,
        and they neither need the effect nor should replay it on each
        navigation.
      */}
      <main key={pathname} ref={contentRef}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
