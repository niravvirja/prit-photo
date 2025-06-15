
import React, { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

// Lazy load section components
const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header Navigation */}
      <Header />

      <Suspense fallback={<Loader />}>
        {/* Hero Section - Background theme */}
        <section id="hero" className="relative w-full">
          <Hero />
        </section>

        {/* Main Content Container */}
        <main className="relative w-full">
          {/* About Section - Primary background */}
          <section id="about" className="relative w-full">
            <About />
          </section>

          {/* Portfolio Section - Background theme */}
          <section id="portfolio" className="relative w-full">
            <Portfolio />
          </section>

          {/* Services Section - Primary background */}
          <section id="services" className="relative w-full">
            <Services />
          </section>

          {/* Reviews Section (Testimonials) - Background theme */}
          <section id="reviews" className="relative w-full">
            <Testimonials />
          </section>

          {/* Contact Section - Primary background */}
          <section id="contact" className="relative w-full">
            <Contact />
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
