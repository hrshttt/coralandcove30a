import { NextResponse } from 'next/server';

const MOCK_REVIEWS = [
  {
    id: 1,
    text: "Absolutely stunning property. The attention to detail and level of service provided by Coral & Cove is unmatched. We will definitely be returning next year.",
    author: "Sarah Jenkins",
    rating: 5,
    source: "Airbnb"
  },
  {
    id: 2,
    text: "From booking to checkout, everything was seamless. The house was spotless, beautifully decorated, and exactly as pictured. A true 5-star experience on 30A.",
    author: "Michael Chen",
    rating: 5,
    source: "Vrbo"
  },
  {
    id: 3,
    text: "We've stayed at many rentals along the coast, but this was by far the best. The concierge service helped us plan the perfect family vacation.",
    author: "The Thompson Family",
    rating: 5,
    source: "Airbnb"
  }
];

export async function GET() {
  const email = process.env.OWNERREZ_API_EMAIL;
  const token = process.env.OWNERREZ_API_TOKEN;

  if (!email || !token) {
    // If credentials are not set, return mock reviews so the UI doesn't break
    return NextResponse.json({
      reviews: MOCK_REVIEWS,
      status: 'mock'
    });
  }

  try {
    // Fetch from OwnerRez API
    // OwnerRez uses Basic Auth with Email and API Token
    const credentials = Buffer.from(`${email}:${token}`).toString('base64');
    
    const response = await fetch('https://api.ownerreservations.com/v2/guestreviews', {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json'
      },
      // Revalidate every hour (3600 seconds) since reviews don't change constantly
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      console.error(`OwnerRez API error: ${response.status} ${response.statusText}`);
      return NextResponse.json({ reviews: MOCK_REVIEWS, status: 'error_fallback' });
    }

    const data = await response.json();
    
    // Process the OwnerRez reviews to match our frontend format
    // OwnerRez returns an array of items
    if (data && data.items) {
      const formattedReviews = data.items
        .filter(review => review.rating >= 4) // Only show 4 and 5 star reviews
        .slice(0, 10) // Limit to 10 latest reviews
        .map(review => ({
          id: review.id,
          text: review.body || review.public_response || review.private_feedback,
          author: review.guest_name || "Verified Guest",
          rating: review.rating,
          source: review.listing_site || "Verified Stay"
        }));

      if (formattedReviews.length > 0) {
        return NextResponse.json({
          reviews: formattedReviews,
          status: 'live'
        });
      }
    }

    // Fallback if no reviews were found
    return NextResponse.json({ reviews: MOCK_REVIEWS, status: 'empty_fallback' });
    
  } catch (error) {
    console.error('Failed to fetch OwnerRez reviews:', error);
    return NextResponse.json({ reviews: MOCK_REVIEWS, status: 'error_fallback' });
  }
}
