import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cx } from '../../lib/cx'
import { ROUTES, productPath } from '../../lib/routes'
import { INDUSTRIES } from '../../data/industries'
import { CATALOGUE_URL, productsIn } from '../../data/products'
import {
  menuSectorAutomotive,
  menuSectorDefenceAerospace,
  menuSectorIndustrial,
  productIsgController,
} from '../../lib/assets'
import { PRODUCT_SECTOR_LINKS, type Mega, type MegaId } from '../../lib/useMegaMenu'

/* ------------------------------------------------------------------
   Mega menus for "Products" and "Industries".

   Shared by both headers (the homepage's and the inner pages'), so the
   two menus are identical wherever they're opened from.

   Interaction, per the UX rules this was built against:

     - Opens on hover after a short intent delay, and closes on a grace
       period once the pointer leaves both trigger and panel, so crossing
       the gap between them doesn't dismiss it.
     - Hover is never the only way in (`hover-vs-tap`): a tap toggles it,
       and so do Enter and Space on the focused trigger. A mouse click on
       a menu that hover has already opened leaves it open, rather than
       shutting it under the cursor.
     - Escape closes it and returns focus to its trigger. A click or focus
       anywhere outside the item closes it, and so does navigating
       (`keyboard-nav`, `escape-routes`).
     - Each panel sits in the DOM straight after its trigger, so Tab goes
       from "Products" into the Products links, not on to "Industries".
       Closed panels are `invisible`, which also takes their links out of
       the tab order.
     - Opens in 200ms and closes in 140ms — exit faster than enter — and
       drops the movement entirely under prefers-reduced-motion.

   Desktop only (`xl`, where the header shows its links). Below that the
   header's own sheet lists the same destinations.

   Visuals are the site's own: the white rounded card, mono eyebrows, the
   sector photographs from the Industries cards, and the homepage's
   dark-green "Featured" product treatment.

   State lives in lib/useMegaMenu.ts; each header calls the hook once and
   hands the result to its items.
------------------------------------------------------------------- */

/**
 * One nav item with a mega menu: the `<li>`, its trigger, and its panel.
 *
 * The trigger is a button, since what it does is open the panel; the
 * landing page it used to link to is the first link inside. Its classes
 * come from the header, so it matches its neighbours in either header and
 * either tone.
 *
 * The panel is positioned against the nearest positioned ancestor, which
 * each header makes its bar (`relative` on the <nav>): it drops in under
 * the bar at the bar's full width.
 */
