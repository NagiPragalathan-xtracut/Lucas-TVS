import { Link } from 'react-router-dom'
import { logoLucasTvsFooter } from '../../lib/assets'
import { FOOTER_COLUMNS, COMPANY, ROUTES, SOCIAL_LINKS } from '../../lib/routes'

// Social links come from SOCIAL_LINKS (lib/routes.ts); these two are
// still placeholders until the policy pages exist.
const LEGAL = ['Privacy', 'Terms']

/**
 * Footer for the inner pages.
 *
 * Visually this is `SiteFooterHome3` — same masthead, same enquiry plate,
 * same five columns, same oversized wordmark. The difference is that every
 * link here resolves to a real route instead of "#", which is the whole
 * reason it is a separate component: wiring the homepage footer's hrefs up
 * would mean editing a frozen file.
 *
 * Columns come from `FOOTER_COLUMNS` in lib/routes.ts.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-line bg-white pt-8 pb-10 lg:pt-[26px]">
      <div className="shell relative">
        {/* Masthead --------------------------------------------------- */}
        <div className="gap-8 lg:flex lg:items-start lg:justify-between">
          <div className="lg:max-w-[542px]">
            <Link to={ROUTES.home} aria-label="Lucas-TVS home">
              <img
                src={logoLucasTvsFooter}
                alt="Lucas-TVS"
                className="h-[54px] w-auto lg:h-[67px]"
              />
            </Link>
            <p className="mt-6 font-sans text-[15px] leading-[1.38] text-body-soft lg:mt-[32px] lg:text-[16px]">
              A software &amp; product-engineering division of Lucas-TVS.
            </p>
            <address className="mt-3 max-w-[420px] font-sans text-[13px] leading-[1.5] text-body-soft not-italic lg:text-[14px]">
              {COMPANY.addressName}, {COMPANY.addressLines.join(' ')}
            </address>
          </div>

          <div className="mt-8 rounded-[14.75px] border-[1.054px] border-lime bg-lime/[0.19] p-[30px] lg:mt-[2px] lg:w-[590px] lg:shrink-0">
            <div className="gap-6 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-display text-[20px] leading-none text-black lg:text-[22px]">
                  Engineering enquiries
                </p>
                <p className="mt-3 max-w-[338px] font-sans text-[15px] leading-[1.38] text-body-soft lg:text-[16px]">
                  Tell us about your programme and we&rsquo;ll route you to the
                  right team.
                </p>
              </div>
              <Link
                to={ROUTES.contact}
                className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full bg-lime px-8 py-4 font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap text-ink-slate shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 sm:mt-0"
              >
                Talk to Engineering
              </Link>
            </div>
          </div>
        </div>

        {/* Link columns ----------------------------------------------- */}
        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-[80px] lg:grid-cols-5 lg:gap-x-[48px]"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-[15px] leading-[1.27] tracking-[1.74px] text-green uppercase lg:text-[17px]">
                {column.heading}
              </h2>
              <ul className="mt-6 space-y-4 lg:mt-[34px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="font-sans text-[15px] leading-[1.23] text-body transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[15px] leading-[1.23] text-body transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Oversized wordmark ----------------------------------------- */}
        <p
          aria-hidden
          className="watermark mt-8 overflow-hidden text-center font-display text-[16vw] leading-none font-bold whitespace-nowrap uppercase select-none lg:mt-[10px] lg:text-[212px]"
        >
          <span>l</span>
          <span className="lowercase">ucas</span>
          <span> TVS</span>
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-[10px] leading-[1.29] tracking-[0.98px] text-black">
            © 2026 Lucas-TVS Limited · All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Lucas TVS on ${item.label} (opens in a new tab)`}
                  className="font-sans text-[11.6px] leading-[1.23] text-black transition-colors hover:text-green"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {LEGAL.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-sans text-[11.6px] leading-[1.23] text-black transition-colors hover:text-green"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
