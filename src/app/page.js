import HeroSection from '@/components/HeroSection/HeroSection';
import OfferBanner from '@/components/OfferBanner/OfferBanner';
import IntroSection from '@/components/IntroSection/IntroSection';
import FeaturedProperties from '@/components/FeaturedProperties/FeaturedProperties';
import Experiences from '@/components/Experiences/Experiences';
import Testimonials from '@/components/Testimonials/Testimonials';
import ContactSection from '@/components/ContactSection/ContactSection';

import { getCmsData } from '@/lib/cms';

export default async function Home() {
  const cmsData = getCmsData() || {};

  return (
    <main>
      <OfferBanner />
      <HeroSection content={cmsData.hero} />
      <IntroSection content={cmsData.intro} />
      <FeaturedProperties />
      <Experiences content={cmsData.experiences} />
      <Testimonials content={cmsData.testimonials} />
      <ContactSection content={cmsData.contact} />
    </main>
  );
}
