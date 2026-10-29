import { useId, type ReactNode } from 'react'
import { EnquiryStatusNote } from '../../components/site/EnquiryStatusNote'
import { PageShell } from '../../components/site/PageShell'
import {
  Eyebrow,
  IconChat,
  IconMail,
  IconPeople,
  IconPhone,
  IconPin,
  BAND,
  FRAME,
  Pill,
  StackHeader,
} from '../../components/site/design'
import {
  ArrowCircle,
  BODY_GAP,
  Band,
  DarkHero,
  SmartLink,
  type LinkTarget,
} from '../../components/site/blocks'
import { COMPANY, ROUTES } from '../../lib/routes'
import { reachCareers, reachEngineering, rndFeature, solutionsPanelWaves } from '../../lib/assets'
import { useEnquiry } from '../../lib/useEnquiry'

const ADDRESS =
  'India Nippon Electricals Limited (INEL) R&D Tech Center, Plot No-137, Phase-1, SIPCOT Industrial Complex, Hosur, Tamil Nadu - 635126'

/**
 * Google's keyless embed, searching for the address above. No API key or
 * account involved; the frame carries its own "View larger map" link.
 */
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`

const FIELD =
  'h-[50px] w-full rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 font-body text-[15px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none'

/**
 * Contact Us, built to the Contact artboards of the 29 Sep reference.
 * Copy is the reference's.
 *
 * Phone and email are the client's confirmed details (24 Oct), from
 * COMPANY in lib/routes.ts, and link out as tel: / mailto:.
 *
 * The form posts to the client's enquiries Google Sheet (see
 * lib/useEnquiry.ts): one row per submission, tagged "Contact page".
 *
 * The map is a live Google Maps embed of the address (1 Oct), sized to end
 * level with the form on desktop.
 *
 * "Other ways to reach us" follows the client's 1 Oct reference: dark
 * green photo cards on a pale wave backdrop. See `ReachCard`.
 */
export default function ContactPage() {
  const { status, onSubmit } = useEnquiry('Contact page')

  return (
    <PageShell title="Contact Us">
      <DarkHero
        image={rndFeature}
        position="70% center"
        heightClass="min-h-[525px] lg:min-h-[640px]"
        crumbs={[{ label: 'Contact Us' }]}
        title="Let’s Build"
        accent="What’s Next."
        intro="Tell us about your programme and we’ll route it to the engineering team that owns it."
        actions={
          <>
            <Pill href="#enquiry">Send an Enquiry</Pill>
            <Pill to={ROUTES.careers} tone="outline">
              Careers
            </Pill>
          </>
        }
      />

      <Band tone="mute" id="enquiry">
        {/* Stretched, not start-aligned, so on desktop the details column
            runs the full height of the form and the map fills whatever the
            address card leaves — the two columns end on the same line. */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-stretch lg:gap-16">
          {/* Form ------------------------------------------------------ */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 rounded-[24px] border-[1.5px] border-line-soft bg-white p-[22px] lg:w-[720px] lg:shrink-0 lg:p-10"
          >
            <Eyebrow>Engineering enquiries</Eyebrow>
            <h2 className="font-display text-[24px] leading-[1.26] font-medium text-ink lg:text-[30px]">
              Tell us about your programme
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name">
                {(id) => <input id={id} name="name" required autoComplete="name" className={FIELD} />}
              </Field>
              <Field label="Company">
                {(id) => <input id={id} name="company" autoComplete="organization" className={FIELD} />}
              </Field>
              <Field label="Work email">
                {(id) => <input id={id} name="email" type="email" required autoComplete="email" className={FIELD} />}
              </Field>
              <Field label="Phone">
                {(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={FIELD} />}
              </Field>
            </div>

            <Field label="Industry">
              {(id) => (
                <select id={id} name="industry" className={`${FIELD} appearance-none`}>
                  <option>Automotive</option>
                  <option>Industrial</option>
                  <option>Defence &amp; Aerospace</option>
                  <option>Other</option>
                </select>
              )}
            </Field>

            <Field label="How can we help?">
              {(id) => (
                // 144px, not the reference's written 120: its textarea is
                // content-box, so the drawn box is 120 plus padding and
                // border. Tailwind boxes are border-box; this is the height
                // the reference actually renders.
                <textarea
                  id={id}
                  name="message"
                  required
                  className="h-[144px] w-full resize-none rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 py-3 font-body text-[15px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none"
                />
              )}
            </Field>

            {/* Honeypot: hidden from people; the sheet script drops anything
                that fills it in. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="h-[52px] self-start rounded-full bg-lime px-[30px] font-body text-[16px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === 'sending' ? 'Sending…' : 'Submit Enquiry →'}
            </button>

            <EnquiryStatusNote status={status} />

            <p className="font-body text-[12px] text-body">
              By submitting, you agree to our privacy policy. We typically respond within two working
              days.
            </p>
          </form>

          {/* Details --------------------------------------------------- */}
          <div className="flex min-w-0 grow flex-col gap-5">
            <dl className="flex flex-col gap-[22px] rounded-[24px] bg-lime-tint p-[22px] lg:p-8">
              <Detail icon={<IconPin />} label="Address">
                {ADDRESS}
              </Detail>
              <Detail icon={<IconPhone />} label="Phone">
                <a href={COMPANY.phoneHref} className="transition-colors hover:text-green-deep">
                  {COMPANY.phone}
                </a>
              </Detail>
              <Detail icon={<IconMail />} label="Email">
                <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-green-deep">
                  {COMPANY.email}
                </a>
              </Detail>
            </dl>
            {/* Fixed height on a phone, where the columns stack; from lg
                it grows into the rest of the column. The frame is absolutely
                placed so it always fills the box, whatever height that is. */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] border-[1.5px] border-line-soft bg-surface-mute lg:h-auto lg:min-h-[300px] lg:flex-1">
              <iframe
                src={MAP_EMBED}
                title="Map — INEL R&D Tech Center, SIPCOT Industrial Complex, Hosur"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </Band>

      {/* Other ways to reach us ----------------------------------------
          The same pale mint waves as the homepage's Solutions finder,
          faded out at top and bottom so the band has no hard edge. */}
      <section className="relative overflow-hidden">
        <img
          src={solutionsPanelWaves}
          alt=""
          aria-hidden
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_82%,transparent_100%)]"
        />
        <div className={`${FRAME} ${BAND} relative`}>
          <StackHeader eyebrow="Other ways to reach us" title="The right team," accent="first time." />
          <div className={`${BODY_GAP} grid gap-4 md:grid-cols-2 lg:gap-6`}>
            <ReachCard
              icon={<IconChat />}
              title="Engineering Enquiries"
              body="Programmes, partnerships and technical discussions."
              link={{ label: 'Talk to Engineering', href: '#enquiry' }}
              image={reachEngineering}
            />
            <ReachCard
              icon={<IconPeople />}
              title="Careers"
              body="Explore roles and life at Lucas TVS."
              link={{ label: 'View Open Roles', href: COMPANY.careersPortal }}
              image={reachCareers}
            />
          </div>
        </div>
      </section>
    </PageShell>
  )
}

/**
 * A "reach us" card, after the client's 1 Oct reference: deep green, the
 * photograph on the right fading into the green, a pale lime icon tile,
 * white type and a lime-ringed arrow.
 *
 * The photographs are the reference's own, cropped to the picture half of
 * each card (src/assets/Contact). The whole card is the link — a bigger
 * target than the label alone — and it lifts slightly on hover.
 *
 * The copy column is held to 250px so it never runs far into the picture,
 * and a scrim darkens the picture's left edge wherever the two do meet.
 */
function ReachCard({
  icon,
  title,
  body,
  link,
  image,
  className = '',
}: {
  icon: ReactNode
  title: string
  body: string
  link: LinkTarget & { label: string }
  image: string
  className?: string
}) {
  return (
    <SmartLink
      to={link.to}
      href={link.href}
      className={`group relative isolate flex min-h-[270px] flex-col overflow-hidden rounded-[20px] bg-[#062a22] shadow-[0_18px_40px_rgba(6,42,34,0.18)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(6,42,34,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-deep motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[276px] ${className}`}
    >
      {/* The glow the reference carries into the top-left corner. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(85%_70%_at_0%_0%,rgba(23,108,77,0.55)_0%,rgba(6,42,34,0)_62%)]"
      />
      <img
        src={image}
        alt=""
        aria-hidden
        decoding="async"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-auto max-w-[62%] object-cover object-left transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_38%)] [mask-image:linear-gradient(to_right,transparent_0%,#000_38%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,42,34,0.9)_0%,rgba(6,42,34,0.55)_45%,rgba(6,42,34,0)_75%)]"
      />

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-[#e3f6b9] text-ink [&>svg]:h-[26px] [&>svg]:w-[26px]">
          {icon}
        </span>
        <h3 className="mt-5 max-w-[250px] font-display text-[21px] leading-[1.2] font-semibold text-white lg:text-[23px]">
          {title}
        </h3>
        <p className="mt-2.5 max-w-[235px] font-body text-[14px] leading-[1.55] text-white/85 lg:text-[15px]">
          {body}
        </p>
        <span className="mt-auto flex items-center gap-3 pt-6 font-body text-[15px] font-medium text-white">
          {link.label}
          <ArrowCircle tone="lime-on-dark" />
        </span>
      </div>
    </SmartLink>
  )
}

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-[14px] leading-[1.65] font-medium text-ink">
        {label}
      </label>
      {children(id)}
    </div>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-white text-ink">{icon}</span>
      <div className="flex flex-col gap-1">
        <dt className="font-mono text-[11px] tracking-[0.1em] text-green-deep uppercase">{label}</dt>
        <dd className="font-body text-[15px] leading-[1.55] text-ink">{children}</dd>
      </div>
    </div>
  )
}
