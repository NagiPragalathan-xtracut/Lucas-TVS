import { useParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { Eyebrow, ImageSlot, Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  MoreTile,
  ProductTile,
  SectorCard,
  SectorPills,
  SolutionRow,
  Statement,
} from '../../components/site/blocks'
import { BAT, INDUSTRIES, industryBySlug, type Industry } from '../../data/industries'
import { CATALOGUE_URL, productsIn } from '../../data/products'
import { DEFENCE_PLATFORMS } from '../../data/defenceSupplied'
import { insightFeature } from '../../lib/assets'
import { ROUTES, insightPath } from '../../lib/routes'
import NotFoundPage from './NotFoundPage'

/** The "<Sector> Products." band — hidden on every industry page (14 Oct). */
const SHOW_PRODUCTS = false

/**
 * Automotive, Industrial and Defence & Aerospace — one template, built to
 * the three industry artboards of the 29 Sep reference, which share it.
 * Each page's copy lives in data/industries.ts.
 *
 * Sections, as drawn: hero with the sector switcher · the opportunity ·
 * focus areas · [Automotive only: the BAT investment band] · solutions,
 * alternating · the sector's products · the other two sectors · closing
 * plate.
 */
export default function IndustryPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const industry = industryBySlug(slug)
  if (!industry) return <NotFoundPage />

  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug)
  const products = productsIn(industry.sector)
  const isAutomotive = industry.slug === 'automotive'

  return (
    <PageShell title={industry.label}>
      <DarkHero
        image={industry.heroImage}
        video={industry.heroVideo}
        position={industry.heroPosition ?? '65% center'}
        heightClass={industry.heroHeight}
        crumbs={[{ label: 'Industries', to: ROUTES.industries }, { label: industry.label }]}
        title={industry.title}
        accent={industry.accent}
        intro={industry.intro}
        below={
          <SectorPills
            items={INDUSTRIES.map((i) => ({ label: i.label, to: i.to, current: i.slug === industry.slug }))}
          />
        }
      />

      <Band>
        <Statement
          eyebrow="The opportunity"
          statement={industry.opportunity.statement}
          points={industry.opportunity.points}
        />
      </Band>

      {/* "Key focus areas — Where we focus." (four cards) was removed on
          14 Oct: the same ground is covered by "Solutions that deliver."
          further down the page. */}

      {isAutomotive && <BatBand />}

      <Band>
        <SplitHeader
          eyebrow={industry.solutionsEyebrow}
          title="Solutions that"
          accent="deliver."
          body="Engineering capabilities packaged for the challenges your programmes face today."
        />
        <div className="mt-7 flex flex-col gap-12 lg:mt-14 lg:gap-[72px]">
          {industry.solutions.map((solution, i) => (
            <SolutionRow
              key={solution.title}
              flip={i % 2 === 1}
              solution={{ ...solution, icon: <solution.icon /> }}
            />
          ))}
        </div>
      </Band>

      {industry.slug === 'defence-aerospace' && <DefenceSuppliedBand />}

      {/* 14 Oct: the products band was removed from Industrial and
          Defence, then hidden on Automotive too. Set SHOW_PRODUCTS to true
          to bring Automotive's back. */}
      {SHOW_PRODUCTS && isAutomotive && (
        <ProductsBand industry={industry} products={products} isAutomotive={isAutomotive} />
      )}

      <Band tone="mute">
        <StackHeader eyebrow="Other industries" title="One core," accent="three sectors." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-2 lg:gap-6`}>
          {others.map((other) => (
            <SectorCard
              key={other.slug}
              image={other.cardImage}
              imageLabel={other.cardImageLabel}
              title={other.label}
              body={other.cardBody}
              to={other.to}
            />
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}

function ProductsBand({
  industry,
  products,
  isAutomotive,
}: {
  industry: Industry
  products: ReturnType<typeof productsIn>
  isAutomotive: boolean
}) {
  return (
    <Band tone="mute">
      <SplitHeader
        eyebrow={industry.products.eyebrow}
        title={industry.products.title}
        accent="Products."
        body={industry.products.body}
        actions={
          isAutomotive ? (
            <Pill href={CATALOGUE_URL.lucasTvs} tone="ghost">
              Lucas TVS Products ↗
            </Pill>
          ) : (
            <Pill to={ROUTES.products} tone="ghost">
              All Products →
            </Pill>
          )
        }
      />
      <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4`}>
        {products.map((product) => (
          <li key={product.slug}>
            <ProductTile
              product={{ ...product, blurb: isAutomotive ? product.blurb : (product.shortBlurb ?? product.blurb) }}
            />
          </li>
        ))}
        {isAutomotive && (
          <li>
            <MoreTile label="All Products & Platforms" to={ROUTES.products} />
          </li>
        )}
      </ul>
    </Band>
  )
}

