import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { setAnalyticsEnabled, trackPageView } from '../../lib/analytics'
import { usePrivacyConsent } from './PrivacyConsent'

/**
 * Starts or stops Google Analytics as Performance consent changes, and
 * sends a page view on each navigation while it is allowed (gtag only
 * sees the first page load of a single-page app on its own).
 *
 * Mounted inside the router, after <Routes>: effects run in tree order,
 * so the new page's PageShell has already set document.title.
 */
export function AnalyticsTracker() {
  const { consent } = usePrivacyConsent()
  const { pathname, search } = useLocation()

  useEffect(() => {
    setAnalyticsEnabled(consent.performance)
  }, [consent.performance])

  useEffect(() => {
    if (consent.performance) trackPageView(pathname + search)
  }, [consent.performance, pathname, search])

  return null
}
