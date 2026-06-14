/**
 * OwnerRez API Client
 *
 * Fetches property data from the OwnerRez v2 API and transforms it
 * into our internal property shape, merging with local enrichments
 * and AI-generated content stored in a local JSON file (Hostinger-compatible).
 *
 * Environment variables required:
 *   OWNERREZ_API_EMAIL  — your OwnerRez account email
 *   OWNERREZ_API_TOKEN  — personal access token from OwnerRez settings
 */

import fs from 'fs/promises';
import path from 'path';
import { enrichments, defaultEnrichment } from './enrichments';
import { generatePropertyEnrichment } from './ai-generator';

const API_BASE = 'https://api.ownerrez.com/v2';
const DATA_DIR = path.join(process.cwd(), 'data');
const ENRICHMENTS_FILE = path.join(DATA_DIR, 'generated-enrichments.json');

/**
 * Helper to get all locally generated enrichments from the JSON file.
 */
async function getGeneratedEnrichmentsDB() {
  try {
    const data = await fs.readFile(ENRICHMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty object
    return {};
  }
}

/**
 * Helper to save generated enrichments back to the JSON file.
 */
async function saveGeneratedEnrichmentDB(slug, enrichmentData) {
  try {
    // Ensure the data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Read existing
    const db = await getGeneratedEnrichmentsDB();
    
    // Update
    db[slug] = enrichmentData;
    
    // Write back
    await fs.writeFile(ENRICHMENTS_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error(`[AI Generator] Failed to save enrichment to local disk for ${slug}:`, error);
  }
}

/**
 * Generate a URL-safe slug from a property name.
 * "Key Lime Pie" → "key-lime-pie"
 */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Build Basic Auth header from env credentials.
 */
function getAuthHeaders() {
  const email = process.env.OWNERREZ_API_EMAIL;
  const token = process.env.OWNERREZ_API_TOKEN;

  if (!email || !token || email === 'your-email@example.com') {
    return null;
  }

  const credentials = Buffer.from(`${email}:${token}`).toString('base64');

  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'CoralAndCove30A/1.0',
  };
}

/**
 * Fetch raw property list from OwnerRez API.
 * Returns the JSON response or null on failure.
 */
async function fetchFromOwnerRez(endpoint) {
  const headers = getAuthHeaders();
  if (!headers) {
    console.warn('[OwnerRez] Missing API credentials — using fallback data');
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers,
      next: { revalidate: 60 }, // ISR: re-fetch every 60 seconds
    });

    if (!res.ok) {
      console.warn(`[OwnerRez] API returned ${res.status} for ${endpoint}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn(`[OwnerRez] API fetch failed: ${err.message}`);
    return null;
  }
}

/**
 * Retrieve enrichment data. 
 * Priority: 1. Local hardcoded (enrichments.js) -> 2. Local JSON file -> 3. AI Generation -> 4. Default
 */
async function getOrGenerateEnrichment(slug, rawProperty) {
  // 1. Check local manual enrichments first
  if (enrichments[slug]) {
    return { ...defaultEnrichment, ...enrichments[slug] };
  }

  try {
    // 2. Check local JSON file for previously generated content
    const db = await getGeneratedEnrichmentsDB();
    if (db[slug]) {
      return { ...defaultEnrichment, ...db[slug] };
    }

    // 3. Generate via Gemini AI
    console.info(`[AI Generator] Generating marketing content for ${slug}...`);
    const generated = await generatePropertyEnrichment(rawProperty);

    if (generated) {
      // Save to local JSON file permanently
      await saveGeneratedEnrichmentDB(slug, generated);
      return { ...defaultEnrichment, ...generated };
    }
  } catch (error) {
    console.error(`[OwnerRez] Failed to get/generate enrichment for ${slug}:`, error);
  }

  // 4. Fallback to default
  return defaultEnrichment;
}

/**
 * Transform a raw OwnerRez property object into our internal shape.
 * Merges with local enrichment data or AI generated content.
 */
async function transformProperty(rawProperty) {
  const name = rawProperty.name || rawProperty.externalName || 'Unnamed Property';
  const slug = slugify(name);
  
  const enrichment = await getOrGenerateEnrichment(slug, rawProperty);

  // Build location from address fields
  const addr = rawProperty.address || {};
  const location = [addr.city, addr.state].filter(Boolean).join(', ') || '30A, Florida';

  // Use OwnerRez photos if available, otherwise fall back to enrichment defaults
  let images = [];
  if (rawProperty.photos && rawProperty.photos.length > 0) {
    images = rawProperty.photos.map((photo) => ({
      src: photo.url || photo.originalUrl || photo.thumbnailUrl,
      alt: photo.caption || `${name} photo`,
    }));
  } else if (enrichment.images) {
    images = enrichment.images;
  } else {
    // Absolute fallback with a placeholder
    images = [
      { src: '/images/hero_coastal_sunset_1781267807355.png', alt: `${name} — coastal view` },
    ];
  }

  return {
    // Core data from OwnerRez
    slug,
    name,
    guests: rawProperty.maxGuests || rawProperty.guests || 0,
    beds: rawProperty.bedrooms || rawProperty.beds || 0,
    baths: rawProperty.bathrooms || rawProperty.baths || 0,
    location,
    neighborhood: addr.city || '',
    ownerrezId: rawProperty.id,
    images,

    // Editorial data from enrichments
    tagline: enrichment.tagline,
    description: enrichment.description,
    price: enrichment.price,
    priceNote: enrichment.priceNote,
    bookingUrl: enrichment.bookingUrl,
    featured: enrichment.featured,
    amenities: enrichment.amenities,
    reviews: enrichment.reviews,
    nearbyAttractions: enrichment.nearbyAttractions,
  };
}

/**
 * Fetch all properties from OwnerRez and transform them.
 * Returns null if the API is unavailable (caller should use fallback).
 */
export async function fetchOwnerRezProperties() {
  const data = await fetchFromOwnerRez('/properties');

  if (!data) return null;

  // The API may return { items: [...] } or a direct array
  const rawProperties = Array.isArray(data) ? data : (data.items || data.results || []);

  if (rawProperties.length === 0) {
    console.warn('[OwnerRez] API returned empty properties list');
    return null;
  }

  const activeProperties = rawProperties.filter((p) => p.status === 'Active' || !p.status);
  
  // Transform all properties in parallel
  return Promise.all(activeProperties.map(transformProperty));
}
