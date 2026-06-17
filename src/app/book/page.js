"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script';

export default function BookPage() {
  const searchParams = useSearchParams();
  const arrival = searchParams.get('arrival') || '';
  const departure = searchParams.get('departure') || '';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';
  
  const [widgetId, setWidgetId] = useState('');

  useEffect(() => {
    // We fetch this from the client-side to easily support the env var
    // without needing server-side props for a simple static page.
    setWidgetId(process.env.NEXT_PUBLIC_OWNERREZ_WIDGET_ID || 'dummy_widget_id');
  }, []);

  return (
    <>
      <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)', textAlign: 'center' }}>
              Complete Your Reservation
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
              Book your private coastal residence securely below.
            </p>
            
            {/* 
              This is where the OwnerRez widget is embedded.
              We append the query parameters so that if the user selected dates on the homepage,
              they are pre-filled in the iframe widget.
            */}
            {widgetId === 'dummy_widget_id' || !widgetId ? (
              <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
                <h3 style={{ marginBottom: '1rem' }}>OwnerRez Widget Pending</h3>
                <p style={{ color: '#666' }}>
                  Please set <code>NEXT_PUBLIC_OWNERREZ_WIDGET_ID</code> in your <code>.env.local</code> file and configure your property settings to see the live booking widget here.
                </p>
                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
                  <strong>Received Parameters:</strong><br/>
                  Arrival: {arrival || 'Not set'}<br/>
                  Departure: {departure || 'Not set'}<br/>
                  Adults: {adults}<br/>
                  Children: {children}
                </div>
              </div>
            ) : (
              <div className="ownerrez-widget" 
                data-widgetid={widgetId} 
                data-arrival={arrival} 
                data-departure={departure} 
                data-adults={adults} 
                data-children={children}>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Load the OwnerRez widget script reliably via Next.js Script */}
      {widgetId && widgetId !== 'dummy_widget_id' && (
        <Script 
          src="https://secure.ownerrez.com/widget.js" 
          strategy="lazyOnload" 
        />
      )}
    </>
  );
}
