import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`container ${styles.containerInner}`}>
        <div className={styles.textContent}>
          <p className={styles.eyebrow}>Get in Touch</p>
          <h2 className={styles.title}>Let&apos;s Plan Your Stay</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Whether you have a question about our properties, need assistance planning your itinerary, or require specialized concierge services, our dedicated team is here to ensure every detail is perfect.
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <strong>Email</strong>
              <a href="mailto:hello@coralandcove30a.com">hello@coralandcove30a.com</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <a href="tel:+18005550199">+1 (800) 555-0199</a>
            </div>
          </div>
        </div>

        <div className={styles.formContent}>
          <form className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Jane Doe" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="jane@example.com" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="button" className={`btn-primary ${styles.submitBtn}`}>
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
