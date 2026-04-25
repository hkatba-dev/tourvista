import React from 'react';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import DestinationsSection from './components/DestinationsSection';
import PackagesSection from './components/PackagesSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import TripBuilderSection from './components/TripBuilderSection';
import CtaSection from './components/CtaSection';
import LandingFooter from './components/LandingFooter';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function HomeLandingPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <TripBuilderSection />
      <CtaSection />
      <LandingFooter />
      <FloatingWhatsApp />
    </main>
  );
}