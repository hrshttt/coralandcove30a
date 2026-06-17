import { NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimitMap = new Map();

// Clear old entries periodically to prevent memory leaks
if (typeof global !== 'undefined' && !global.rateLimitInterval) {
  global.rateLimitInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown-ip';
    const now = Date.now();
    
    // Check rate limit
    const limitData = rateLimitMap.get(ip) || { count: 0, resetTime: now + 15 * 60 * 1000 };
    
    if (now > limitData.resetTime) {
      limitData.count = 0;
      limitData.resetTime = now + 15 * 60 * 1000;
    }
    
    if (limitData.count >= 5) {
      return NextResponse.json(
        { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    
    if (password === process.env.CMS_PASSWORD) {
      // Clear rate limit on success
      rateLimitMap.delete(ip);
      
      const response = NextResponse.json({ success: true });
      response.cookies.set('cms_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return response;
    }
    
    // Increment failed attempts
    limitData.count++;
    rateLimitMap.set(ip, limitData);
    
    return NextResponse.json(
      { success: false, error: 'Incorrect password. Please try again.' }, 
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
