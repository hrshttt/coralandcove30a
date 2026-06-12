"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.logoMarkWrapper}>
              <img 
                src="/logoMain.avif" 
                alt="Coral & Cove" 
                className={styles.logoImage} 
              />
            </div>
          </Link>
        </div>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="#properties" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Properties</Link></li>
            <li><Link href="#about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
            <li><Link href="#experiences" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Experiences</Link></li>
            <li><Link href="#reviews" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Reviews</Link></li>
            <li><Link href="#contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
            <li>
              <Link href="#book" className={`btn-primary ${styles.bookBtn}`} onClick={() => setMobileMenuOpen(false)}>
                <span>Book Now</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
