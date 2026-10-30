import { PageShell } from '../../components/site/PageShell'
import { Pill, StackHeader } from '../../components/site/design'
import { ArrowCircle, BODY_GAP, Band, DarkHero, SmartLink } from '../../components/site/blocks'
import { ROUTES } from '../../lib/routes'
import { approachBackdrop } from '../../lib/assets'

const DESTINATIONS = [
  { label: 'About Us', to: ROUTES.about },
  { label: 'Capabilities', to: ROUTES.capabilities },
  { label: 'Products & Platforms', to: ROUTES.products },
  { label: 'Industries', to: ROUTES.industries },
  { label: 'Careers', to: ROUTES.careers },
  { label: 'Contact Us', to: ROUTES.contact },
  { label: 'Search', to: ROUTES.search },
]

/**
 * 404. Not drawn in the reference; built from its blocks. Rendered for any
 * unknown path, and by the three parameterised pages (/products/:slug,
 * /industries/:slug, /insights/:slug) when the slug matches nothing.
 */
export default function NotFoundPage() {
  return (
    <PageShell title="Page not found">
      <DarkHero
        image={approachBackdrop}
        heightClass="min-h-[480px] lg:min-h-[560px]"
        crumbs={[{ label: '404' }]}
        title="This page doesn’t"
        accent="exist."
        intro="The link may be out of date, or the page may have moved. Everything the site covers is one click away below."
        actions={
          <>
            <Pill to={ROUTES.home}>Back to Home</Pill>
            <Pill to={ROUTES.search} tone="outline">
              Search the site
            </Pill>
          </>
        }
      />

      <Band tone="mute">
        <StackHeader eyebrow="Popular destinations" title="Where to" accent="next." />
        <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4`}>
          {DESTINATIONS.map((d) => (
            <li key={d.to}>
              <SmartLink
                to={d.to}
                className="group flex items-center justify-between gap-4 rounded-[18px] border-[1.5px] border-line-soft bg-white px-5 py-[18px] transition-colors duration-300 hover:border-green-deep/50"
              >
                <span className="font-display text-[17px] leading-[1.25] font-semibold text-ink">{d.label}</span>
                <ArrowCircle />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Band>
    </PageShell>
  )
}
