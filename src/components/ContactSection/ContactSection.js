"use client";

import { useState } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection({ content }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        setIsSubmitted(true);
      } else {
        console.error("Web3Forms Error", res);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`container ${styles.containerInner}`}>
        <div className={styles.textContent}>
          <p className={styles.eyebrow}>{content?.eyebrow}</p>
          <h2 className={styles.title}>{content?.title}</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            {content?.description}
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <strong>Email</strong>
              <a href={`mailto:${content?.email}`}>{content?.email}</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <a href={`tel:${content?.phone}`}>{content?.phone}</a>
            </div>
          </div>
        </div>

        <div className={styles.formContent}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', background: '#fff', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 400 }}>Thank you!</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Your message has been sent successfully.</p>
              <button 
                className="btn-outline" 
                onClick={() => setIsSubmitted(false)}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="jane@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
