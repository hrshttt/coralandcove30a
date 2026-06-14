/**
 * Enrichments — Curated editorial content indexed by property slug.
 *
 * OwnerRez provides structural data (name, beds, baths, guests, photos, address).
 * This file provides the "marketing layer": taglines, descriptions, reviews,
 * nearby attractions, pricing display, booking URLs, and featured flags.
 *
 * To add enrichment for a new OwnerRez property:
 * 1. Add its slug here (generated from the property name: "Key Lime Pie" → "key-lime-pie")
 * 2. Fill in the editorial fields below
 * 3. Properties without an enrichment entry will use sensible defaults
 */

export const enrichments = {
  "key-lime-pie": {
    tagline: "A Slice of Coastal Paradise",
    description:
      "Nestled among the live oaks and coastal pines of Seagrove Beach, Key Lime Pie is a beautifully appointed 4-bedroom retreat that blends timeless coastal charm with modern luxury. Floor-to-ceiling windows frame stunning Gulf views, while the open-concept living space is designed for effortless entertaining. Step outside to your private pool and heated spa, or stroll to the sugar-white sands just steps away.",
    price: "$230",
    priceNote: "per night · min 3-night stay",
    bookingUrl: "#book",
    featured: true,
    amenities: [
      { icon: "pool", label: "Private Pool & Spa" },
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "beach", label: "Beach Access" },
      { icon: "grill", label: "Outdoor Grill" },
      { icon: "parking", label: "2-Car Garage" },
      { icon: "tv", label: "Smart TVs" },
      { icon: "washer", label: "Washer & Dryer" },
      { icon: "coffee", label: "Coffee Bar" },
      { icon: "bikes", label: "Beach Cruisers" },
      { icon: "pet", label: "Pet Friendly" },
    ],
    reviews: [
      {
        text: "Absolutely stunning property. The attention to detail and level of service provided by Coral & Cove is unmatched. We will definitely be returning next year.",
        author: "Sarah Jenkins",
        rating: 5,
        date: "November 2025",
      },
      {
        text: "Perfect for our family reunion. The kitchen was a dream and the pool area was exactly what we needed. Can't wait to come back!",
        author: "The Martinez Family",
        rating: 5,
        date: "September 2025",
      },
      {
        text: "From booking to checkout, everything was seamless. The house was spotless, beautifully decorated, and exactly as pictured.",
        author: "Michael Chen",
        rating: 5,
        date: "August 2025",
      },
    ],
    nearbyAttractions: [
      { name: "Seaside Town Center", distance: "1.2 mi", type: "shopping" },
      { name: "Grayton Beach State Park", distance: "2.5 mi", type: "nature" },
      { name: "Rosemary Beach", distance: "3.8 mi", type: "dining" },
      { name: "Coastal Dune Lakes", distance: "0.8 mi", type: "nature" },
      { name: "The Hub 30A", distance: "1.5 mi", type: "entertainment" },
      { name: "Gulf Place", distance: "2.0 mi", type: "shopping" },
    ],
  },

  "sea-la-vie": {
    tagline: "Live the Gulf Coast Dream",
    description:
      "Sea La Vie is a sprawling 5-bedroom beachfront estate in the heart of WaterColor, offering unobstructed Gulf views and unmatched luxury. The grand open-plan living area flows seamlessly onto a wraparound balcony perfect for watching dolphins play in the emerald waters. With a chef's kitchen, dedicated game room, and private beach walkover, this is the ultimate 30A experience for families and groups.",
    price: "$199",
    priceNote: "per night · min 3-night stay",
    bookingUrl: "#book",
    featured: true,
    amenities: [
      { icon: "pool", label: "Community Pool" },
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "beach", label: "Private Beach Walkover" },
      { icon: "grill", label: "Outdoor Kitchen" },
      { icon: "parking", label: "Covered Parking" },
      { icon: "tv", label: "Smart TVs" },
      { icon: "washer", label: "Washer & Dryer" },
      { icon: "coffee", label: "Espresso Machine" },
      { icon: "game", label: "Game Room" },
      { icon: "fire", label: "Fire Pit" },
    ],
    reviews: [
      {
        text: "We've stayed at many rentals along the coast, but this was by far the best. The concierge service helped us plan the perfect family vacation.",
        author: "The Thompson Family",
        rating: 5,
        date: "October 2025",
      },
      {
        text: "The views are absolutely breathtaking. Waking up to the sound of waves and stepping onto that balcony—it doesn't get better than this.",
        author: "David & Lisa Park",
        rating: 5,
        date: "July 2025",
      },
      {
        text: "Incredible property, incredible hosts. Every detail was thought of. The kids loved the game room and the beach access was perfect.",
        author: "Jessica Morales",
        rating: 5,
        date: "June 2025",
      },
    ],
    nearbyAttractions: [
      { name: "WaterColor Beach Club", distance: "0.3 mi", type: "recreation" },
      { name: "Seaside Farmers Market", distance: "0.8 mi", type: "shopping" },
      { name: "Camp Creek Golf Club", distance: "3.2 mi", type: "recreation" },
      { name: "Western Lake", distance: "1.5 mi", type: "nature" },
      { name: "Grayton Beach", distance: "2.0 mi", type: "nature" },
      { name: "The Red Bar", distance: "2.1 mi", type: "dining" },
    ],
  },

  "sunset-drift": {
    tagline: "Where Golden Hours Last Forever",
    description:
      "Perched on the western end of 30A in Inlet Beach, Sunset Drift earns its name every evening with jaw-dropping sunset views over the Gulf. This newly built 3-bedroom gem features contemporary coastal design, a private heated pool, and an expansive rooftop deck that's perfect for stargazing. Thoughtfully designed for smaller groups and couples seeking a serene, upscale escape.",
    price: "$275",
    priceNote: "per night · min 3-night stay",
    bookingUrl: "#book",
    featured: false,
    amenities: [
      { icon: "pool", label: "Private Heated Pool" },
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "beach", label: "Beach Access" },
      { icon: "grill", label: "Gas Grill" },
      { icon: "parking", label: "Driveway Parking" },
      { icon: "tv", label: '65" Smart TVs' },
      { icon: "washer", label: "Washer & Dryer" },
      { icon: "coffee", label: "Coffee Bar" },
      { icon: "deck", label: "Rooftop Deck" },
      { icon: "outdoor", label: "Outdoor Shower" },
    ],
    reviews: [
      {
        text: "The rooftop deck alone is worth the stay. We watched the most incredible sunsets every night. The home itself is brand new and gorgeous.",
        author: "Amanda & Ryan Foster",
        rating: 5,
        date: "December 2025",
      },
      {
        text: "Quiet, luxurious, and perfectly located. We didn't want to leave. The private pool was heavenly and the beach is just a short walk.",
        author: "Chris Nakamura",
        rating: 5,
        date: "November 2025",
      },
    ],
    nearbyAttractions: [
      { name: "Inlet Beach Access", distance: "0.2 mi", type: "nature" },
      { name: "Alys Beach", distance: "1.0 mi", type: "shopping" },
      { name: "Rosemary Beach Town Center", distance: "1.5 mi", type: "dining" },
      { name: "Camp Helen State Park", distance: "4.0 mi", type: "nature" },
      { name: "Pier Park", distance: "5.5 mi", type: "shopping" },
      { name: "30A Coastal Trail", distance: "0.1 mi", type: "recreation" },
    ],
  },
};

