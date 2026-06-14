import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProperties } from '@/lib/properties';
import styles from './FeaturedProperties.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  return (
    <section id="properties" className={styles.featured}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <h2 className={styles.title}>Featured Properties</h2>
            <p className={styles.subtitle}>Discover our handpicked selection of exceptional homes</p>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {properties.map((prop, index) => (
            <FadeIn key={prop.slug} delay={index * 0.15}>
              <div className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={prop.images[0].src}
                  alt={prop.images[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.badge}>Featured</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.propName}>{prop.name}</h3>
                <p className={styles.propLocation}>{prop.price}/night</p>
                <div className={styles.amenities}>
                  <span>{prop.guests} Guests</span>
                  <span className={styles.dot}>•</span>
                  <span>{prop.beds} Beds</span>
                  <span className={styles.dot}>•</span>
                  <span>{prop.baths} Baths</span>
                </div>
                <Link href={`/properties/${prop.slug}`} className={`btn-outline ${styles.cardBtn}`}>View Details</Link>
              </div>
            </div>
          </FadeIn>
          ))}
          
          <FadeIn delay={properties.length * 0.15}>
            <div className={`${styles.card} ${styles.comingSoonCard}`}>
            <div className={styles.comingSoonContent}>
              <h3 className={styles.comingSoonTitle}>More Properties<br/>Coming Soon</h3>
              <p className={styles.comingSoonText}>We are continually adding exceptional luxury homes to our curated collection.</p>
            </div>
          </div>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.2} className={styles.viewAll}>
          <Link href="/properties" className="btn-primary"><span>View All Properties</span></Link>
        </FadeIn>
      </div>
    </section>
  );
}
