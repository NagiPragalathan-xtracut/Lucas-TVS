import ReactLenis from 'lenis/react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AnalyticsTracker } from './components/site/AnalyticsTracker'
import { PrivacyConsentProvider } from './components/site/PrivacyConsent'
import Home from './pages/Home'
import NewHome from './pages/NewHome'
import Home2 from './pages/Home2'
import Home3 from './pages/Home3'

import AboutPage from './pages/inner/AboutPage'
import CapabilitiesPage from './pages/inner/CapabilitiesPage'
import EngineeringRdPage from './pages/inner/EngineeringRdPage'
import TechnologiesPage from './pages/inner/TechnologiesPage'
import ProductsPage from './pages/inner/ProductsPage'
import ProductDetailPage from './pages/inner/ProductDetailPage'
import IndustriesPage from './pages/inner/IndustriesPage'
import IndustryPage from './pages/inner/IndustryPage'
import QualityPage from './pages/inner/QualityPage'
import SustainabilityPage from './pages/inner/SustainabilityPage'
import InsightsPage from './pages/inner/InsightsPage'
import ArticlePage from './pages/inner/ArticlePage'
import CareersPage from './pages/inner/CareersPage'
import ContactPage from './pages/inner/ContactPage'
import SearchPage from './pages/inner/SearchPage'
import PrivacyPolicyPage from './pages/inner/PrivacyPolicyPage'
import NotFoundPage from './pages/inner/NotFoundPage'

export default function App() {
  return (
    <PrivacyConsentProvider>
    <ReactLenis root>
      <BrowserRouter>
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
        {/* After <Routes>, so each page has set its title before the
            page view is sent. Loads nothing without Performance consent. */}
        <AnalyticsTracker />
      </BrowserRouter>
    </ReactLenis>
    </PrivacyConsentProvider>
  )
}