/** Automotive only: the strategic investment in BAT, Germany. */
function BatBand() {
  return (
    <DarkBand>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex flex-col gap-[18px] lg:w-[600px] lg:shrink-0">
          <Eyebrow tone="light">{BAT.eyebrow}</Eyebrow>
          <p className="font-display text-[30px] leading-[1.15] font-semibold text-white lg:text-[40px]">
            {BAT.title} <span className="text-lime-light">{BAT.accent}</span>
          </p>
          {BAT.paragraphs.map((text) => (
            <p key={text} className="font-body text-[15px] leading-[1.65] text-white/80">
              {text}
            </p>
          ))}
          <div className="flex flex-wrap gap-3">
            <Pill to={insightPath('lucas-tvs-invests-in-bat-germany')}>Read the story</Pill>
          </div>
        </div>

        <div className="flex min-w-0 grow flex-col gap-3.5">
          <ImageSlot
            src={insightFeature}
            alt="Engineer reviewing an electric motor test with an automated assembly cell"
            tone="dark"
            label="Electric motor engineering"
            className="h-[200px] w-full rounded-[20px] lg:h-[260px]"
          />
          <ul className="grid grid-cols-2 gap-3.5">
            {BAT.tiles.map((tile) => (
              <li
                key={tile.title}
                className="flex flex-col gap-1 rounded-[16px] border border-[#3a3c3a] bg-black/60 p-4"
              >
                <span className="font-display text-[17px] leading-[1.25] font-semibold text-lime-light">
                  {tile.title}
                </span>
                <span className="font-body text-[13px] text-white/75">{tile.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DarkBand>
  )
}

/**
 * Defence & Aerospace only: the products we supply into defence platforms
 * (14 Oct, from the client's defence product sheet). One card per
 * platform — the vehicle and its components photographed together, the
 * platform name, then every product the sheet lists for it as an icon
 * row. (The "For T72 & T90 Battle Tanks" tag was removed on 14 Oct.)
 * On the dark band so it reads apart from the white solutions above.
 */
function DefenceSuppliedBand() {
  return (
    <DarkBand>
      <SplitHeader
        dark
        eyebrow="Products supplied"
        title="Built into"
        accent="defence platforms."
        body="Power and motion systems we supply for armoured and high-mobility vehicles."
      />
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {DEFENCE_PLATFORMS.map((platform, i) => (
          <li
            key={platform.name}
            className="flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white"
          >
            <div className="relative border-b border-line-soft bg-white">
              <img
                src={platform.image}
                alt={platform.imageAlt}
                decoding="async"
                loading="lazy"
                width={960}
                height={480}
                className="aspect-[2/1] w-full object-contain"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#101211] px-2.5 py-1 font-mono text-[12px] tracking-[0.08em] text-lime-light">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex grow flex-col gap-4 p-5 lg:p-6">
              <h3 className="font-display text-[20px] leading-[1.25] font-semibold text-ink lg:text-[22px]">
                {platform.name}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {platform.products.map((product) => (
                  <li
                    key={product.label}
                    className="flex items-center gap-3 rounded-[12px] border border-line-soft px-3 py-2.5"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-lime-tint text-green-ink"
                    >
                      <product.icon strokeWidth={1.8} className="h-[17px] w-[17px]" />
                    </span>
                    <span className="font-body text-[14px] leading-[1.35] font-medium text-ink">
                      {product.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </DarkBand>
  )
}
