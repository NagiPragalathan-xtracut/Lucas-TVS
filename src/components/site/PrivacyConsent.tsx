import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'

const STORAGE_KEY = 'lucas-tvs-privacy-choice-v1'
const GOOGLE_FONTS_ID = 'lucas-tvs-google-fonts'
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:wght@600&family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Open+Sans:wght@400;600&family=Poppins:wght@400;500;600&display=swap'

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
  const [open, setOpen] = useState(() => readChoice() === null)

  useEffect(() => {
    if (choice !== true) {
      document.getElementById(GOOGLE_FONTS_ID)?.remove()
      return
    }
    if (document.getElementById(GOOGLE_FONTS_ID)) return
    const link = document.createElement('link')
    link.id = GOOGLE_FONTS_ID
    link.rel = 'stylesheet'
    link.href = GOOGLE_FONTS_URL
    document.head.appendChild(link)
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
                  We save your choice. Optional Google Fonts and Maps may share data with Google and set cookies. Change this any time using Privacy choices.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => saveChoice(false)}
                className="rounded-full border border-green-deep bg-lime-tint px-4 py-2 font-body text-[12px] font-medium text-ink transition-colors hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => saveChoice(true)}
                className="rounded-full border border-green-deep bg-lime-tint px-4 py-2 font-body text-[12px] font-medium text-ink transition-colors hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
              >
                Allow optional
              </button>
            </div>
          </div>
        </section>
      ) : (
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
