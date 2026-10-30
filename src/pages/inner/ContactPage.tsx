import { useId, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Select as BaseSelect } from '@base-ui/react/select'
import { ChevronDown, Settings } from 'lucide-react'
import { EnquiryStatusNote } from '../../components/site/EnquiryStatusNote'
import { PageShell } from '../../components/site/PageShell'
import { usePrivacyConsent } from '../../components/site/PrivacyConsent'
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
import { FIELD_LIMITS, useEnquiry } from '../../lib/useEnquiry'

const ADDRESS =
  'India Nippon Electricals Limited (INEL) R&D Tech Center, Plot No-137, Phase-1, SIPCOT Industrial Complex, Hosur, Tamil Nadu - 635126'

/**
 * Google's keyless embed, searching for the address above. No API key or
 * account involved; the frame carries its own "View larger map" link.
 */
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`

/**
 * The same search on google.com in a new tab — offered while the embed is
 * blocked (no Targeting consent), since opening it is the visitor's own
 * click rather than something the page loads for them.
 */
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

// 16px text: anything smaller and iOS Safari zooms the page when a field
// takes focus (launch audit; was 15px).

const FIELD =
  'h-[50px] w-full rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 font-body text-[16px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none'

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
  const [industry, setIndustry] = useState('Automotive')
  const { status, onSubmit } = useEnquiry('Contact page', () => setIndustry('Automotive'))
  const { consent, openPrivacyChoices } = usePrivacyConsent()

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

            {/* Required fields carry a visible asterisk (see `Field`) as well
                as `required`; lengths are capped to match what useEnquiry
                sends and the sheet keeps (launch audit). */}
            <p className="-mt-2 font-body text-[13px] text-body">
              Fields marked <RequiredMark /> are required.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" required>
                {(id) => (
                  <input
                    id={id}
                    name="name"
                    required
                    aria-required
                    maxLength={FIELD_LIMITS.name}
                    autoComplete="name"
                    className={FIELD}
                  />
                )}
              </Field>
              <Field label="Company">
                {(id) => (
                  <input
                    id={id}
                    name="company"
                    maxLength={FIELD_LIMITS.company}
                    autoComplete="organization"
                    className={FIELD}
                  />
                )}
              </Field>
              <Field label="Work email" required>
                {(id) => (
                  <input
                    id={id}
                    name="email"
                    type="email"
                    required
                    aria-required
                    maxLength={FIELD_LIMITS.email}
                    autoComplete="email"
                    className={FIELD}
                  />
                )}
              </Field>
              <Field label="Phone">
                {(id) => (
                  <input
                    id={id}
                    name="phone"
                    type="tel"
                    maxLength={FIELD_LIMITS.phone}
                    autoComplete="tel"
                    className={FIELD}
                  />
                )}
              </Field>
            </div>

            <IndustrySelect value={industry} onChange={setIndustry} />

            <Field label="How can we help?" required>
              {(id) => (
                // 144px, not the reference's written 120: its textarea is
                // content-box, so the drawn box is 120 plus padding and
                // border. Tailwind boxes are border-box; this is the height
                // the reference actually renders.
                <textarea
                  id={id}
                  name="message"
                  required
                  aria-required
                  maxLength={FIELD_LIMITS.message}
                  className="h-[144px] w-full resize-none rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 py-3 font-body text-[16px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none"
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

            <p className="font-body text-[13px] leading-[1.5] text-body">
              By submitting you agree to our{' '}
              <Link
                to={ROUTES.privacy}
                className="font-medium text-green-ink underline underline-offset-2 hover:text-ink"
              >
                Privacy Policy
              </Link>
              . We typically respond within two working days.
            </p>
          </form>

          {/* Details --------------------------------------------------- */}
          <div className="flex min-w-0 grow flex-col gap-5">
            {/* A plain wrapper: each Detail row is its own <dl> (see there). */}
            <div className="flex flex-col gap-[22px] rounded-[24px] bg-lime-tint p-[22px] lg:p-8">
              <Detail icon={<IconPin />} label="Address">
                {ADDRESS}
              </Detail>
              <Detail icon={<IconPhone />} label="Phone">
                <a href={COMPANY.phoneHref} className="transition-colors hover:text-green-ink">
                  {COMPANY.phone}
                </a>
              </Detail>
              <Detail icon={<IconMail />} label="Email">
                <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-green-ink">
                  {COMPANY.email}
                </a>
              </Detail>
            </div>
            {/* Fixed height on a phone, where the columns stack; from lg
                it grows into the rest of the column. The frame is absolutely
                placed so it always fills the box, whatever height that is. */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] border-[1.5px] border-line-soft bg-surface-mute lg:h-auto lg:min-h-[300px] lg:flex-1">
              {/* Google can use the embed's cookies for advertising, so it
                  waits for Targeting consent. */}
              {consent.targeting ? (
                <iframe
                  src={MAP_EMBED}
                  title="Map — INEL R&D Tech Center, SIPCOT Industrial Complex, Hosur"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <p className="max-w-[320px] font-body text-[14px] leading-[1.5] text-body">
                    The map is hidden because it uses Google’s targeting cookies. Allow them in
                    Privacy choices, or open the address on Google Maps.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={openPrivacyChoices}
                      className="rounded-full border border-green-deep px-5 py-2 font-body text-[13px] font-medium text-green-ink transition-colors hover:bg-lime-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                    >
                      Privacy choices
                    </button>
                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-green-deep px-5 py-2 font-body text-[13px] font-medium text-green-ink transition-colors hover:bg-lime-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>
              )}
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

/**
 * The visible required marker. Decorative to assistive tech — the input's
 * own `required` is what a screen reader announces.
 */
function RequiredMark() {
  return (
    <span aria-hidden className="font-semibold text-[#b42318]">
      *
    </span>
  )
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string
  /** Shows the asterisk; the input itself still needs `required`. */
  required?: boolean
  children: (id: string) => ReactNode
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-[14px] leading-[1.65] font-medium text-ink">
        {label}
        {required && <> <RequiredMark /></>}
      </label>
      {children(id)}
    </div>
  )
}

const INDUSTRY_OPTIONS = ['Automotive', 'Industrial', 'Defence & Aerospace', 'Other']

function IndustrySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <BaseSelect.Root value={value} onValueChange={(next) => onChange((next as string | null) ?? '')} modal={false}>
      <input type="hidden" name="industry" value={value} />
      <BaseSelect.Trigger
        aria-label={value ? `Industry: ${value}` : 'Select Industry'}
        className="group flex w-full cursor-pointer items-center gap-3 rounded-[16px] border border-line bg-white/85 px-3.5 py-3.5 text-left backdrop-blur-sm transition-[border-color,box-shadow] duration-200 outline-none hover:border-green-deep/40 focus-visible:border-green-deep focus-visible:shadow-[0_0_0_3px_rgba(35,143,56,0.18)] data-[popup-open]:border-green-deep data-[popup-open]:shadow-[0_0_0_3px_rgba(35,143,56,0.12)]"
      >
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-lime-tint text-green-ink">
          <Settings strokeWidth={1.8} className="h-[20px] w-[20px]" />
        </span>
        <span className="flex min-w-0 grow flex-col">
          <span className="font-display text-[16px] leading-[1.25] font-semibold text-ink">Select Industry</span>
          <span className="truncate font-body text-[13px] leading-[1.4] font-medium text-green-ink">{value}</span>
        </span>
        <ChevronDown
          aria-hidden
          strokeWidth={2}
          className="h-[18px] w-[18px] shrink-0 text-ink transition-transform duration-200 group-data-[popup-open]:rotate-180"
        />
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner alignItemWithTrigger={false} sideOffset={8} className="z-50 outline-none">
          <BaseSelect.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-[16px] border border-line-soft bg-white p-1.5 shadow-[0_18px_44px_rgba(0,0,0,0.12)] outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <BaseSelect.List>
              {INDUSTRY_OPTIONS.map((option) => (
                <BaseSelect.Item
                  key={option}
                  value={option}
                  className="flex cursor-pointer items-center rounded-[10px] px-3.5 py-2.5 font-body text-[14px] text-ink outline-none select-none data-[highlighted]:bg-lime-tint data-[selected]:bg-lime-tint"
                >
                  <BaseSelect.ItemText>{option}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-white text-ink">{icon}</span>
      {/* Its own <dl>, so the icon tile beside it is not a stray child of
          a description list (launch audit). */}
      <dl className="flex flex-col gap-1">
        <dt className="font-mono text-[12px] tracking-[0.1em] text-green-ink uppercase">{label}</dt>
        <dd className="font-body text-[15px] leading-[1.55] text-ink">{children}</dd>
      </dl>
    </div>
  )
}
