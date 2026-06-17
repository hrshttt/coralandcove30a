"use client";

import FadeIn from '@/components/FadeIn/FadeIn';

export default function OwnerServicesPage() {
  return (
    <div style={{ paddingTop: '160px', minHeight: '60vh', paddingBottom: '80px', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <p style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Partnership</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'var(--color-text-main)' }}>Owner Services</h1>
          
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
              At Coral & Cove 30A, we don't just manage properties; we care for them like our own. 
              Our boutique approach ensures your luxury home receives the attention, marketing, and maintenance it deserves.
            </p>

            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Comprehensive Management</h2>
            <p>From 24/7 guest communication to dynamic pricing strategies, we handle every aspect of the rental process so you can enjoy the returns of your investment completely stress-free.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Impeccable Care</h2>
            <p>Our dedicated, in-house housekeeping and maintenance teams undergo rigorous training to ensure your property remains in immaculate condition year-round. We conduct meticulous inspections before and after every single stay.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Owner Transparency</h2>
            <p>Gain access to a private owner portal where you can view upcoming reservations, track financial performance, and effortlessly block out dates for your own family vacations.</p>
            
            <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--color-surface)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-main)', marginBottom: '1rem' }}>Interested in partnering with us?</h3>
              <p style={{ marginBottom: '1.5rem' }}>We are highly selective about the homes we add to our portfolio to maintain our standard of excellence.</p>
              <a href="/contact" className="btn-primary" style={{ display: 'inline-block' }}>Contact Thomas</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
