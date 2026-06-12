import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = "You are a warm, professional assistant for Coral & Cove 30A, a luxury vacation rental company along Highway 30A, Florida. Answer questions about properties, booking process, local experiences, and the 30A area. Keep answers concise and helpful. If you don't know something specific, ask them to contact us at hello@coralandcove30a.com";

export async function POST(req) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await req.json();

    // The frontend sends messages in the format expected by Gemini: 
    // [{role: 'user' | 'model', parts: [{text: '...'}]}]
    let history = messages.slice(0, -1);
    // Gemini requires the history to start with a 'user' message.
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }
    const msg = messages[messages.length - 1].parts[0].text;

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      systemInstruction: SYSTEM_INSTRUCTION,
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
