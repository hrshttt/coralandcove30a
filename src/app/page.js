import HeroSection from '@/components/HeroSection/HeroSection';
import OfferBanner from '@/components/OfferBanner/OfferBanner';
import IntroSection from '@/components/IntroSection/IntroSection';
import FeaturedProperties from '@/components/FeaturedProperties/FeaturedProperties';
import Experiences from '@/components/Experiences/Experiences';
import Testimonials from '@/components/Testimonials/Testimonials';
import ContactSection from '@/components/ContactSection/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OfferBanner />
      <IntroSection />
      <FeaturedProperties />
      <Experiences />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
