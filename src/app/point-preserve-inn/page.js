import Image from 'next/image';
import Link from 'next/link';
import styles from './point-preserve.module.css';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import FadeIn from '@/components/FadeIn/FadeIn';

export const metadata = {
  title: 'Point Preserve Inn | Coral & Cove 30A',
  description: 'Experience the tranquility of a secluded woodland retreat at Point Preserve Inn. 24 new and beautiful condos just minutes from the sands of 30A.',
};

export default function PointPreservePage() {
  const galleryImages = [
    { src: '/images/pp_hero.png', alt: 'Point Preserve Inn exterior at twilight' },
    { src: '/images/pp_interior_2br.png', alt: 'Bright contemporary 2-bedroom condo living room' },
    { src: '/images/pp_interior_3br.png', alt: 'Spacious luxury 3-bedroom sanctuary with forest views' },
    { src: '/images/pp_events.png', alt: 'Beautifully secluded outdoor courtyard event setting' },
    { src: '/images/pp_nature.png', alt: 'Scenic coastal biking and hiking trail through a coastal forest' },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/pp_hero.png"
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
      </section>

      {/* Intro Section */}
      <section className={styles.section}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="accent-text" style={{ display: 'block', marginBottom: '1rem' }}>We have 24 New & Beautiful Condos</span>
            <h2>A Perfect Balance of Seclusion and Convenience</h2>
            <p>
              Welcome to Point Preserve, a serene and thoughtfully designed condominium community just minutes from the sugar-white sands and iconic beach towns of 30A. Surrounded by peaceful forest and coastal nature, these modern 2-bedroom and 3-bedroom condos offer a perfect balance of seclusion and convenience — tucked away from the congestion yet a short drive to Blue Mountain Beach, Seaside, WaterColor, Grayton Beach, Gulf Place, and local favorites like The Bay and North Beach Social.
            </p>
            <p>
              Each rental is newly built and styled with clean, contemporary finishes, premium linens, and fully equipped kitchens — ideal for families, couples, and groups seeking comfort and quality. Whether you choose a cozy 2-bedroom layout perfect for four guests or a spacious 3-bedroom sanctuary that sleeps up to six, you’ll enjoy thoughtful design and peaceful forest views that set the tone for relaxation on the Emerald Coast.
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
              <h3>Effortless Exploration</h3>
              <p>
                Set within a gated community just minutes from scenic biking and hiking trails, boutique shopping, and exceptional dining, Point Preserve makes it effortless to explore the best of Santa Rosa Beach. 
              </p>
              <p>
                After beach days or local adventures, return to an environment crafted for rest, privacy, and ease — a true boutique coastal escape that feels like your own slice of 30A.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className={styles.infoImageWrapper}>
              <Image
                src="/images/pp_nature.png"
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
              <h3>Curated Celebrations</h3>
              <p>
                Point Preserve offers a beautifully secluded outdoor setting ideal for intimate weddings, rehearsal dinners, welcome parties, corporate retreats, and curated celebrations. 
              </p>
              <p>
                Surrounded by natural greenery and peaceful forest views, our private rear grounds provide a serene backdrop for unforgettable moments on 30A.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className={styles.infoImageWrapper} style={{ direction: 'ltr' }}>
              <Image
                src="/images/pp_events.png"
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
            src="/images/pp_cta_bg.png"
            alt="Cozy twilight firepit on a condo balcony"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.ctaOverlay}></div>
        <FadeIn>
          <div className={`container ${styles.ctaContent}`}>
            <h2>Ready for Your Woodland Retreat?</h2>
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
