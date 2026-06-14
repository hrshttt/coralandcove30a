import Image from 'next/image';
import Link from 'next/link';
import styles from './PropertyCard.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';

export default function PropertyCard({ property, index = 0 }) {
  const staggerDelay = Math.min(index * 0.15, 0.6);

  return (
    <FadeIn delay={staggerDelay}>
      <Link href={`/properties/${property.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={property.images[0].src}
          alt={property.images[0].alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className={styles.image}
        />
        <div className={styles.priceTag}>
          <span className={styles.priceAmount}>{property.price}</span>
          <span className={styles.priceUnit}>/night</span>
        </div>
        {property.featured && <div className={styles.badge}>Featured</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.locationRow}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{property.location}</span>
        </div>

        <h3 className={styles.name}>{property.name}</h3>
        <p className={styles.tagline}>{property.tagline}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{property.guests} Guests</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4v16" />
              <path d="M2 8h18a2 2 0 0 1 2 2v10" />
              <path d="M2 17h20" />
              <path d="M6 8v9" />
            </svg>
            <span>{property.beds} Beds</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16a1 1 0 0 1 1 1v3H3v-3a1 1 0 0 1 1-1z" />
              <path d="M6 12V5a2 2 0 0 1 2-2h3v2.4a.4.4 0 0 0 .4.4h1.2a.4.4 0 0 0 .4-.4V3h3a2 2 0 0 1 2 2v7" />
              <path d="M3 16v3" />
              <path d="M21 16v3" />
            </svg>
            <span>{property.baths} Baths</span>
          </div>
        </div>

        <div className={styles.amenityPeek}>
          {property.amenities.slice(0, 3).map((a, i) => (
            <span key={i} className={styles.amenityTag}>{a.label}</span>
          ))}
        </div>

        <div className={styles.cta}>
          <span>View Property</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  </FadeIn>
);
}
