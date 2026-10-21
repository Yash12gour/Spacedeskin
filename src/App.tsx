/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar, AppPageType } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Scroll3D } from './components/Scroll3D';
import { PageTransition } from './components/PageTransition';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StackContainer } from './components/stack/StackContainer';
import { StackCard } from './components/stack/StackCard';
import { SEO } from './components/SEO';
import { AnimatePresence } from 'motion/react';
import { WorkspaceItem } from './types';
import { useLenis } from './hooks/useLenis';

// Static imports for core landing page sections and interactive modals
import { Hero } from './components/Hero';
import { ValuesSection } from './components/ValuesSection';
import { ExploreSpacesSection } from './components/ExploreSpacesSection';
import { TestimonialSection } from './components/TestimonialSection';
import { PricingSection } from './components/PricingSection';
import { LocationsSection } from './components/LocationsSection';
import { StatsSection } from './components/StatsSection';
import { ContactSection } from './components/ContactSection';
import { BookTourModal } from './components/BookTourModal';
import { DayPassModal } from './components/DayPassModal';
import { SpaceDetailModal } from './components/SpaceDetailModal';
import { WhatsAppEnquiryModal } from './components/WhatsAppEnquiryModal';

// Robust helper function with retry and fallback mechanism for dynamic page imports
function lazyWithRetry<P = any>(
  importFn: () => Promise<any>,
  exportName?: string
): React.LazyExoticComponent<React.ComponentType<P>> {
  return lazy(async () => {
    let retries = 3;
    let delay = 300;
    while (retries > 0) {
      try {
        const module = await importFn();
        const Component = exportName
          ? (module[exportName] || module.default)
          : (module.default || Object.values(module)[0]);
        if (Component) return { default: Component };
        throw new Error(`Export ${exportName || 'default'} not found in module`);
      } catch (error) {
        retries--;
        if (retries === 0) {
          console.error(`Dynamic import failed for ${exportName || 'module'}:`, error);
          const FallbackComponent: React.FC<P> = () => (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center px-4">
              <p className="text-sm font-medium text-[var(--color-charcoal)]/70 mb-3">
                Unable to load this section. Please check your connection.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 text-xs font-semibold rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] hover:opacity-90 transition-opacity"
              >
                Reload Page
              </button>
            </div>
          );
          return { default: FallbackComponent };
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    return { default: () => null };
  });
}

// Lazy load multi-page route components for optimal initial bundle performance
const AboutPage = lazyWithRetry(() => import('./components/AboutPage'), 'AboutPage');
const ServicePage = lazyWithRetry(() => import('./components/ServicePage'), 'ServicePage');
const PricingPage = lazyWithRetry(() => import('./components/PricingPage'), 'PricingPage');
const ContactPage = lazyWithRetry(() => import('./components/ContactPage'), 'ContactPage');
const EventsPage = lazyWithRetry(() => import('./components/EventsPage'), 'EventsPage');
const AmenitiesPage = lazyWithRetry(() => import('./components/AmenitiesPage'), 'AmenitiesPage');
const BlogsPage = lazyWithRetry(() => import('./components/BlogsPage'), 'BlogsPage');
const GalleryPage = lazyWithRetry(() => import('./components/GalleryPage'), 'GalleryPage');
const FAQsPage = lazyWithRetry(() => import('./components/FAQsPage'), 'FAQsPage');
const PrivacyPolicyPage = lazyWithRetry(() => import('./components/PrivacyPolicyPage'), 'PrivacyPolicyPage');
const TermsOfServicePage = lazyWithRetry(() => import('./components/TermsOfServicePage'), 'TermsOfServicePage');
const CookiesPage = lazyWithRetry(() => import('./components/CookiesPage'), 'CookiesPage');

// Subtle fallback spinner for lazy components
const SectionFallback = () => (
  <div className="w-full py-12 flex items-center justify-center min-h-[120px]" aria-hidden="true">
    <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin opacity-60" />
  </div>
);

export default function App() {
  useLenis();
  const [currentPage, setCurrentPage] = useState<AppPageType>('home');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isDayPassModalOpen, setIsDayPassModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPlanName, setEnquiryPlanName] = useState<string | undefined>(undefined);
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceItem | null>(null);
  const [targetLocationId, setTargetLocationId] = useState<string | undefined>(undefined);
  const [targetWorkspaceId, setTargetWorkspaceId] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = useCallback((planName?: string) => {
    setEnquiryPlanName(planName);
    setIsEnquiryModalOpen(true);
  }, []);

  // Sync hash routing if user enters via URL hash or uses back/forward
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#hero' || hash === '#home' || hash === '#hero-section' || hash === '#' || hash === '') {
        return 'home';
      } else if (hash === '#about-page' || hash === '#about-us' || hash === '#about') {
        return 'about';
      } else if (hash === '#service' || hash === '#services' || hash === '#private-office-suites') {
        return 'service';
      } else if (hash === '#pricing' || hash === '#pricing-page' || hash === '#plans') {
        return 'pricing';
      } else if (hash === '#contact-page' || hash === '#contact-us') {
        return 'contact';
      } else if (hash === '#events' || hash === '#events-page' || hash === '#community-events') {
        return 'events';
      } else if (hash === '#amenities' || hash === '#amenities-page' || hash === '#amenities-and-perks') {
        return 'amenities';
      } else if (
        hash === '#blogs' ||
        hash === '#blog-page' ||
        hash === '#articles' ||
        hash.startsWith('#blog/') ||
        hash.startsWith('#blogs/') ||
        hash.startsWith('#article/') ||
        hash.startsWith('#blogs?')
      ) {
        return 'blogs';
      } else if (hash === '#gallery' || hash === '#gallery-page') {
        return 'gallery';
      } else if (hash === '#faqs' || hash === '#faq-page' || hash === '#help') {
        return 'faqs';
      } else if (hash === '#privacy' || hash === '#privacy-policy') {
        return 'privacy';
      } else if (hash === '#terms' || hash === '#terms-of-service' || hash === '#terms-and-conditions' || hash === '#tos') {
        return 'terms';
      } else if (hash === '#cookies' || hash === '#cookie-policy' || hash === '#cookie-settings') {
        return 'cookies';
      }
      return null;
    };

    const handleHashChange = () => {
      const targetPage = parseHash();
      if (targetPage) {
        setCurrentPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const initialTarget = parseHash();
    if (initialTarget) {
      setCurrentPage(initialTarget);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenTour = useCallback((locationId?: string, workspaceId?: string) => {
    setTargetLocationId(locationId);
    setTargetWorkspaceId(workspaceId);
    setIsTourModalOpen(true);
  }, []);

  const handleExploreSpaces = useCallback(() => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('spaces') || document.getElementById('workspaces');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const el = document.getElementById('spaces') || document.getElementById('workspaces');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentPage]);

  const handleNavigate = useCallback((page: AppPageType, targetSectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] flex flex-col font-[var(--font-sans)] selection:bg-[var(--color-primary)] selection:text-[var(--color-charcoal)]">
      {/* Visual Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Animated Architectural Preloader based on reference video */}
      <Preloader />

      {/* Sticky Minimal Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookTourClick={() => handleOpenTour()}
        onDayPassClick={() => setIsDayPassModalOpen(true)}
      />

      {/* Main Page Flow with ErrorBoundary Protection */}
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <AnimatePresence mode="wait">
            {currentPage === 'about' ? (
              <PageTransition pageKey="about" key="about">
                <AboutPage
                  onBookTourClick={() => handleOpenTour()}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'service' ? (
              <PageTransition pageKey="service" key="service">
                <ServicePage
                  onBookTourClick={(workspaceId?: string) => handleOpenTour(undefined, workspaceId)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'pricing' ? (
              <PageTransition pageKey="pricing" key="pricing">
                <PricingPage
                  onBookTourClick={(planName?: string) => handleOpenTour(undefined, planName)}
                  onEnquireClick={(planName?: string) => handleOpenEnquiry(planName)}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'contact' ? (
              <PageTransition pageKey="contact" key="contact">
                <ContactPage
                  onBookTourClick={(locationId?: string) => handleOpenTour(locationId)}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'events' ? (
              <PageTransition pageKey="events" key="events">
                <EventsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'amenities' ? (
              <PageTransition pageKey="amenities" key="amenities">
                <AmenitiesPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'blogs' ? (
              <PageTransition pageKey="blogs" key="blogs">
                <BlogsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'gallery' ? (
              <PageTransition pageKey="gallery" key="gallery">
                <GalleryPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'faqs' ? (
              <PageTransition pageKey="faqs" key="faqs">
                <FAQsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'privacy' ? (
              <PageTransition pageKey="privacy" key="privacy">
                <PrivacyPolicyPage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'terms' ? (
              <PageTransition pageKey="terms" key="terms">
                <TermsOfServicePage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'cookies' ? (
              <PageTransition pageKey="cookies" key="cookies">
                <CookiesPage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigatePage={(page: AppPageType) => handleNavigate(page)}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : (
              <PageTransition pageKey="home" key="home">
                <SEO
                  title="SpaceDesk Co-Working | Coworking Space in Bhopal, Misrod"
                  description="Coworking space in Bhopal with dedicated desks, private cabins and meeting rooms. Day pass from ₹499. 300 Mbps fiber and power backup. Book a free tour."
                  ogTitle="SpaceDesk Co-Working | Coworking Space in Bhopal, Misrod"
                  ogDescription="Coworking space in Bhopal with dedicated desks, private cabins and meeting rooms. Day pass from ₹499. 300 Mbps fiber and power backup. Book a free tour."
                  ogImage="/images/hero-modern-coworking-office.jpeg"
                  canonicalUrl="/"
                  jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'LocalBusiness',
                    name: 'SpaceDesk Co-Working',
                    url: 'https://spacedesk.in',
                    telephone: '+91 92329 42092',
                    email: 'info@spacedesk.in',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: 'Jaswant Tower, 4th Floor, Narmadapuram Road, Misrod',
                      addressLocality: 'Bhopal',
                      addressRegion: 'Madhya Pradesh',
                      postalCode: '462026',
                      addressCountry: 'IN',
                    },
                    openingHoursSpecification: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                      opens: '08:00',
                      closes: '21:00',
                    },
                  }}
                />
                {/* Section 1: Hero & Partner Row */}
                <Hero
                  onBookTourClick={() => handleOpenEnquiry()}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigate={handleNavigate}
                />

                <StackContainer>
                  <StackCard index={0} total={7}>
                    <ValuesSection />
                  </StackCard>
                  <StackCard index={1} total={7}>
                    <ExploreSpacesSection
                      onOpenBooking={(spaceId?: string) => handleOpenEnquiry(spaceId)}
                      onNavigate={(page: string) => handleNavigate(page as AppPageType)}
                      onSelectWorkspace={(workspace: WorkspaceItem | null) => setSelectedWorkspace(workspace)}
                      isModalOpen={isTourModalOpen || isDayPassModalOpen || isEnquiryModalOpen || selectedWorkspace !== null}
                    />
                  </StackCard>
                  <StackCard index={2} total={7}>
                    <TestimonialSection />
                  </StackCard>
                  <StackCard index={3} total={7}>
                    <PricingSection
                      onSelectPlan={(planId?: string) => {
                        if (planId === 'managed-office') {
                          handleOpenEnquiry('Managed Office');
                        } else {
                          handleOpenTour(undefined, planId);
                        }
                      }}
                    />
                  </StackCard>
                  <StackCard index={4} total={7}>
                    <LocationsSection
                      onBookTourAtLocation={(locId?: string) => handleOpenTour(locId)}
                    />
                  </StackCard>
                  <StackCard index={5} total={7}>
                    <StatsSection />
                  </StackCard>
                  <StackCard index={6} total={7}>
                    <ContactSection />
                  </StackCard>
                </StackContainer>
              </PageTransition>
            )}
          </AnimatePresence>
        </Suspense>
        </ErrorBoundary>
      </main>

      {/* Slim Minimal Footer */}
      <Footer onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Floating Scroll to Top button */}
      <ScrollToTop />

      {/* Floating Responsive WhatsApp Button (Bottom-Left) */}
      <WhatsAppButton />

      {/* Accessible Interactive Modals (Lazy Loaded with Suspense) */}
      <Suspense fallback={null}>
        <WhatsAppEnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={() => setIsEnquiryModalOpen(false)}
          initialPlanName={enquiryPlanName}
        />

        <BookTourModal
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          initialLocationId={targetLocationId}
          initialWorkspaceId={targetWorkspaceId}
        />

        <DayPassModal
          isOpen={isDayPassModalOpen}
          onClose={() => setIsDayPassModalOpen(false)}
        />

        <SpaceDetailModal
          workspace={selectedWorkspace}
          onClose={() => setSelectedWorkspace(null)}
          onBookTourForSpace={(workspaceId?: string) => handleOpenEnquiry(workspaceId)}
        />
      </Suspense>
    </div>
  );
}
