import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.OWNERREZ_USERNAME;
  const token = process.env.OWNERREZ_TOKEN;
  const propertyId = process.env.OWNERREZ_PROPERTY_ID;

  // If the user hasn't set up the API keys yet, return mock data so the UI still works.
  if (!username || !token || !propertyId || username === 'your-ownerrez-username') {
    const today = new Date();
    
    // Mock: Next weekend is booked
    const mockBookedStart1 = new Date(today);
    mockBookedStart1.setDate(today.getDate() + (6 - today.getDay()) + 7); // Next Saturday
    const mockBookedEnd1 = new Date(mockBookedStart1);
    mockBookedEnd1.setDate(mockBookedStart1.getDate() + 3); // Tuesday

    // Mock: Another week later is booked
    const mockBookedStart2 = new Date(mockBookedStart1);
    mockBookedStart2.setDate(mockBookedStart1.getDate() + 10);
    const mockBookedEnd2 = new Date(mockBookedStart2);
    mockBookedEnd2.setDate(mockBookedStart2.getDate() + 5);

    return NextResponse.json({
      success: true,
      mocked: true,
      bookedDates: [
        { from: mockBookedStart1.toISOString(), to: mockBookedEnd1.toISOString() },
        { from: mockBookedStart2.toISOString(), to: mockBookedEnd2.toISOString() }
      ]
    });
  }

  try {
    // Call the OwnerRez API to get bookings for the property
    // We get bookings from today onwards
    const sinceDate = new Date().toISOString().split('T')[0];
    
    // OwnerRez API v2 Bookings endpoint
    const url = `https://api.ownerrez.com/v2/bookings?property_id=${propertyId}&since=${sinceDate}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64'),
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('OwnerRez API error:', await response.text());
      throw new Error(`OwnerRez API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Transform OwnerRez bookings into { from, to } format for react-day-picker
    // Assuming OwnerRez returns an array of items with arrival and departure dates
    const bookedDates = data.items?.map(booking => ({
      from: new Date(booking.arrival).toISOString(),
      to: new Date(booking.departure).toISOString()
    })) || [];

    return NextResponse.json({
      success: true,
      mocked: false,
      bookedDates
    });

  } catch (error) {
    console.error('Error fetching OwnerRez availability:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
