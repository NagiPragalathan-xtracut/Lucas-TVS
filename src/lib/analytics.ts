/** Optional measurement tools start only after Performance consent. */
export const GA_MEASUREMENT_ID = 'G-NRM9VL9YXQ'
export const GTM_CONTAINER_ID = 'GTM-TRS8MDV8'
export const CLARITY_PROJECT_ID = 'z7t3ml7tfm'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

let enabled = false
let googleReady = false
let gaLoaded = false
let gtmLoaded = false
let clarityLoaded = false

function initializeGoogle() {
  if (googleReady) return
  googleReady = true
  window.dataLayer = window.dataLayer ?? []
  // gtag.js consumes the arguments object, not an array.
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

export function setAnalyticsEnabled(allow: boolean) {
  initializeGoogle()
  window.gtag?.('consent', 'update', {
    analytics_storage: allow ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  const wasEnabled = enabled
  enabled = allow
  // GA's documented opt-out: while set, gtag.js sends nothing.
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !allow

  if (!allow) {
    clearAnalyticsCookies()
    if (clarityLoaded && wasEnabled) window.clarity?.('consent', false)
    return
  }
  if (!gtmLoaded) {
    gtmLoaded = true
    window.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`)
  }
  if (!gaLoaded) {
    gaLoaded = true
    window.gtag?.('js', new Date())
    // AnalyticsTracker sends page views on each route change.
    window.gtag?.('config', GA_MEASUREMENT_ID, { send_page_view: false })
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`)
  }
  if (!clarityLoaded) {
    clarityLoaded = true
    window.clarity = function clarity(...args: unknown[]) {
      ;(window.clarity as typeof window.clarity & { q?: unknown[][] }).q ??= []
      ;(window.clarity as typeof window.clarity & { q: unknown[][] }).q.push(args)
    }
    loadScript(`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`)
  }
  if (!wasEnabled) {
    window.clarity?.('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'granted',
    })
  }
}

export function trackPageView(path: string) {
  if (!enabled || !gaLoaded) return
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

/**
 * Records a GA4 event once analytics is running; a no-op otherwise. Used
 * for the enquiry form's `generate_lead` conversion (launch audit).
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!enabled || !gaLoaded) return
  window.gtag?.('event', name, params)
}
