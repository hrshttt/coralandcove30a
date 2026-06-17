"use client";

import FadeIn from '@/components/FadeIn/FadeIn';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: '160px', minHeight: '60vh', paddingBottom: '80px', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <p style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Legal</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'var(--color-text-main)' }}>Privacy Policy</h1>
          
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Information Collection</h2>
            <p>We collect information from you when you book a property, subscribe to our newsletter, respond to a survey, or fill out a form. The collected information includes your name, email address, phone number, and booking details.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Information Usage</h2>
            <p>Any of the information we collect from you may be used to personalize your experience, improve our website, improve customer service, process transactions, or send periodic emails regarding your booking or other services.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Information Protection</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Our booking engine is securely powered by OwnerRez and all transactions run through a secure gateway provider.</p>
            
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem' }}>Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
