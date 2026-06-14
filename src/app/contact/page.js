"use client";

import styles from './page.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import ParallaxImage from '@/components/ParallaxImage/ParallaxImage';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const dropdownRef = useRef(null);

  const subjects = [
    { value: 'booking', label: 'Booking Inquiry' },
    { value: 'concierge', label: 'Concierge Services' },
    { value: 'management', label: 'Property Management' },
    { value: 'other', label: 'Other Question' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would send data to an API
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroBackground}>
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop" 
            alt="Beautiful coastal home interior"
            className={styles.heroImage}
            containerClassName={styles.heroImageContainer}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <FadeIn>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.subtitle}>We're here to help curate your perfect coastal getaway.</p>
          </FadeIn>
        </div>
      </header>

      <section className={`container ${styles.contentSection}`}>
        <div className={styles.grid}>
          <FadeIn className={styles.infoColumn} delay={0.1}>
            <h2>Contact Information</h2>
            <p className={styles.description}>
              Whether you have a question about one of our luxury properties, need help planning your itinerary, or are interested in our property management services, our local team is ready to assist you.
            </p>
            
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}><Phone size={24} /></div>
                <div>
                  <h3>Call Us</h3>
                  <p>1-800-555-COVE</p>
                  <span className={styles.note}>Mon - Sun, 8am - 8pm CST</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}><Mail size={24} /></div>
                <div>
                  <h3>Email Us</h3>
                  <p>hello@coralandcove30a.com</p>
                  <span className={styles.note}>We reply within 24 hours</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}><MapPin size={24} /></div>
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Scenic Highway 30A<br/>Rosemary Beach, FL 32461</p>
                </div>
              </div>
            </div>

            <div className={styles.socials}>
              <h3>Follow Our Journey</h3>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn className={styles.formColumn} delay={0.3}>
            <div className={styles.formCard}>
              <h2>Send a Message</h2>
              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 400 }}>Thank you for reaching out!</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>We have received your message and will get back to you shortly.</p>
                  <button 
                    className="btn-outline" 
                    style={{ marginTop: '2rem' }}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Jane Doe" required />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="jane@example.com" required />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input type="tel" id="phone" placeholder="(555) 123-4567" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Subject</label>
                    <div className={styles.customSelect} ref={dropdownRef}>
                      <div 
                        className={`${styles.selectTrigger} ${selectedSubject ? styles.hasValue : ''} ${dropdownOpen ? styles.open : ''}`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {selectedSubject ? subjects.find(s => s.value === selectedSubject).label : 'Select an option'}
                        <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      
                      {dropdownOpen && (
                        <div className={styles.selectOptions}>
                          {subjects.map((subject) => (
                            <div 
                              key={subject.value}
                              className={`${styles.option} ${selectedSubject === subject.value ? styles.selected : ''}`}
                              onClick={() => {
                                setSelectedSubject(subject.value);
                                setDropdownOpen(false);
                              }}
                            >
                              {subject.label}
                            </div>
                          ))}
                        </div>
                      )}
                      <input type="hidden" name="subject" required value={selectedSubject} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="5" placeholder="How can we help you?" required></textarea>
                  </div>

                  <MagneticButton className={styles.submitBtnWrapper}>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}><span>Send Message</span></button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
