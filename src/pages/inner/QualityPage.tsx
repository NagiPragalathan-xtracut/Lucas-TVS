import { PageShell } from '../../components/site/PageShell'
import {
  Eyebrow,
  Heading,
  IconArrowUpRight,
  IconMedal,
  IconTile,
  ImageSlot,
  Pill,
  SplitHeader,
} from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  FeatureCard,
  StepGrid,
  Statement,
} from '../../components/site/blocks'
import { STANDARDS, VALIDATION_LEVELS } from '../../data/capabilities'
import { ROUTES } from '../../lib/routes'
import { approachBackdrop, awardsBackdrop } from '../../lib/assets'

/**
 * Certificates, as drawn: the reference fills all four with lorem ipsum —
 * the client has not supplied any. Kept so the layout is ready, but the
 * whole band is switched off for launch; see `SHOW_CERTIFICATIONS`.
 */
const CERTIFICATES = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  name: 'Lorem Ipsum Certification',
  body: 'Lorem ipsum dolor sit amet',
}))

/**
 * 30 Sep: the recognition band ("A legacy of quality excellence.") is
 * hidden, on the client's instruction — switched off here rather than
 * deleted, so it can come back.
 */
const SHOW_RECOGNITION: boolean = false

/**
 * 30 Oct (launch audit): the "Certified processes." band is hidden. All
 * four cards were lorem ipsum with a grey "Certificate" box and a "View
 * certificate" label that went nowhere — placeholder copy that must not
 * ship. It returns when the client supplies the real certificate PDFs:
 * fill `CERTIFICATES` with the real names/issuers, link "View
 * certificate" to each PDF (new tab), swap the ImageSlot for a thumbnail,
 * then set this to true.
 */
const SHOW_CERTIFICATIONS: boolean = false

/**
 * Quality & Standards, built to the Quality artboards of the 29 Sep
 * reference. Copy is the reference's.
 *
 * The recognition band names the Deming Application Prize and the Deming
 * Grand Prize, attributed to the Lucas-TVS group. The earlier wireframe
 * asked whether this division could use them; the reference now answers
 * with its own copy, so it is shown as written — when it is shown; see
 * `SHOW_RECOGNITION`.
 */
export default function QualityPage() {
  return (
    <PageShell title="Quality & Standards">
      <DarkHero
        image={approachBackdrop}
        position="60% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Quality & Standards' }]}
        title="Quality Engineered Into"
        accent="Every Stage."
        intro="Proven processes, international standards and rigorous validation — so every product performs as designed."
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.capabilities} tone="outline">
              Our Capabilities
            </Pill>
          </>
        }
      />

      <Band>
        <Statement
          eyebrow="Our approach"
          statement="Quality isn’t a final check. It’s built into how we specify, design, build and validate."
          points={[
            'Every programme follows defined processes with full traceability from requirements to test results.',
            'Safety and cybersecurity analyses run alongside development, not after it.',
            'Automated and hardware-in-the-loop testing catch issues early, when they cost least to fix.',
          ]}
        />
      </Band>

      <Band tone="mute">
        <SplitHeader
          eyebrow="Standards we engineer to"
          title="Safe & secure"
          accent="by design."
          body="Our safety and cybersecurity practices are aligned with the leading international standards."
        />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {STANDARDS.map((standard) => (
            <FeatureCard
              key={standard.code}
              icon={<standard.icon />}
              title={standard.code}
              body={standard.body}
              titleClassName="text-[26px] leading-[1.25] lg:text-[32px]"
            />
          ))}
        </div>
      </Band>

      <DarkBand>
        <SplitHeader
          dark
          eyebrow="Validation"
          title="Tested at"
          accent="every level."
          body="From models to real hardware, each stage builds evidence that your product is ready."
        />
        <StepGrid steps={VALIDATION_LEVELS} />
      </DarkBand>

      {/* Hidden for launch — placeholder certificates. Returns when the real
          certificate PDFs are supplied; see `SHOW_CERTIFICATIONS`. */}
      {SHOW_CERTIFICATIONS && (
        <Band>
          <SplitHeader
            eyebrow="Certifications"
            title="Certified"
            accent="processes."
            body="Independent certifications that demonstrate our quality and safety management."
          />
          <ul className={`${BODY_GAP} grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:gap-4`}>
            {CERTIFICATES.map((cert) => (
              <li
                key={cert.id}
                className="flex flex-col gap-2.5 rounded-[20px] border-[1.5px] border-line-soft bg-white p-4"
              >
                <ImageSlot label="Certificate" className="h-[150px] w-full rounded-[14px] lg:h-[200px]" />
                <span className="font-display text-[16px] leading-[1.3] font-semibold text-ink">{cert.name}</span>
                <span className="font-body text-[13px] text-body">{cert.body}</span>
                <span className="flex items-center gap-2 font-body text-[13px] font-medium text-body-soft">
                  View certificate
                  <IconArrowUpRight />
                </span>
              </li>
            ))}
          </ul>
        </Band>
      )}

      {SHOW_RECOGNITION && (
        <Band tone="mute">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
            <ImageSlot
              src={awardsBackdrop}
              alt="Golden trophy on a reflective surface at sunrise"
              label="Image: award ceremony / trophy"
              className="h-[240px] w-full rounded-[24px] lg:h-[360px] lg:w-[560px] lg:shrink-0"
            />
            <div className="flex flex-col gap-[18px]">
              <Eyebrow>Recognition</Eyebrow>
              <Heading accent="quality excellence.">A legacy of</Heading>
              <p className="font-body text-[15px] leading-[1.65] text-body lg:text-[16px]">
                The Lucas-TVS group has been recognised with the Deming Application Prize and the
                Deming Grand Prize — a quality culture our engineering teams carry forward.
              </p>
              <ul className="flex flex-wrap gap-3">
                {['Deming Application Prize', 'Deming Grand Prize'].map((award) => (
                  <li
                    key={award}
                    className="flex items-center gap-3 rounded-[16px] border-[1.5px] border-line-soft bg-white px-[18px] py-3.5"
                  >
                    <IconTile tone="tint">
                      <IconMedal />
                    </IconTile>
                    <span className="font-display text-[16px] font-semibold text-ink">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Band>
      )}

      <CtaPlate />
    </PageShell>
  )
}
