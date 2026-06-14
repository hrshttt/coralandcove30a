import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generatePropertyEnrichment(rawProperty) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-3.1-flash-lite',
    systemInstruction: `You are an expert luxury real estate copywriter for Coral & Cove 30A, a high-end vacation rental company in Florida. You write elegant, inviting, and professional marketing copy. You must reply ONLY with a valid JSON object. Do not include markdown code block formatting (like \`\`\`json). Just the raw JSON.`,
  });

  const prompt = `
Generate marketing content for this property:
Name: ${rawProperty.name || 'Beautiful Coastal Home'}
Location: ${rawProperty.address?.city || '30A'}, Florida
Bedrooms: ${rawProperty.bedrooms || 3}
Bathrooms: ${rawProperty.bathrooms || 2}
Max Guests: ${rawProperty.maxGuests || 8}

Return EXACTLY this JSON structure:
{
  "tagline": "A short, catchy, 3-6 word slogan",
  "description": "A 3-4 sentence engaging description of the property highlighting coastal luxury, the amenities (beds/baths), and its location.",
  "price": "Estimate a realistic starting price per night, e.g. '$250'",
  "priceNote": "per night · min 3-night stay",
  "bookingUrl": "#book",
  "featured": false,
  "amenities": [
    {"icon": "wifi", "label": "High-Speed WiFi"},
    {"icon": "beach", "label": "Beach Access"},
    {"icon": "parking", "label": "Parking"},
    {"icon": "tv", "label": "Smart TVs"},
    {"icon": "washer", "label": "Washer & Dryer"},
    {"icon": "coffee", "label": "Coffee Maker"}
  ],
  "reviews": [
    {
      "text": "A glowing 2-sentence review about how great the stay was.",
      "author": "A realistic name",
      "rating": 5,
      "date": "A recent month and year"
    },
    {
      "text": "Another positive 2-sentence review.",
      "author": "Another name",
      "rating": 5,
      "date": "A recent month and year"
    }
  ],
  "nearbyAttractions": [
    {"name": "A realistic local 30A attraction", "distance": "X mi", "type": "nature or shopping or dining"},
    {"name": "Another local attraction", "distance": "Y mi", "type": "nature or shopping or dining"},
    {"name": "A third local attraction", "distance": "Z mi", "type": "nature or shopping or dining"}
  ]
}
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up potential markdown formatting from the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error(`[AI Generator] Failed to generate enrichment for ${rawProperty.name}:`, error);
    return null;
  }
}
