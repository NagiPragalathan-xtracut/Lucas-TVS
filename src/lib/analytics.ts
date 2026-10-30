/**
 * Google Analytics 4, behind the "Performance cookies" consent.
 *
 * Nothing loads until a visitor allows Performance cookies in the privacy
 * choices (components/site/PrivacyConsent.tsx), and never while their
 * browser sends Do Not Track / Global Privacy Control. Withdrawing consent
 * switches GA off with its own kill flag and deletes its cookies.
 *
 * Set the GA4 Measurement ID ("G-XXXXXXXXXX") to switch it on. While this
 * is empty nothing loads at all, and the preferences panel lists no
 * analytics tool, so the site never claims tracking it doesn't do.
 */
export const GA_MEASUREMENT_ID = ''

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

export function setAnalyticsEnabled(enabled: boolean) {
  if (!GA_MEASUREMENT_ID) return
  // GA's documented opt-out: while set, gtag.js sends nothing.
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !enabled

  if (!enabled) {
    clearAnalyticsCookies()
    return
  }
  if (loaded) return
  loaded = true

  window.dataLayer = window.dataLayer ?? []
  // gtag.js reads the `arguments` object itself, not an array of them.
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  // Page views are sent by AnalyticsTracker on each route change.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function trackPageView(path: string) {
  if (!loaded) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

// GA's cookies (_ga, _ga_<id>, _gid) are set on this host or a parent
// domain; expire them on each, since a cookie only clears on the domain
// it was set for.
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name.startsWith('_ga') || name === '_gid')
  if (names.length === 0) return

  const parts = window.location.hostname.split('.')
  const domains = ['']
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join('.')}`)

  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain}`
  }
}
