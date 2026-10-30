import { useParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { Eyebrow, ImageSlot, Pill, SplitHeader } from '../../components/site/design'
import { BODY_GAP, Band, CtaPlate, DarkHero, ProductTile, TagList } from '../../components/site/blocks'
import { INDUSTRIES } from '../../data/industries'
import { productBySlug, productsIn } from '../../data/products'
import { ROUTES } from '../../lib/routes'
import NotFoundPage from './NotFoundPage'

/**
 * Product detail, one route per catalogue entry (/products/:slug). Not
 * drawn in the reference — its product cards lead nowhere — so it is
 * assembled from the reference's blocks, with the hero photograph of the
 * product's sector.
 *
 * It shows only what the catalogue holds: name, category, the reference's
 * line, and engineering themes drawn from the matching capability lists.
 * No specifications, ratings or datasheets have been supplied, and the
 * page says so plainly instead of inventing them.
 */
export default function ProductDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = productBySlug(slug)
  if (!product) return <NotFoundPage />

  const industry = INDUSTRIES.find((i) => i.sector === product.sector) ?? INDUSTRIES[0]
  const related = productsIn(product.sector)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  return (
    <PageShell title={product.name}>
      <DarkHero
        image={industry.heroImage}
        position="65% center"
        heightClass="min-h-[525px] lg:min-h-[600px]"
        crumbs={[{ label: 'Products & Platforms', to: ROUTES.products }, { label: product.name }]}
        title={product.name}
        intro={product.blurb}
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.products} tone="outline">
              All Products
            </Pill>
          </>
        }
      />

      <Band>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-16">
          {product.image ? (
            <span className="flex h-[260px] items-center justify-center rounded-[24px] bg-surface-mute p-8 lg:h-[420px] lg:w-[560px] lg:shrink-0">
              <img
                src={product.image}
                alt={product.imageAlt ?? product.name}
                decoding="async"
                className="max-h-full w-auto object-contain"
              />
            </span>
          ) : (
            <ImageSlot
              label="Product image"
              className="h-[260px] w-full rounded-[24px] lg:h-[420px] lg:w-[560px] lg:shrink-0"
            />
          )}

          <div className="flex flex-col gap-[18px]">
            <Eyebrow>{product.category}</Eyebrow>
            <h2 className="font-display text-[30px] leading-[1.12] font-medium tracking-[-0.01em] text-ink lg:text-[44px]">
              {product.name}
            </h2>
            <p className="font-body text-[15px] leading-[1.65] text-body lg:text-[16px]">{product.blurb}</p>
            <p className="pt-1 font-mono text-[12px] tracking-[0.1em] text-green-ink uppercase">Engineering focus</p>
            <TagList items={product.highlights} />
            <p className="rounded-[14px] border-[1.5px] border-dashed border-line-soft px-4 py-3 font-body text-[13px] leading-[1.55] text-body">
              Specifications, variants and datasheets are not published here yet. Talk to the
              engineering team for detail on this product.
            </p>
            <div className="flex flex-wrap gap-3">
              <Pill to={ROUTES.contact}>Talk to Engineering →</Pill>
              <Pill to={industry.to} tone="ghost">
                {industry.label} →
              </Pill>
            </div>
          </div>
        </div>
      </Band>

      {related.length > 0 && (
        <Band tone="mute">
          <SplitHeader
            eyebrow="Related products"
            title="More from"
            accent={`${industry.label}.`}
            actions={
              <Pill to={ROUTES.products} tone="ghost">
                All Products →
              </Pill>
            }
          />
          <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4`}>
            {related.map((p) => (
              <li key={p.slug}>
                <ProductTile product={p} />
              </li>
            ))}
          </ul>
        </Band>
      )}

      <CtaPlate />
    </PageShell>
  )
}
