"use client";

import FadeIn from '@/components/FadeIn/FadeIn';

export default function BookingPoliciesPage() {
  return (
    <div style={{ paddingTop: '160px', minHeight: '60vh', paddingBottom: '80px', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <p style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Information</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'var(--color-text-main)' }}>Booking Policies</h1>
          
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Payment Terms</h2>
            <p>To secure your reservation, a 50% deposit is required at the time of booking. The remaining balance will be automatically collected closer to your arrival date. We do not require a security deposit.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>2. Cancellation Policy</h2>
            <p>We understand that plans change. Cancellations made within the allowable window will receive a refund according to the terms presented during checkout. Please review the specific cancellation window for your selected property.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>3. Check-In & Check-Out</h2>
            <p>Standard check-in time is 5:00 PM. Standard check-out time is 10:00 AM. We offer complimentary early check-ins if your home is ready ahead of schedule. Late check-outs may incur a fee depending on the property.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>4. House Rules</h2>
            <p>To maintain our luxury standards, smoking and unauthorized parties are strictly prohibited in all properties. Pets are only allowed in explicitly designated pet-friendly homes with prior approval.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
