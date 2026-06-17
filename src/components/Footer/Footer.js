"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
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
            <li><Link href="/properties">Our Properties</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#experiences">Experiences</Link></li>
            <li><Link href="/#reviews">Guest Reviews</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Information</h4>
          <ul>
            <li><Link href="/booking-policies">Booking Policies</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/owner-services">Owner Services</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Connect</h4>
          <ul>
            <li><a href="https://www.instagram.com/coralandcove30a/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.facebook.com/coralandcove30a/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
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
