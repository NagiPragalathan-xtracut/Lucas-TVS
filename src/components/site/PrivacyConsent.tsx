import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Switch } from '@base-ui/react/switch'
import { ShieldCheck, X } from 'lucide-react'
import { COOKIE_TYPES } from '../../data/cookieTypes'
import { GA_MEASUREMENT_ID } from '../../lib/analytics'
import { ROUTES } from '../../lib/routes'

const STORAGE_KEY = 'lucas-tvs-cookie-consent'
const VERSION = 2
// A choice is asked for again after a year rather than kept forever.
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000
// v1 stored a single "external content" answer, which doesn't cover the
// policy's categories, so those visitors are asked again.
const LEGACY_KEY = 'lucas-tvs-privacy-choice-v1'
const BANNER_DELAY_MS = 6000

/** The optional categories. Strictly necessary is always on. */
export type Consent = { performance: boolean; targeting: boolean }

const NONE: Consent = { performance: false, targeting: false }
const ALL: Consent = { performance: true, targeting: true }

// What each category actually covers on this site, shown under the
// policy's own description of it.
const USED_FOR: Record<keyof typeof COOKIE_TYPES, string> = {
  necessary: 'Remembering the cookie choices you make here, for up to 12 months.',
  performance: GA_MEASUREMENT_ID ? 'Google Analytics.' : 'Nothing at present.',
  targeting:
    'The Google Map on our Contact page, which lets Google set its own cookies, including for advertising.',
}

type PrivacyContextValue = {
  /** What the visitor has allowed: all off until they choose, and while their browser sends Do Not Track. */
  consent: Consent
  openPrivacyChoices: () => void
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null)

// The policy promises to honour Do Not Track. Global Privacy Control is
// its successor and carries the same request.
function browserSaysDoNotTrack() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.doNotTrack === '1' || nav.globalPrivacyControl === true
}

function readSaved(): Consent | null {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null') as {
      version?: number
      performance?: unknown
      targeting?: unknown
      savedAt?: string
    } | null
    if (saved?.version !== VERSION) return null
    if (typeof saved.performance !== 'boolean' || typeof saved.targeting !== 'boolean') return null
    // A missing or unreadable date gives NaN, which fails this too.
    if (!(Date.now() - Date.parse(saved.savedAt ?? '') < MAX_AGE_MS)) return null
    return { performance: saved.performance, targeting: saved.targeting }
  } catch {
    return null
  }
}

/**
 * Cookie consent, laid out like the policy (Strictly Necessary,
 * Performance, Targeting):
 *
 *   - a banner on the first visit, a few seconds in: Reject all / Manage
 *     preferences / Accept all, equally weighted so neither is pushed,
 *   - a preferences panel with a switch per optional category,
 *   - once a choice exists, a "Privacy choices" button on every page to
 *     reopen the panel (the footer's "Cookie Settings" works throughout).
 *
 * Nothing optional runs until it is allowed: Google Analytics waits for
 * Performance (lib/analytics.ts via AnalyticsTracker), the Contact page
 * map for Targeting. With Do Not Track or Global Privacy Control on, both
 * stay off and there is nothing to ask, so no banner shows.
 *
 * The provider sits outside the router (App.tsx), so its links are plain
 * <a> tags.
 */
