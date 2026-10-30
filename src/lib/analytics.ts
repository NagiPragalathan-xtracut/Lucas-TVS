/**
 * Google Analytics 4 under Consent Mode v2.
 *
 * Nothing loads until the visitor allows optional services in the privacy
 * banner, and nothing loads at all until a measurement ID is configured:
 * set VITE_GA4_ID (e.g. "G-XXXXXXXXXX") in the Vercel project's environment
 * variables and redeploy. Page views on client-side navigation come from
 * GA4's enhanced measurement ("page changes based on browser history
 * events"), which is on by default for a web stream, so the router needs no
 * hook of its own.
 */

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined
const SCRIPT_ID = 'lucas-tvs-gtag'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

// gtag.js expects the `arguments` object itself on the data layer, not an
// array copy — pushing a rest-parameter array silently drops every command.
const gtag: Gtag = function () {
  window.dataLayer = window.dataLayer ?? []
  // oxlint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

/** Applies the visitor's privacy choice; safe to call on every change. */
export function applyAnalyticsConsent(allowed: boolean) {
  if (!GA4_ID) return

  if (!allowed) {
    // Already loaded this visit (consent withdrawn): tell gtag to stop
    // storing anything. Not loaded: there is nothing to do.
    if (window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' })
    }
    return
  }

  if (document.getElementById(SCRIPT_ID)) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    return
  }

  window.gtag = gtag
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  gtag('js', new Date())
  gtag('config', GA4_ID, { anonymize_ip: true })

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
  document.head.appendChild(script)
}

/**
 * Records a GA4 event when analytics is running; a no-op otherwise. Used
 * for the enquiry form's `generate_lead` conversion.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.('event', name, params)
}
