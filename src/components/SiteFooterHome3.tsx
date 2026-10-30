import { AppLink } from './AppLink'
import { logoLucasTvsFooter } from '../lib/assets'
import { ROUTES, SOCIAL_LINKS } from '../lib/routes'
import { FooterContactCard } from './site/FooterContactCard'
import { usePrivacyConsent } from './site/PrivacyConsent'

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: 'Industries',
    links: [
      { label: 'Automotive', href: '/industries/automotive' },
      { label: 'Industrial', href: '/industries/industrial' },
      { label: 'Defence & Aerospace', href: '/industries/defence-aerospace' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Product Engineering', href: '/capabilities' },
      { label: 'Embedded Systems', href: '/capabilities' },
      { label: 'Electronics Engineering', href: '/capabilities' },
      { label: 'Software Engineering', href: '/capabilities' },
      { label: 'Functional Safety & Cybersecurity', href: '/capabilities' },
      { label: 'Digital Engineering', href: '/capabilities' },
    ],
  },
  {
    heading: 'Products',
    links: [
      {
        label: 'Lucas-TVS Products',
        href: 'https://lucas-tvs.com/automotive-solutions-products/',
        external: true,
      },
      {
        label: 'India Nippon (INEL) Products',
        href: 'https://www.indianippon.com/Products-Solutions',
        external: true,
      },
    ],
  },
]

/**
 * Home3-only replacement for `SiteFooter`. Per the Sep-11 content review:
 * carries the INEL R&D Tech Center address (phone/email are still
 * placeholders in the client's content doc, so they're left out rather
 * than shipping fake numbers), and adds a "Products" column that links
 * out to the Lucas-TVS / INEL product pages — this division is
 * services-only, so products aren't hosted here.
 */
export function SiteFooterHome3() {
  const { openPrivacyChoices } = usePrivacyConsent()

  return (
    <footer className="relative overflow-hidden border-t-2 border-line bg-white pt-8 pb-10 lg:pt-[26px]">
      <div className="shell relative">
        {/* Masthead --------------------------------------------------- */}
        <div className="gap-8 lg:flex lg:items-start lg:justify-between">
          <div className="shrink-0">
            <img
              src={logoLucasTvsFooter}
              alt="Lucas-TVS"
              className="h-[54px] w-auto lg:h-[67px]"
            />
            <p className="mt-6 font-sans text-[15px] leading-[1.38] text-body-soft lg:mt-[32px] lg:text-[16px]">
              A software &amp; product-engineering division of Lucas-TVS.
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <FooterContactCard />
          </div>
        </div>

        {/* Link columns ----------------------------------------------- */}
        <nav className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-[80px] lg:grid-cols-4 lg:gap-x-[48px]">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-[15px] leading-[1.27] tracking-[1.74px] text-green uppercase lg:text-[17px]">
                {column.heading}
              </h2>
              <ul className="mt-6 space-y-4 lg:mt-[34px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <AppLink
                      href={link.href}
                      className="font-sans text-[15px] leading-[1.23] text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </AppLink>
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
            <AppLink href={ROUTES.privacy} className="underline-offset-2 transition-colors hover:text-green hover:underline">
              Privacy Policy
            </AppLink>{' '}
            ·{' '}
            <button
              type="button"
              onClick={openPrivacyChoices}
              className="cursor-pointer underline-offset-2 transition-colors hover:text-green hover:underline"
            >
              Cookie Settings
            </button>
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
