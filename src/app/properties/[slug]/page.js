import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPropertyBySlug, getAllSlugs } from '@/lib/properties';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import AmenitiesGrid from '@/components/AmenitiesGrid/AmenitiesGrid';
import PropertyReviews from '@/components/PropertyReviews/PropertyReviews';
import NearbyAttractions from '@/components/NearbyAttractions/NearbyAttractions';
import styles from './propertyDetail.module.css';

export const revalidate = 60; // ISR: re-check OwnerRez every 60 seconds
export const dynamicParams = true; // Allow new slugs not in generateStaticParams

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: `${property.name} | Coral & Cove 30A — Luxury Coastal Vacation Rentals`,
    description: `${property.tagline}. ${property.beds} beds, ${property.baths} baths, sleeps ${property.guests}. Book direct at Coral & Cove 30A.`,
  };
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/properties" className={styles.breadcrumbLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All Properties
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className={styles.gallerySection}>
        <div className="container">
          <ImageGallery images={property.images} />
        </div>
      </section>

      {/* Property Header */}
      <section className={styles.headerSection}>
        <div className="container">
          <div className={styles.headerGrid}>
            <div className={styles.headerInfo}>
              <div className={styles.locationBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{property.location}</span>
              </div>
              <h1 className={styles.propertyName}>{property.name}</h1>
              <p className={styles.tagline}>{property.tagline}</p>
            </div>

            <div className={styles.headerAction}>
              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>From</span>
                <div className={styles.priceRow}>
                  <span className={styles.priceAmount}>{property.price}</span>
                  <span className={styles.priceUnit}>/night</span>
                </div>
                <span className={styles.priceNote}>{property.priceNote}</span>
              </div>
              <a
                href={property.bookingUrl}
                className={`btn-primary ${styles.bookBtn}`}
              >
                <span>Book Direct &amp; Save</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{property.guests}</span>
                <span className={styles.statLabel}>Guests</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{property.beds}</span>
                <span className={styles.statLabel}>Bedrooms</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16a1 1 0 0 1 1 1v3H3v-3a1 1 0 0 1 1-1z" />
                <path d="M6 12V5a2 2 0 0 1 2-2h3v2.4a.4.4 0 0 0 .4.4h1.2a.4.4 0 0 0 .4-.4V3h3a2 2 0 0 1 2 2v7" />
                <path d="M3 16v3" />
                <path d="M21 16v3" />
              </svg>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{property.baths}</span>
                <span className={styles.statLabel}>Bathrooms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className={styles.descriptionSection}>
        <div className="container">
          <div className={styles.descriptionContent}>
            <h2 className={styles.sectionTitle}>About This Property</h2>
            <p className={styles.description}>{property.description}</p>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className={styles.amenitiesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Amenities &amp; Features</h2>
          <AmenitiesGrid amenities={property.amenities} />
        </div>
      </section>

      {/* Book Direct CTA */}
      <section className={styles.bookingSection}>
        <div className="container">
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2 className={styles.bookingTitle}>Ready to Book Your Stay?</h2>
              <p className={styles.bookingText}>
                Book directly with us and save on fees. Our concierge team is standing by to make your 30A vacation unforgettable.
              </p>
            </div>
            <div className={styles.bookingActions}>
              <div className={styles.bookingPrice}>
                <span className={styles.bookingPriceLabel}>Starting from</span>
                <div className={styles.bookingPriceRow}>
                  <span className={styles.bookingPriceAmount}>{property.price}</span>
                  <span className={styles.bookingPriceUnit}>/night</span>
                </div>
              </div>
              <a
                href={property.bookingUrl}
                className={`btn-primary ${styles.bookingBtn}`}
              >
                <span>Book Direct &amp; Save</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {property.reviews && property.reviews.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Guest Reviews</h2>
            <PropertyReviews reviews={property.reviews} />
          </div>
        </section>
      )}

      {/* Nearby Attractions */}
      <section className={styles.attractionsSection}>
        <div className="container">
          <div className={styles.attractionsLayout}>
            <div className={styles.attractionsHeader}>
              <h2 className={styles.sectionTitle}>Explore the 30A Area</h2>
              <p className={styles.attractionsSubtext}>
                Discover world-class dining, pristine state parks, and charming coastal towns — all within minutes of {property.name}.
              </p>
            </div>
            <NearbyAttractions attractions={property.nearbyAttractions} />
          </div>
        </div>
      </section>
    </div>
  );
}