export function MegaNavItem({
  id,
  label,
  mega,
  className,
}: {
  id: MegaId
  label: string
  mega: Mega
  className: string
}) {
  const open = mega.openId === id
  const pointer = useRef('mouse')

  // The panel's contents mount on the first sign of intent — pointer over
  // the trigger, focus on it, or a tap — rather than with the header. The
  // header is on every page, and most visits never open the menu; this way
  // they never fetch its photographs either. Hover intent fires 80ms ahead
  // of the open, which gives the thumbnails a head start.
  const [primed, setPrimed] = useState(false)
  const prime = () => setPrimed(true)
  return (
    <li data-mega={id}>
      <button
        ref={(el) => mega.registerTrigger(id, el)}
        type="button"
        aria-expanded={open}
        aria-controls={`mega-${id}`}
        onPointerDown={(e) => {
          pointer.current = e.pointerType
          prime()
        }}
        onFocus={prime}
        onClick={(e) => {
          // A mouse click after hover has opened it keeps it open. A tap,
          // or Enter/Space (detail 0), toggles.
          const byMouse = e.detail > 0 && pointer.current === 'mouse'
          mega.set(byMouse ? id : open ? null : id)
        }}
        onPointerEnter={(e) => {
          prime()
          if (e.pointerType === 'mouse') mega.openSoon(id)
        }}
        onPointerLeave={(e) => e.pointerType === 'mouse' && mega.closeSoon()}
        className={cx('inline-flex cursor-pointer items-center gap-1', className)}
      >
        {label}
        <ChevronDown
          aria-hidden
          strokeWidth={2.25}
          className={cx(
            'h-3.5 w-3.5 opacity-70 transition-transform duration-200 motion-reduce:transition-none',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        id={`mega-${id}`}
        role="region"
        aria-label={`${label} menu`}
        onPointerEnter={(e) => e.pointerType === 'mouse' && mega.cancelClose()}
        onPointerLeave={(e) => e.pointerType === 'mouse' && mega.closeSoon()}
        className={cx(
          // pt-3 is an invisible bridge across the gap under the bar, so the
          // pointer never leaves "the menu" on its way down into it.
          'absolute -inset-x-px top-full z-50 pt-3',
          'transition-[opacity,transform,visibility] motion-reduce:transition-none',
          open
            ? 'visible translate-y-0 opacity-100 duration-200 ease-out'
            : 'pointer-events-none invisible -translate-y-1.5 opacity-0 duration-[140ms] ease-in motion-reduce:translate-y-0',
        )}
      >
        <div className="overflow-hidden rounded-[20px] border border-line-soft bg-white text-left shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
          {(primed || open) && (id === 'products' ? <ProductsMenu /> : <IndustriesMenu />)}
        </div>
      </div>
    </li>
  )
}


/* ------------------------------------------------------------------
   Content
------------------------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[12px] tracking-[0.12em] text-green-ink uppercase">{children}</p>
  )
}

function ArrowRing() {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lime text-ink transition-colors duration-200 group-hover:bg-lime group-hover:text-white"
    >
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  )
}

/** Intro column shared by both menus. */
function Intro({
  eyebrow,
  title,
  accent,
  body,
  link,
}: {
  eyebrow: string
  title: string
  accent: string
  body: string
  link: { label: string; to: string }
}) {
  return (
    <div className="flex flex-col gap-3 border-r border-line-soft bg-[linear-gradient(180deg,#ffffff_0%,#f3f8f0_100%)] p-7">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="font-display text-[24px] leading-[1.15] font-medium tracking-[-0.01em] text-ink">
        {title}
        <br />
        <span className="text-green-deep">{accent}</span>
      </p>
      <p className="font-body text-[13px] leading-[1.55] text-body">{body}</p>
      <Link
        to={link.to}
        className="group mt-auto inline-flex items-center gap-2.5 pt-3 font-body text-[14px] font-medium text-ink"
      >
        {link.label}
        <ArrowRing />
      </Link>
    </div>
  )
}

/** Small WebP cuts of the sector photographs — see lib/assets.ts. */
const MENU_THUMB: Record<string, string> = {
  automotive: menuSectorAutomotive,
  industrial: menuSectorIndustrial,
  'defence-aerospace': menuSectorDefenceAerospace,
}

function IndustriesMenu() {
  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)]">
      <Intro
        eyebrow="Industries we serve"
        title="One core,"
        accent="three sectors."
        body="The same teams, tools and processes serve Automotive, Industrial and Defence."
        link={{ label: 'Industries overview', to: ROUTES.industries }}
      />
      <ul className="grid grid-cols-3 gap-4 p-5">
        {INDUSTRIES.map((industry) => (
          <li key={industry.slug}>
            <Link
              to={industry.to}
              className="group flex h-full flex-col gap-3 rounded-[16px] border border-line-soft p-2.5 transition-[border-color,box-shadow] duration-200 hover:border-green-deep/40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
            >
              <span className="block overflow-hidden rounded-[12px]">
                <img
                  src={MENU_THUMB[industry.slug] ?? industry.cardImage}
                  alt=""
                  aria-hidden
                  decoding="async"
                  className="h-[140px] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </span>
              <span className="flex items-start justify-between gap-3 px-1.5 pb-1.5">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-display text-[16px] leading-[1.25] font-semibold text-ink">
                    {industry.label}
                  </span>
                  <span className="line-clamp-2 font-body text-[12.5px] leading-[1.5] text-body">
                    {industry.cardBody}
                  </span>
                </span>
                <ArrowRing />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProductsMenu() {
  const featured = productsIn('Automotive').find((p) => p.slug === 'motor-controllers')
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_260px]">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-6 p-7">
          {PRODUCT_SECTOR_LINKS.map(({ sector, label, to }) => (
            <div key={sector} className="flex flex-col gap-3">
              <Link
                to={to}
                className="group inline-flex items-center gap-2 self-start font-mono text-[12px] tracking-[0.12em] text-green-ink uppercase hover:text-ink"
              >
                {label}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <ul className="flex flex-col">
                {productsIn(sector).map((product) => (
                  <li key={product.slug}>
                    <Link
                      to={productPath(product.slug)}
                      className="-mx-2 block rounded-[8px] px-2 py-[7px] font-body text-[14px] leading-[1.35] text-ink transition-colors duration-150 hover:bg-lime-tint hover:text-green-ink"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line-soft bg-surface-mute/60 px-7 py-4">
          <Link
            to={ROUTES.products}
            className="group inline-flex items-center gap-2.5 font-body text-[14px] font-medium text-ink"
          >
            All Products &amp; Platforms
            <ArrowRing />
          </Link>
          <div className="flex items-center gap-5 font-body text-[13px] text-body">
            <a href={CATALOGUE_URL.lucasTvs} target="_blank" rel="noopener noreferrer" className="hover:text-green-ink">
              Lucas TVS catalogue ↗
            </a>
            <a href={CATALOGUE_URL.inel} target="_blank" rel="noopener noreferrer" className="hover:text-green-ink">
              INEL products ↗
            </a>
          </div>
        </div>
      </div>

      {/* The homepage's "Featured" product card, carried into the menu:
          the cut-out on the dark-green radial the Solutions slider uses. */}
      {featured && (
        <Link
          to={productPath(featured.slug)}
          className="group relative m-3 ml-0 flex flex-col overflow-hidden rounded-[16px] bg-[radial-gradient(125%_125%_at_58%_40%,#183f2d_0%,#123322_40%,#0b2417_75%,#091f14_100%)] p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
        >
          <span className="self-start rounded-full border border-lime/70 px-3 py-1 font-body text-[12px] font-semibold tracking-[0.14em] text-lime-light uppercase">
            Featured
          </span>
          <img
            src={productIsgController}
            alt=""
            aria-hidden
            decoding="async"
            className="mx-auto my-3 h-[130px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
          <span className="font-mono text-[12px] tracking-[0.12em] text-white/70 uppercase">
            {featured.category}
          </span>
          <span className="mt-1 flex items-center justify-between gap-3">
            <span className="font-display text-[18px] leading-[1.25] font-semibold text-white">
              {featured.name}
            </span>
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-200 group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </span>
        </Link>
      )}
    </div>
  )
}

