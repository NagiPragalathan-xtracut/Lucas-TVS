import { PageShell } from '../../components/site/PageShell'
import { Eyebrow, Heading, Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  FeatureCard,
  SectorCard,
  ServiceCard,
  StepGrid,
} from '../../components/site/blocks'
import { ENGAGEMENT_MODELS, LIFECYCLE, SERVICE_LINES } from '../../data/capabilities'
import { INDUSTRIES } from '../../data/industries'
import { ROUTES } from '../../lib/routes'
import {
  aboutWhoWeAre,
  focusAiDigital,
  svcBms,
  svcDcDc,
  svcInverter,
  svcMotorController,
  svcObc,
  svcVcu,
} from '../../lib/assets'

/**
 * Products that roll under the engineering service offerings (14 Oct),
 * from the client's product sheet. Names are the sheet's; categories reuse
 * the site's product taxonomy. Not links — they have no product pages.
 */
const SERVICE_PRODUCTS = [
  { name: 'Battery Management System', category: 'Energy storage', image: svcBms },
  { name: 'DC-DC Converter', category: 'Power electronics', image: svcDcDc },
  { name: 'On-Board Charger', category: 'Charging', image: svcObc },
  { name: 'Traction Inverter', category: 'Power electronics', image: svcInverter },
  { name: 'Integrated Motor Controller', category: 'Power electronics', image: svcMotorController },
  { name: 'Vehicle Control Unit', category: 'Vehicle electronics', image: svcVcu },
]

/**
 * Capabilities (Engineering Services), built to the Capabilities artboards
 * of the 29 Sep reference, desktop and mobile. Copy is the reference's.
 *
 * Sections, as drawn: hero · "One engineering core" (stat row removed 14 Oct) ·
 * the eight service lines · the lifecycle on a dark band · engagement
 * models · the three sectors · closing plate.
 */
export default function CapabilitiesPage() {
  return (
    <PageShell title="Engineering Services">
      <DarkHero
        image={focusAiDigital}
        position="65% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Capabilities' }]}
        title="Capabilities That Drive"
        accent="Innovation."
        intro="From concept to deployment, our engineering services span embedded systems, electronics, software, safety and validation."
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.products} tone="outline">
              View Products
            </Pill>
          </>
        }
      />

      <Band>
        {/* 14 Oct: laid out like the About page's "Who we are" — copy on
            the left, the multi-sector composite on the right. Same copy. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col gap-[22px] lg:w-[520px] lg:shrink-0">
            <Eyebrow>Horizontal by design</Eyebrow>
            <Heading accent="Every sector.">One engineering core.</Heading>
            <span aria-hidden className="h-1 w-16 rounded-full bg-lime" />
            <p className="font-body text-[16px] leading-[1.65] text-body">
              The same teams, tools and processes serve Automotive, Industrial and Defence — so
              learning in one sector strengthens the others.
            </p>
          </div>
          <div className="min-w-0 grow overflow-hidden rounded-[24px] bg-surface-mute">
            <img
              src={aboutWhoWeAre}
              alt="A scooter, car, truck, loader, tank and military tanker in front of mountains, with aircraft overhead, beside an electric motor, control units and a circuit board and a vehicle design on a display screen"
              decoding="async"
              loading="lazy"
              className="aspect-[1600/931] h-full w-full object-cover"
            />
          </div>
        </div>
        {/* The stat row (8 service lines · 3 sectors · 6 lifecycle stages ·
            MIL·SIL·HIL) under this header was removed on 14 Oct. */}
      </Band>

      <Band tone="mute">
        <StackHeader eyebrow="What we do" title="Eight service lines," accent="one partner." />
        <div className={`${BODY_GAP} grid gap-3.5 lg:grid-cols-2 lg:gap-6`}>
          {SERVICE_LINES.map((line) => (
            <ServiceCard
              key={line.title}
              icon={<line.icon />}
              title={line.title}
              body={line.body}
              tags={line.tags}
            />
          ))}
        </div>
      </Band>

      {/* Products delivered through the service offerings (14 Oct). */}
      <Band>
        {/* Centred header only — the side copy and button were removed. */}
        <div className="flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>Through our services</Eyebrow>
          <Heading accent="engineer.">Products we</Heading>
        </div>
        <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6`}>
          {SERVICE_PRODUCTS.map((product) => (
            <li
              key={product.name}
              className="flex flex-col gap-3 rounded-[20px] border-[1.5px] border-line-soft bg-white p-4 transition-colors duration-300 hover:border-green-deep/30"
            >
              <span className="block overflow-hidden rounded-[14px] bg-surface-mute">
                <img
                  src={product.image}
                  alt={product.name}
                  decoding="async"
                  loading="lazy"
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                />
              </span>
              <span className="px-1 pt-1 font-mono text-[11px] tracking-[0.08em] text-green-deep uppercase">
                {product.category}
              </span>
              <span className="px-1 pb-1 font-display text-[18px] leading-[1.25] font-semibold text-ink">
                {product.name}
              </span>
            </li>
          ))}
        </ul>
      </Band>

      <DarkBand>
        <SplitHeader
          dark
          eyebrow="Our engineering approach"
          title="From Concept To"
          accent="Lifecycle."
          body="A comprehensive engineering journey that turns ideas into intelligent, real-world solutions — and keeps them evolving."
        />
        <StepGrid steps={LIFECYCLE} />
      </DarkBand>

      <Band>
        <StackHeader eyebrow="How we engage" title="Flexible models," accent="clear ownership." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {ENGAGEMENT_MODELS.map((model) => (
            <FeatureCard
              key={model.title}
              icon={<model.icon />}
              title={model.title}
              body={model.body}
              link={{ label: 'Discuss your programme', to: ROUTES.contact }}
            />
          ))}
        </div>
      </Band>

      <Band tone="mute">
        <StackHeader eyebrow="Industries we serve" title="One Engineering Core," accent="Three Sectors." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {INDUSTRIES.map((industry) => (
            <SectorCard
              key={industry.slug}
              image={industry.cardImage}
              imageLabel={industry.cardImageLabel}
              title={industry.label}
              body={industry.cardBody}
              to={industry.to}
            />
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}
