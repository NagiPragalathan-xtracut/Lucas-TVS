import { Link } from 'react-router-dom'
import { logoLucasTvsFooter } from '../../lib/assets'
import { FOOTER_COLUMNS, ROUTES, SOCIAL_LINKS } from '../../lib/routes'
import { FooterContactCard } from './FooterContactCard'
import { PRIVACY_POLICY_URL } from './PrivacyConsent'

/**
 * Footer for the inner pages.
 *
 * Visually this is `SiteFooterHome3` — same masthead, link columns and
 * oversized wordmark. The difference is that every
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
          <div className="shrink-0">
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
          </div>

          <div className="mt-8 lg:mt-0">
            <FooterContactCard />
          </div>
        </div>

        {/* Link columns ----------------------------------------------- */}
        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-[80px] lg:grid-cols-4 lg:gap-x-[75px]"
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
            © 2026 Lucas-TVS Limited · All rights reserved ·{' '}
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-green hover:underline"
            >
              Privacy Policy
            </a>
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
          </ul>
        </div>
      </div>
    </footer>
  )
}
