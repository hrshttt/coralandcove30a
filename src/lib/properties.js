/**
 * Properties Data Layer
 *
 * This is the single entry point for all property data in the app.
 * It attempts to fetch live data from OwnerRez, falling back to
 * static enrichments data if the API is unavailable or unconfigured.
 *
 * All exports are async — pages must `await` them.
 */

import { fetchOwnerRezProperties } from './ownerrez';
import { enrichments, defaultEnrichment } from './enrichments';

/**
 * Static fallback properties built entirely from enrichments.
 * Used when OwnerRez API is unavailable or credentials are missing.
 */
function getStaticFallback() {
  return Object.entries(enrichments).map(([slug, data]) => ({
    slug,
    name: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    guests: 0,
    beds: 0,
    baths: 0,
    location: '30A, Florida',
    neighborhood: '',
    ownerrezId: null,
    images: data.images || [
      { src: '/images/hero_coastal_sunset_1781267807355.png', alt: `${slug} — coastal view` },
    ],
    tagline: data.tagline || defaultEnrichment.tagline,
    description: data.description || defaultEnrichment.description,
    price: data.price || defaultEnrichment.price,
    priceNote: data.priceNote || defaultEnrichment.priceNote,
    bookingUrl: data.bookingUrl || defaultEnrichment.bookingUrl,
    featured: data.featured ?? defaultEnrichment.featured,
    amenities: data.amenities || defaultEnrichment.amenities,
    reviews: data.reviews || defaultEnrichment.reviews,
    nearbyAttractions: data.nearbyAttractions || defaultEnrichment.nearbyAttractions,
  }));
}

// In-memory cache for the current request cycle
let _cachedProperties = null;

/**
 * Get all properties.
 * Tries OwnerRez API first, falls back to static enrichments data.
 */
export async function getProperties() {
  if (_cachedProperties) return _cachedProperties;

  const apiProperties = await fetchOwnerRezProperties();

  if (apiProperties && apiProperties.length > 0) {
    _cachedProperties = apiProperties;
    return apiProperties;
  }

  // Fallback: build from static enrichments
  console.info('[Properties] Using static fallback data');
  const fallback = getStaticFallback();
  _cachedProperties = fallback;
  return fallback;
}

/**
 * Get a single property by its slug.
 */
export async function getPropertyBySlug(slug) {
  const all = await getProperties();
  return all.find((p) => p.slug === slug) || null;
}

/**
 * Get featured properties only.
 */
export async function getFeaturedProperties() {
  const all = await getProperties();
  const featured = all.filter((p) => p.featured);
  // If no properties are marked featured, return the first 2
  return featured.length > 0 ? featured : all.slice(0, 2);
}

/**
 * Get all property slugs (for generateStaticParams).
 */
export async function getAllSlugs() {
  const all = await getProperties();
  return all.map((p) => p.slug);
}