export function PrivacyConsentProvider({ children }: { children: ReactNode }) {
  const [doNotTrack] = useState(browserSaysDoNotTrack)
  const [saved, setSaved] = useState<Consent | null>(readSaved)
  const [view, setView] = useState<'banner' | 'preferences' | null>(null)

  // First-time visitors see the banner after a short delay, not on load.
  // Cleared once a choice exists, so an early answer is never re-prompted,
  // and it never replaces a preferences panel the visitor already opened.
  useEffect(() => {
    if (saved !== null || doNotTrack) return
    const timer = window.setTimeout(() => setView((v) => v ?? 'banner'), BANNER_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [saved, doNotTrack])

  const consent = doNotTrack ? NONE : (saved ?? NONE)

  const save = (choice: Consent) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: VERSION, ...choice, savedAt: new Date().toISOString() }),
      )
      window.localStorage.removeItem(LEGACY_KEY)
    } catch {
      // Storage unavailable: the choice still applies for this visit.
    }
    setSaved(choice)
    setView(null)
  }

  const openPrivacyChoices = () => setView('preferences')

  return (
    <PrivacyContext.Provider value={{ consent, openPrivacyChoices }}>
      {children}
      {view === 'banner' && (
        <ConsentBanner onRejectAll={() => save(NONE)} onManage={openPrivacyChoices} onAcceptAll={() => save(ALL)} />
      )}
      {view === 'preferences' && (
        <PreferencesDialog
          initial={consent}
          doNotTrack={doNotTrack}
          onSave={save}
          // Closed without choosing on a first visit: back to the banner.
          onClose={() => setView(saved === null && !doNotTrack ? 'banner' : null)}
        />
      )}
      {view === null && (saved !== null || doNotTrack) && (
        <button
          type="button"
          onClick={openPrivacyChoices}
          className="fixed bottom-4 left-4 z-[100] rounded-full border border-line bg-white px-4 py-2.5 font-body text-[12px] font-medium text-ink shadow-[0_8px_28px_rgba(0,0,0,0.14)] transition-colors hover:border-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
        >
          Privacy choices
        </button>
      )}
    </PrivacyContext.Provider>
  )
}

export function usePrivacyConsent() {
  const context = useContext(PrivacyContext)
  if (!context) throw new Error('usePrivacyConsent must be used within PrivacyConsentProvider')
  return context
}

const CHOICE_BUTTON =
  'rounded-full border border-green-deep bg-lime-tint px-4 py-2 font-body text-[12px] font-medium text-ink transition-colors hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep sm:text-[13px]'

function PolicyLink() {
  return (
    <a href={ROUTES.privacy} className="font-medium text-green-deep underline underline-offset-2">
      Privacy Policy
    </a>
  )
}

function ConsentBanner({
  onRejectAll,
  onManage,
  onAcceptAll,
}: {
  onRejectAll: () => void
  onManage: () => void
  onAcceptAll: () => void
}) {
  return (
    <section
      role="dialog"
      aria-labelledby="privacy-title"
      aria-describedby="privacy-description"
      className="fixed right-3 bottom-3 left-3 z-[100] mx-auto max-w-[1160px] rounded-[16px] border border-line-soft bg-white p-3 shadow-[0_16px_48px_rgba(0,0,0,0.2)] sm:p-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
        <div className="flex min-w-0 items-start gap-2.5">
          <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-lime-tint text-green-deep">
            <ShieldCheck className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </span>
          <div>
            <h2 id="privacy-title" className="font-display text-[15px] leading-[1.2] font-semibold text-ink">
              Cookie and privacy choices
            </h2>
            <p id="privacy-description" className="mt-1 font-body text-[11px] leading-[1.4] text-body sm:text-[12px]">
              We use strictly necessary cookies to make this site work. With your permission, we would
              also like to use optional performance and targeting cookies. You can change your choice at
              any time from Privacy choices. <PolicyLink />
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button type="button" onClick={onRejectAll} className={CHOICE_BUTTON}>
            Reject all
          </button>
          <button type="button" onClick={onManage} className={CHOICE_BUTTON}>
            Manage preferences
          </button>
          <button type="button" onClick={onAcceptAll} className={CHOICE_BUTTON}>
            Accept all
          </button>
        </div>
      </div>
    </section>
  )
}

/**
 * The per-category panel, in a native modal <dialog>: it traps focus,
 * closes on Esc and returns focus to wherever it was opened from. Changes
 * are a draft until saved; closing discards them.
 */
