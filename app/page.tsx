import Navbar from '@/app/components/landing/Navbar';
import Hero from '@/app/components/landing/Hero';
import FeaturesGrid from '@/app/components/landing/FeaturesGrid';
import ActionFeaturesSection from '@/app/components/landing/ActionFeaturesSection';
import IntegrationSection from '@/app/components/landing/IntegrationSection';
import Testimonial from '@/app/components/landing/Testimonial';
import CTASection from '@/app/components/landing/CTASection';
import Footer from '@/app/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen font-sans" style={{ fontFamily: 'var(--font-sans)' }}>
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <ActionFeaturesSection />
        <IntegrationSection />
        <Testimonial />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
