import { useId, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { ArrowRight, Box, Check, ChevronDown, FileText, Settings, X, type LucideIcon } from 'lucide-react'
import { solutionsCtaBg } from '../lib/assets'
import { ROUTES } from '../lib/routes'
import { useEnquiry } from '../lib/useEnquiry'
import { EnquiryStatusNote } from './site/EnquiryStatusNote'

const SOLUTIONS = ['Product', 'System', 'Engineering Service', 'Technology']
const INDUSTRIES = ['Automotive', 'Industrial', 'Defence & Aerospace', 'Not sure yet']
const REQUIREMENTS = ['Development', 'Validation & Testing', 'Integration', 'Support']

const FIELD =
  'h-[48px] w-full rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 font-body text-[15px] text-ink transition-colors duration-200 placeholder:text-body-soft focus:border-green-deep focus:outline-none'

/**
 * Home3's solutions CTA, rebuilt to the client's 14 Oct reference: a pale
 * panel with the transparent-EV artwork on the right, "Find the right
 * engineering solution", three dropdown cards (solution, industry,
 * requirement) and a get-started row. It replaces the tabbed solutions
 * finder (`SolutionsFinderHome3`, still in the repo, no longer mounted).
 *
 * Each dropdown card opens a styled listbox (Base UI Select — see
 * `PickCard`). Until something is picked the card shows the reference's
 * hint ("e.g. Product, System, Service").
 *
 * "Let's Get Started" opens the enquiry form in a native <dialog> with the
 * three picks carried in. Lenis is paused while it is open so the wheel
 * scrolls the dialog, not the page behind it.
 *
 * Like the Contact page form, it posts to the client's enquiries Google
 * Sheet (lib/useEnquiry.ts), tagged "Homepage – Let's Get Started", the
 * three picks included.
 */
export function LookingForHome3() {
  const [solution, setSolution] = useState('')
  const [industry, setIndustry] = useState('')
  const [requirement, setRequirement] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lenis = useLenis()
  // The picks are controlled, so `form.reset()` leaves them; clear them here.
  const { status, setStatus, onSubmit } = useEnquiry('Homepage – Let’s Get Started', () => {
    setSolution('')
    setIndustry('')
    setRequirement('')
  })

  // Driven imperatively rather than through an `open` state: the dialog's
  // own open flag is the single source of truth, so Esc, the close button
  // and a backdrop click can never leave React and the DOM disagreeing.
  const openForm = () => {
    if (status !== 'sending') setStatus('idle')
    dialogRef.current?.showModal()
    lenis?.stop()
  }

  const closeForm = () => {
    dialogRef.current?.close()
    lenis?.start()
  }

  return (
    <section id="solutions" className="shell-wide pt-12 pb-6 sm:py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[24px] border border-line-soft bg-[#f3f7f3]">
        {/* The artwork's left half is already pale, so on desktop the copy
            sits straight on it. Below lg the car would run under the copy,
            so it is anchored right and veiled. */}
        <img
          src={solutionsCtaBg}
          alt=""
          aria-hidden
          decoding="async"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[78%_center]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-white/80 lg:hidden" />

        <div className="relative max-w-[1040px] p-6 sm:p-10 lg:px-14 lg:py-16">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-green-deep" />
            <p className="font-body text-[12px] font-semibold tracking-[0.18em] text-green-deep uppercase">
              Explore our solutions
            </p>
          </div>
          {/* Same type as the homepage section headings ("Capabilities That Drive
              Innovation."): medium weight, 28 / 34 / 40px. */}
          <h2 className="mt-4 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Find the Right <span className="text-green-deep">Engineering Solution</span>
          </h2>
          <p className="mt-5 max-w-[580px] font-body text-[16px] leading-[1.55] text-body lg:max-w-none lg:text-[17px] xl:whitespace-nowrap">
            Tell us what you are looking for and we will connect you with the right team and
            expertise.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3 lg:gap-4">
            <PickCard
              icon={Box}
              title="Select Solution"
              hint="e.g. Product, System, Service"
              value={solution}
              options={SOLUTIONS}
              onChange={setSolution}
            />
            <PickCard
              icon={Settings}
              title="Select Industry"
              hint="e.g. Automotive, Defence"
              value={industry}
              options={INDUSTRIES}
              onChange={setIndustry}
            />
            <PickCard
              icon={FileText}
              title="Your Requirement"
              hint="e.g. Development, Support"
              value={requirement}
              options={REQUIREMENTS}
              onChange={setRequirement}
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              onClick={openForm}
              className="inline-flex h-[56px] items-center justify-center gap-2 self-start rounded-full sm:self-center bg-lime px-8 font-body text-[17px] font-medium text-ink shadow-[0_8px_22px_rgba(179,231,24,0.45)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
            >
              Let’s Get Started
              <ArrowRight aria-hidden strokeWidth={2} className="h-[18px] w-[18px]" />
            </button>
            <span aria-hidden className="hidden h-8 w-px bg-line sm:block" />
            <Link
              to={ROUTES.contact}
              className="group inline-flex items-center gap-2 self-start font-body text-[15px] sm:self-center text-ink transition-colors hover:text-green-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-deep"
            >
              Not sure? Talk to our engineering team
              <ArrowRight
                aria-hidden
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Enquiry modal ----------------------------------------------------- */}
      <dialog
        ref={dialogRef}
        onClose={() => lenis?.start()}
        onClick={(e) => {
          // A click on the dialog element itself (not its contents) is a
          // click on the backdrop.
          if (e.target === e.currentTarget) closeForm()
        }}
        aria-labelledby="looking-for-title"
        data-lenis-prevent
        className="m-auto w-[calc(100%-32px)] max-w-[600px] rounded-[24px] bg-white p-0 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop:bg-black/55 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-[12px] font-semibold tracking-[0.16em] text-green-deep uppercase">
                Talk to the engineering team
              </p>
              <h3 id="looking-for-title" className="mt-2 font-display text-[24px] leading-[1.2] font-semibold text-ink">
                Tell us a little more
              </h3>
            </div>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:border-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
            >
              <X aria-hidden strokeWidth={2} className="h-4 w-4" />
            </button>
          </div>

          {/* The three picks from the section, editable here too. */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Solution">
              {(id) => (
                <Select id={id} name="solution" value={solution} options={SOLUTIONS} onChange={setSolution} />
              )}
            </Field>
            <Field label="Industry">
              {(id) => (
                <Select id={id} name="industry" value={industry} options={INDUSTRIES} onChange={setIndustry} />
              )}
            </Field>
            <Field label="Requirement">
              {(id) => (
                <Select
                  id={id}
                  name="requirement"
                  value={requirement}
                  options={REQUIREMENTS}
                  onChange={setRequirement}
                />
              )}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              {(id) => <input id={id} name="name" required autoComplete="name" className={FIELD} />}
            </Field>
            <Field label="Work email">
              {(id) => <input id={id} name="email" type="email" required autoComplete="email" className={FIELD} />}
            </Field>
          </div>

          <Field label="Company">
            {(id) => <input id={id} name="company" autoComplete="organization" className={FIELD} />}
          </Field>

          <Field label="What do you need?">
            {(id) => (
              <textarea
                id={id}
                name="message"
                rows={3}
                placeholder="e.g. a 48V inverter for a two-wheeler programme"
                className="w-full resize-none rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 py-3 font-body text-[15px] text-ink transition-colors duration-200 placeholder:text-body-soft focus:border-green-deep focus:outline-none"
              />
            )}
          </Field>

          {/* Honeypot: hidden from people; the sheet script drops anything
              that fills it in. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex h-[50px] items-center justify-center gap-2 self-start rounded-full bg-lime px-7 font-body text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === 'sending' ? 'Sending…' : 'Send Request'}
            <ArrowRight aria-hidden strokeWidth={2} className="h-4 w-4" />
          </button>

          <EnquiryStatusNote status={status} />
        </form>
      </dialog>
    </section>
  )
}

/**
 * One dropdown card: icon tile, title, then the hint — or the chosen value
 * once there is one — and a chevron that turns while the menu is open.
 *
 * Built on Base UI's Select (14 Oct) rather than a native <select>: the
 * native option list is drawn by the OS and cannot be styled, which left a
 * cramped, unpadded list under a polished card. Base UI keeps the
 * listbox semantics — arrow keys, type-ahead, Enter/Esc, focus return —
 * while the menu itself matches the card: padded rows, a lime-tint
 * highlight and a check on the chosen item. Non-modal, so it never locks
 * the page (Lenis owns scrolling here).
 */
function PickCard({
  icon: Icon,
  title,
  hint,
  value,
  options,
  onChange,
}: {
  icon: LucideIcon
  title: string
  hint: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <BaseSelect.Root
      value={value || null}
      onValueChange={(v) => onChange((v as string | null) ?? '')}
      modal={false}
    >
      <BaseSelect.Trigger
        aria-label={value ? `${title}: ${value}` : title}
        className="group flex w-full cursor-pointer items-center gap-3 rounded-[16px] border border-line bg-white/85 px-3.5 py-3.5 text-left backdrop-blur-sm transition-[border-color,box-shadow] duration-200 outline-none hover:border-green-deep/40 focus-visible:border-green-deep focus-visible:shadow-[0_0_0_3px_rgba(35,143,56,0.18)] data-[popup-open]:border-green-deep data-[popup-open]:shadow-[0_0_0_3px_rgba(35,143,56,0.12)]"
      >
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-lime-tint text-green-deep"
        >
          <Icon strokeWidth={1.8} className="h-[20px] w-[20px]" />
        </span>
        <span className="flex min-w-0 grow flex-col">
          <span className="font-display text-[16px] leading-[1.25] font-semibold whitespace-nowrap text-ink">
            {title}
          </span>
          <span
            className={`truncate font-body text-[12.5px] leading-[1.4] ${value ? 'font-medium text-green-deep' : 'text-body'}`}
          >
            {value || hint}
          </span>
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
              {options.map((o) => (
                <BaseSelect.Item
                  key={o}
                  value={o}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3.5 py-2.5 font-body text-[14px] text-ink outline-none select-none data-[highlighted]:bg-lime-tint data-[selected]:font-medium data-[selected]:text-green-deep"
                >
                  <BaseSelect.ItemText>{o}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <Check aria-hidden strokeWidth={2.4} className="h-4 w-4 text-green-deep" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

function Select({
  id,
  name,
  value,
  options,
  onChange,
}: {
  id: string
  name: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <span className="relative block">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${FIELD} cursor-pointer appearance-none pr-10`}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-body"
      />
    </span>
  )
}

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-[14px] font-medium text-ink">
        {label}
      </label>
      {children(id)}
    </div>
  )
}