function PreferencesDialog({
  initial,
  doNotTrack,
  onSave,
  onClose,
}: {
  initial: Consent
  doNotTrack: boolean
  onSave: (choice: Consent) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState(initial)

  useEffect(() => {
    // Guarded: StrictMode runs this twice in development.
    if (ref.current && !ref.current.open) ref.current.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === e.currentTarget) ref.current?.close()
      }}
      aria-labelledby="cookie-preferences-title"
      data-lenis-prevent
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[640px] overflow-y-auto overscroll-contain rounded-[24px] bg-white p-0 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop:bg-black/55 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-[12px] font-semibold tracking-[0.16em] text-green-deep uppercase">
              Privacy choices
            </p>
            <h2 id="cookie-preferences-title" className="mt-2 font-display text-[24px] leading-[1.2] font-semibold text-ink">
              Cookie preferences
            </h2>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:border-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
          >
            <X aria-hidden strokeWidth={2} className="h-4 w-4" />
          </button>
        </div>

        <p className="font-body text-[14px] leading-[1.6] text-body">
          Choose which cookies we may use. Strictly necessary cookies are always on. You can change this
          at any time from Privacy choices. <PolicyLink />
        </p>

        {doNotTrack && (
          <p role="status" className="rounded-[12px] bg-lime-tint px-4 py-3 font-body text-[13px] leading-[1.5] text-ink">
            Your browser is sending a Do Not Track or Global Privacy Control signal, so performance and
            targeting cookies stay off.
          </p>
        )}

        <ul className="flex flex-col gap-3">
          <Category type="necessary" />
          <Category
            type="performance"
            checked={draft.performance}
            disabled={doNotTrack}
            onChange={(performance) => setDraft((d) => ({ ...d, performance }))}
          />
          <Category
            type="targeting"
            checked={draft.targeting}
            disabled={doNotTrack}
            onChange={(targeting) => setDraft((d) => ({ ...d, targeting }))}
          />
        </ul>

        <div className="flex flex-wrap items-center gap-2">
          {doNotTrack ? (
            <button type="button" onClick={() => ref.current?.close()} className={CHOICE_BUTTON}>
              Close
            </button>
          ) : (
            <>
              <button type="button" onClick={() => onSave(NONE)} className={CHOICE_BUTTON}>
                Reject all
              </button>
              <button type="button" onClick={() => onSave(draft)} className={CHOICE_BUTTON}>
                Save preferences
              </button>
              <button type="button" onClick={() => onSave(ALL)} className={CHOICE_BUTTON}>
                Accept all
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}

/** One category: the policy's name and wording, what it covers here, and its switch. */
function Category({
  type,
  checked,
  disabled,
  onChange,
}: {
  type: keyof typeof COOKIE_TYPES
  /** Omitted for strictly necessary, which can't be switched off. */
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}) {
  const titleId = useId()
  const { term, body } = COOKIE_TYPES[type]

  return (
    <li className="flex flex-col gap-2 rounded-[16px] border border-line-soft p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 id={titleId} className="font-display text-[16px] leading-[1.3] font-semibold text-ink">
          {term}
        </h3>
        {onChange ? (
          <Switch.Root
            checked={checked}
            onCheckedChange={(next) => onChange(next)}
            disabled={disabled}
            aria-labelledby={titleId}
            className="relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full bg-line p-[3px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep data-[checked]:bg-green-deep data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
          >
            <Switch.Thumb className="h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200 data-[checked]:translate-x-5" />
          </Switch.Root>
        ) : (
          <span className="shrink-0 font-body text-[12px] font-semibold text-green-deep">Always on</span>
        )}
      </div>
      <p className="font-body text-[13px] leading-[1.55] text-body">{body}</p>
      <p className="font-body text-[12px] leading-[1.5] text-body">
        <span className="font-semibold text-ink">Used on this site:</span> {USED_FOR[type]}
      </p>
    </li>
  )
}
