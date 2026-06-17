import { GoogleGenerativeAI } from '@google/generative-ai';
import { getProperties } from '@/lib/properties';
import { getCmsData } from '@/lib/cms';
import { getAreaGuidePosts } from '@/lib/areaGuide';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const BASE_SYSTEM_INSTRUCTION = "You are a warm, professional assistant for Coral & Cove 30A, a luxury vacation rental company along Highway 30A, Florida. Answer questions about properties, booking process, local experiences, and the 30A area. Keep answers concise and helpful. If you don't know something specific, ask them to contact us at hello@coralandcove30a.com. IMPORTANT FORMATTING RULE: You MUST output ONLY plain text. Do NOT use any Markdown formatting whatsoever (no asterisks, no bold, no italics, no bullet points, no lists, no headers). Just write normal paragraphs separated by empty lines.";

export async function POST(req) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await req.json();

    // Fetch site data for context
    const properties = await getProperties();
    const cmsData = getCmsData();
    const areaGuidePosts = getAreaGuidePosts();
    
    // Build context string to inject
    const contextString = `
AVAILABLE CONTEXT ABOUT CORAL & COVE:

1. GENERAL INFO / LANDING PAGE CMS:
${JSON.stringify(cmsData)}

2. AREA GUIDE & LOCAL ATTRACTIONS:
${JSON.stringify(areaGuidePosts.map(p => ({ title: p.title, excerpt: p.excerpt, content: p.content })))}

3. AVAILABLE PROPERTIES:
${JSON.stringify(properties.map(p => ({ 
  name: p.name, 
  location: p.location, 
  beds: p.beds, 
  baths: p.baths, 
  guests: p.guests, 
  description: p.description, 
  price: p.price, 
  amenities: p.amenities?.map(a => a.label) 
})))}

4. FAQS AND POLICIES:
- Check-in: 5:00 PM. Check-out: 10:00 AM. Free early check-in if ready. Late check-out free except Point Preserve Inn ($50 fee).
- Emergency contact: Thomas (Owner) at (850) 714-7045 or Thomas@CoralandCove30A.com.
- Booking direct on website saves hidden markups from third-party sites.
- Payment: 50% deposit at booking. No security deposit needed. Major credit cards accepted.
- Homes are fully stocked with premium linens, towels, kitchen kits, laundry pods, toiletries.
- No smoking, no unauthorized parties. Pets only in designated pet-friendly homes with prior approval.

Please use this real data to answer the user's questions accurately.
`;

    // The frontend sends messages in the format expected by Gemini
    let history = messages.slice(0, -1);
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }
    const msg = messages[messages.length - 1].parts[0].text;

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      systemInstruction: BASE_SYSTEM_INSTRUCTION + "\n\n" + contextString,
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(msg);

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
