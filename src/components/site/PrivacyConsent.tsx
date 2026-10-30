import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { applyAnalyticsConsent } from '../../lib/analytics'

export const PRIVACY_POLICY_URL = 'https://lucas-tvs.com/privacy-policy/'

const STORAGE_KEY = 'lucas-tvs-privacy-choice-v1'
const BANNER_DELAY_MS = 6000

type PrivacyContextValue = {
  externalContentAllowed: boolean
  openPrivacyChoices: () => void
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null)

function readChoice(): boolean | null {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null') as {
      version?: number
      externalContent?: boolean
    } | null
    return saved?.version === 1 && typeof saved.externalContent === 'boolean'
      ? saved.externalContent
      : null
  } catch {
    return null
  }
}

export function PrivacyConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<boolean | null>(readChoice)
  const [open, setOpen] = useState(false)

  // First-time visitors see the banner after a short delay, not on load.
  // Cleared once a choice exists, so an early answer is never re-prompted.
  useEffect(() => {
    if (choice !== null) return
    const timer = window.setTimeout(() => setOpen(true), BANNER_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [choice])

  // Analytics follows the same choice: loaded on "allow", stopped on
  // "reject", and never loaded before an answer.
  useEffect(() => {
    if (choice !== null) applyAnalyticsConsent(choice)
  }, [choice])

  const saveChoice = (allowed: boolean) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, externalContent: allowed, savedAt: new Date().toISOString() }),
      )
    } catch {
      // The choice still applies for this visit when storage is unavailable.
    }
    setChoice(allowed)
    setOpen(false)
  }

  const openPrivacyChoices = () => setOpen(true)

  return (
    <PrivacyContext.Provider value={{ externalContentAllowed: choice === true, openPrivacyChoices }}>
      {children}
      {open ? (
        <section
          role="dialog"
          aria-labelledby="privacy-title"
          aria-describedby="privacy-description"
          className="fixed right-2 bottom-2 left-2 z-[100] mx-auto max-w-[1160px] rounded-[14px] border border-line-soft bg-white px-3 py-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.2)] sm:right-3 sm:bottom-3 sm:left-3 sm:rounded-[16px] sm:p-4"
        >
          {/* 30 Oct (launch audit): slimmer on phones, where it covered about
              a third of a 390x844 screen. Below `sm` the icon goes, the copy
              is a short summary, padding is tighter and the two buttons share
              one row at equal width. From `sm` up it is as before, with the
              full wording. Both buttons stay equally prominent, so rejecting
              is as easy as allowing. */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
            <div className="flex min-w-0 items-start gap-2.5">
              <span aria-hidden className="hidden h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-lime-tint text-green-ink sm:grid">
                <ShieldCheck className="h-[17px] w-[17px]" strokeWidth={1.8} />
              </span>
              <div>
                <h2 id="privacy-title" className="font-display text-[14px] leading-[1.2] font-semibold text-ink sm:text-[15px]">
                  Cookie and privacy choices
                </h2>
                <p id="privacy-description" className="mt-1 font-body text-[12px] leading-[1.4] text-body">
                  {/* Same facts at two lengths; the short one is for phones. */}
                  <span className="sm:hidden">
                    Optional Google services (Maps, analytics) may share data with Google and set
                    cookies. We save your choice.{' '}
                  </span>
                  <span className="hidden sm:inline">
                    We save your choice. Optional Google services (Maps, analytics) may share data
                    with Google and set cookies. Change this any time using Privacy choices. Read
                    our{' '}
                  </span>
                  <a
                    href={PRIVACY_POLICY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-green-ink underline underline-offset-2 hover:text-ink"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => saveChoice(false)}
                className="min-h-9 rounded-full border border-green-deep bg-lime-tint px-4 py-1.5 font-body text-[12px] font-medium text-ink transition-colors hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep sm:py-2"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => saveChoice(true)}
                className="min-h-9 rounded-full border border-green-deep bg-lime-tint px-4 py-1.5 font-body text-[12px] font-medium text-ink transition-colors hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep sm:py-2"
              >
                Allow optional
              </button>
            </div>
          </div>
        </section>
      ) : choice === null ? null : (
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
