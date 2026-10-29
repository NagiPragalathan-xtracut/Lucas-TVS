import { Button } from './primitives'
import { logoLucasTvsFooter } from '../lib/assets'
import { PRIVACY_POLICY_URL } from './site/PrivacyConsent'

const COLUMNS = [
  {
    heading: 'Industries',
    links: ['Automotive', 'Industrial', 'Defence & Aerospace'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Contact'],
  },
  {
    heading: 'Services',
    links: [
      'Product Engineering',
      'Embedded Systems',
      'Electronics Engineering',
      'Software Engineering',
      'Functional Safety & Cybersecurity',
      'Digital Engineering',
    ],
  },
]

const SOCIAL = ['LinkedIn', 'YouTube', 'X']

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-line bg-white pt-8 pb-10 lg:pt-[26px]">
      <div className="shell relative">
        {/* Masthead --------------------------------------------------- */}
        <div className="gap-8 lg:flex lg:items-start lg:justify-between">
          <div className="lg:max-w-[542px]">
            <img
              src={logoLucasTvsFooter}
              alt="Lucas-TVS"
              className="h-[54px] w-auto lg:h-[67px]"
            />
            <p className="mt-6 font-sans text-[15px] leading-[1.38] text-body-soft lg:mt-[32px] lg:text-[16px]">
              A software &amp; product-engineering division of Lucas-TVS.
            </p>
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
              <Button className="mt-5 shrink-0 sm:mt-0">
                Talk to Engineering
              </Button>
            </div>
          </div>
        </div>

        {/* Link columns ----------------------------------------------- */}
        <nav className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-[80px] lg:gap-x-[75px]">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-[15px] leading-[1.27] tracking-[1.74px] text-green uppercase lg:text-[17px]">
                {column.heading}
              </h2>
              <ul className="mt-6 space-y-4 lg:mt-[34px]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-[15px] leading-[1.23] text-body transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
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
            {SOCIAL.map((item) => (
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
