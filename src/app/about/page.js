import Link from 'next/link';
import Image from 'next/image';
import styles from './about.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';
import ParallaxImage from '@/components/ParallaxImage/ParallaxImage';

export const metadata = {
  title: 'About Us | Coral & Cove 30A — Luxury Coastal Vacation Rentals',
  description: 'Learn about Coral & Cove 30A, our founding story, and our commitment to elevating the luxury vacation rental experience along Florida\'s Emerald Coast.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <ParallaxImage
            src="/images/about_hero.png"
            alt="Luxury beach house at sunset on 30A"
            sizes="100vw"
            priority={true}
            containerClassName={styles.heroBackground}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>Our Story</span>
          <h1 className={styles.heroTitle}>Elevating the 30A Experience</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyLayout}`}>
          <FadeIn delay={0.1} className={styles.storyContent}>
            <h2>A Passion for Coastal Luxury</h2>
            <p>
              Coral &amp; Cove 30A was born out of a simple observation: the Emerald Coast is home to some of the most beautiful beaches in the world, yet finding a vacation rental experience that matches that beauty with uncompromising hospitality was surprisingly rare.
            </p>
            <p>
              We set out to change that by curating a highly selective portfolio of the finest homes along scenic Highway 30A. But we didn&apos;t stop at beautiful properties. We built a service model centered around genuine care, anticipatory service, and local expertise.
            </p>
            <p>
              Whether you&apos;re staying in Seaside, Rosemary Beach, or WaterColor, our mission is to ensure every moment of your coastal getaway is flawless, allowing you to focus on what truly matters: making memories with the people you love.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className={styles.storyImageWrapper}>
            <ParallaxImage
              src="/images/about_story.png"
              alt="Couple enjoying a luxury sunset walk on the beach"
              sizes="(max-width: 768px) 100vw, 50vw"
              containerClassName={styles.storyImageWrapper}
              speed={0.1}
            />
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <h2>The Coral &amp; Cove Difference</h2>
              <p>We believe true luxury lies in the details. These are the principles that guide everything we do.</p>
            </div>
          </FadeIn>
          
          <div className={styles.valuesGrid}>
            <FadeIn delay={0.1} className={styles.valueCard}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Curated Excellence</h3>
              <p>We hand-select every home in our portfolio, ensuring each property meets our rigorous standards for design, comfort, and premium amenities.</p>
            </FadeIn>
            
            <FadeIn delay={0.3} className={styles.valueCard}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21c-5-7-8-11.5-8-15.5A8 8 0 0 1 12 2a8 8 0 0 1 8 7.5c0 4-3 8.5-8 15.5z" />
                </svg>
              </div>
              <h3>Local Expertise</h3>
              <p>As locals who live and breathe 30A, we provide insider recommendations that transform a standard trip into a truly authentic coastal experience.</p>
            </FadeIn>

            <FadeIn delay={0.5} className={styles.valueCard}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <h3>White-Glove Service</h3>
              <p>From pre-arrival grocery stocking to booking private chefs and beach bonfires, our concierge team anticipates your needs before you even arrive.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <h2>Meet Your Host</h2>
              <p>The dedicated professional working behind the scenes to craft your perfect stay.</p>
            </div>
          </FadeIn>
          
          <div className={styles.teamGrid}>
            <FadeIn delay={0.1} className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <Image
                  src="/images/thomas-ta.png"
                  alt="Thomas Ta, Owner & Luxury Realtor"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <h3>Thomas Ta</h3>
              <p>Owner, Luxury Realtor &amp; Host</p>
              <div style={{ marginTop: '1rem', color: '#4a5568', lineHeight: 1.6, fontSize: '0.95rem', textTransform: 'none', letterSpacing: 'normal', fontFamily: 'var(--font-body)' }}>
                <p>Thomas is your all-in-one guide to the 30A experience. As the founder of Coral &amp; Cove and a luxury realtor, he ensures every detail of your stay is nothing short of exceptional.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <ParallaxImage
            src="/images/about_cta_bg.png"
            alt="Luxurious coastal patio at twilight"
            sizes="100vw"
            containerClassName={styles.ctaBackground}
          />
        </div>
        <div className={styles.ctaOverlay}></div>
        <FadeIn>
          <div className={`container ${styles.ctaContent}`}>
            <h2>Ready to Experience the Difference?</h2>
          <p>Browse our exclusive collection of luxury 30A properties or reach out to our concierge team to find your perfect match.</p>
            <p>Browse our exclusive collection of luxury 30A properties or reach out to our concierge team to find your perfect match.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Link href="/properties" className="btn-primary" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                <span>View Properties</span>
              </Link>
              <Link href="/contact" className="btn-outline" style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)', '&:hover': { color: 'var(--color-white)' } }}>
                Contact Concierge
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
