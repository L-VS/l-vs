import React, { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocation } from 'wouter';
import { Hero } from '@/components/Hero';
import { ProjectGrid } from '@/components/ProjectGrid';
import { AboutSection } from '@/components/AboutSection';
import { ContactForm } from '@/components/ContactForm';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Handle anchor scrolling if URL has hash
    if (location.includes('#')) {
      const id = location.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-500">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />
      <main className="pt-16 sm:pt-20">
        <Hero />
        <ProjectGrid />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
