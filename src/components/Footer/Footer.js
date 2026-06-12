"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.brand}>
          <h3 className={styles.logo}>Coral &amp; Cove</h3>
          <p className={styles.tagline}>Luxury Coastal Vacation Rentals</p>
          <p className={styles.contactInfo}>
            1-800-555-COVE<br />
            hello@coralandcove30a.com
          </p>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Explore</h4>
          <ul>
            <li><Link href="#properties">Our Properties</Link></li>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#experiences">Experiences</Link></li>
            <li><Link href="#reviews">Guest Reviews</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Information</h4>
          <ul>
            <li><Link href="#">Booking Policies</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Owner Services</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.newsletter}>
          <h4 className={styles.heading}>Join Our List</h4>
          <p className={styles.newsletterText}>Sign up for exclusive offers and coastal inspiration.</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className={styles.input} />
            <button type="submit" className={styles.submitBtn}>Subscribe</button>
          </form>
        </div>

      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Coral &amp; Cove 30A. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
