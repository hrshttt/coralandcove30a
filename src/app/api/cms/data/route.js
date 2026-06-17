import { NextResponse } from 'next/server';
import { getCmsData, saveCmsData } from '@/lib/cms';

export async function GET() {
  const data = getCmsData();
  if (data) {
    return NextResponse.json(data);
  }
  return NextResponse.json({ error: 'Failed to read CMS data' }, { status: 500 });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const success = saveCmsData(data);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to save CMS data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
