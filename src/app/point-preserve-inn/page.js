import Image from 'next/image';
import Link from 'next/link';
import styles from './point-preserve.module.css';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import FadeIn from '@/components/FadeIn/FadeIn';
import BookingWidget from '@/components/BookingWidget/BookingWidget';

export const metadata = {
  title: 'Point Preserve Inn | Coral & Cove 30A',
  description: 'Experience the tranquility of a secluded woodland retreat at Point Preserve Inn. 24 new and beautiful condos just minutes from the sands of 30A.',
};

export default function PointPreservePage() {
  const galleryImages = Array.from({ length: 20 }, (_, i) => ({
    src: `/pointpreserve/${i + 1}.jpg`,
    alt: `Point Preserve Inn view ${i + 1}`
  }));

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/pointpreserve/1.jpg"
            alt="Point Preserve Inn Condominium Community"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>Travel Collection</span>
          <h1 className={styles.heroTitle}>Welcome to Point Preserve Inn</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Experience the Tranquility of a Secluded Woodland Retreat.
          </p>
        </div>
        <BookingWidget />
      </section>

      {/* Intro Section */}
      <section className={styles.section}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="accent-text" style={{ display: 'block', marginBottom: '1rem' }}>We have 24 New & Beautiful Condos</span>
              <h2>A Perfect Balance of Seclusion and Convenience</h2>
              <p>
                Tucked against a quiet coastal forest, Point Preserve offers 24 brand-new, architecturally striking residences just minutes from the energy of 30A. It’s an enclave designed for those who want immediate access to Blue Mountain Beach and Seaside, but demand a private, quiet retreat at the end of the day.
              </p>
              <p>
                Inside, expect sharp contemporary finishes, premium linens, and uncompromising comfort. Whether you choose a cozy 2-bedroom layout perfect for four guests or a spacious 3-bedroom sanctuary that sleeps up to six, you’ll enjoy thoughtful design and peaceful forest views that set the tone for relaxation.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Interactive Photo Viewer */}
      <section className={styles.gallerySection}>
        <FadeIn>
          <div className={styles.sectionHeader}>
            <h2>Tour Point Preserve Inn</h2>
            <p>Explore the boutique coastal escape that feels like your own slice of 30A.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2} className={styles.galleryContainer}>
          <ImageGallery images={galleryImages} />
        </FadeIn>
      </section>

      {/* Location & Lifestyle */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.infoGrid}>
            <FadeIn delay={0.1} className={styles.infoContent}>
              <h3>Immediate Access, Total Privacy</h3>
              <p>
                Located inside a private gated community, you are minutes from 30A's best biking trails, independent boutiques, and dining.
              </p>
              <p>
                After a day in the sun, retreat to an environment engineered for quiet and rest—a true boutique coastal escape that feels like your own slice of 30A.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className={styles.infoImageWrapper}>
              <Image
                src="/pointpreserve/1.jpg"
                alt="Scenic 30A Biking Trail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.sectionDark}>
        <div className="container">
          <div className={styles.infoGrid} style={{ direction: 'rtl' }}>
            <FadeIn delay={0.1} className={styles.infoContent} style={{ direction: 'ltr' }}>
              <h3>Private Gatherings</h3>
              <p>
                The rear grounds border a dense natural forest, providing a highly private, lush backdrop for intimate weddings, rehearsal dinners, and corporate retreats.
              </p>
              <p>
                Surrounded by natural greenery, our outdoor spaces provide a serene and secluded setting for unforgettable moments on 30A.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className={styles.infoImageWrapper} style={{ direction: 'ltr' }}>
              <Image
                src="/pointpreserve/2.jpg"
                alt="Outdoor event setting at twilight"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <Image
            src="/pointpreserve/4.jpg"
            alt="Cozy twilight firepit on a condo balcony"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.ctaOverlay}></div>
        <FadeIn>
          <div className={`container ${styles.ctaContent}`}>
            <h2>Secure Your Residence at Point Preserve.</h2>
            <p>
              Choose from our collection of modern 2-bedroom and 3-bedroom sanctuary condos.
            </p>
            <a href="https://pointpreserve.com/lodging" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <span>Reserve Your Stay Here</span>
            </a>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
