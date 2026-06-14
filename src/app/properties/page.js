import PropertiesHero from '@/components/PropertiesHero/PropertiesHero';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { getProperties } from '@/lib/properties';
import styles from './properties.module.css';

export const revalidate = 60; // ISR: re-check OwnerRez every 60 seconds

export const metadata = {
  title: 'Our Properties | Coral & Cove 30A — Luxury Coastal Vacation Rentals',
  description:
    'Browse our curated collection of luxury vacation rental properties along Florida\'s iconic Highway 30A. Book direct and save on your coastal getaway.',
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <>
      <PropertiesHero />

      <section className={styles.listing}>
        <div className="container">
          <div className={styles.header}>
            <p className={styles.eyebrow}>Browse Our Collection</p>
            <h2 className={styles.title}>All Properties</h2>
            <p className={styles.subtitle}>
              Each home in our portfolio has been handpicked for its exceptional quality,
              prime location, and unforgettable coastal character.
            </p>
          </div>

          <div className={styles.grid}>
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>

          <div className={styles.cta}>
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Don&apos;t See What You&apos;re Looking For?</h3>
              <p className={styles.ctaText}>
                We&apos;re continually adding exceptional luxury homes to our curated collection.
                Contact our concierge team and we&apos;ll help find your perfect 30A escape.
              </p>
              <a href="/contact" className="btn-primary">
                <span>Contact Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