/**
 * Default enrichment values for properties without curated content.
 * New OwnerRez properties will use these until you add a custom entry above.
 */
export const defaultEnrichment = {
  tagline: "A Luxury 30A Escape",
  description: "Experience the best of Florida's Emerald Coast with this stunning vacation rental along scenic Highway 30A. Featuring premium finishes, comfortable accommodations, and easy beach access.",
  price: "Contact",
  priceNote: "Contact us for rates",
  bookingUrl: "#book",
  featured: false,
  amenities: [
    { icon: "wifi", label: "High-Speed WiFi" },
    { icon: "beach", label: "Beach Access" },
    { icon: "parking", label: "Parking" },
    { icon: "tv", label: "Smart TVs" },
    { icon: "washer", label: "Washer & Dryer" },
    { icon: "coffee", label: "Coffee Maker" },
  ],
  reviews: [],
  nearbyAttractions: [
    { name: "Seaside", distance: "Nearby", type: "shopping" },
    { name: "Grayton Beach State Park", distance: "Nearby", type: "nature" },
    { name: "30A Coastal Trail", distance: "Nearby", type: "recreation" },
  ],
};

/**
 * Get enrichment data for a property slug.
 * Falls back to defaults for unknown slugs.
 */
export function getEnrichment(slug) {
  return enrichments[slug]
    ? { ...defaultEnrichment, ...enrichments[slug] }
    : { ...defaultEnrichment };
}
