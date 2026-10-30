import { lazy, Suspense } from 'react'
import ReactLenis from 'lenis/react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AnalyticsTracker } from './components/site/AnalyticsTracker'
import { PrivacyConsentProvider } from './components/site/PrivacyConsent'
import Home3 from './pages/Home3'

// Every page but the homepage is its own chunk (30 Oct, launch audit: the
// whole site was one ~980 KB bundle). Home3 stays eager so the landing page
// needs no second round trip; the rest load the first time they're visited.
const Home = lazy(() => import('./pages/Home'))
const NewHome = lazy(() => import('./pages/NewHome'))
const Home2 = lazy(() => import('./pages/Home2'))

const AboutPage = lazy(() => import('./pages/inner/AboutPage'))
const CapabilitiesPage = lazy(() => import('./pages/inner/CapabilitiesPage'))
const EngineeringRdPage = lazy(() => import('./pages/inner/EngineeringRdPage'))
const TechnologiesPage = lazy(() => import('./pages/inner/TechnologiesPage'))
const ProductsPage = lazy(() => import('./pages/inner/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/inner/ProductDetailPage'))
const IndustriesPage = lazy(() => import('./pages/inner/IndustriesPage'))
const IndustryPage = lazy(() => import('./pages/inner/IndustryPage'))
const QualityPage = lazy(() => import('./pages/inner/QualityPage'))
const SustainabilityPage = lazy(() => import('./pages/inner/SustainabilityPage'))
const InsightsPage = lazy(() => import('./pages/inner/InsightsPage'))
const ArticlePage = lazy(() => import('./pages/inner/ArticlePage'))
const CareersPage = lazy(() => import('./pages/inner/CareersPage'))
const ContactPage = lazy(() => import('./pages/inner/ContactPage'))
const SearchPage = lazy(() => import('./pages/inner/SearchPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/inner/PrivacyPolicyPage'))
const NotFoundPage = lazy(() => import('./pages/inner/NotFoundPage'))

export default function App() {
  return (
    <PrivacyConsentProvider>
    <ReactLenis root>
      <BrowserRouter>
        {/* Plain white, full-height: the pages all open on white, so a chunk
            still in flight shows as a blank page rather than a spinner or a
            footer jumping up the screen. */}
        <Suspense fallback={<div className="min-h-dvh bg-white" />}>
        <Routes>
          {/* Homepage variants. Home3 is the main homepage (30 Sep); the
              original main homepage moved to /home1. /home3 redirects to /
              rather than disappearing, so links already shared to it —
              reviews, the Vercel preview — keep working. */}
          <Route path="/" element={<Home3 />} />
          <Route path="/home1" element={<Home />} />
          <Route path="/new-home" element={<NewHome />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Navigate to="/" replace />} />

          {/* Inner pages. Paths are the values in lib/routes.ts — change
              them there and here together. The three industry pages share
              one component, driven by the :slug segment. */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/engineering-rd" element={<EngineeringRdPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<ArticlePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* Anything else. vercel.json already rewrites all paths to
              index.html, so a deep link to a dead URL reaches this rather
              than the host's own 404. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        {/* After <Routes>, so each page has set its title before the
            page view is sent. Loads nothing without Performance consent. */}
        <AnalyticsTracker />
      </BrowserRouter>
    </ReactLenis>
    </PrivacyConsentProvider>
  )
}
