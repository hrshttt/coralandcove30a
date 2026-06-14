"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dotStyle, setDotStyle] = useState({ left: 0, opacity: 0 });
  const pathname = usePathname();
  const navListRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the dot position whenever the pathname changes
  useEffect(() => {
    // Small timeout to ensure DOM is fully painted before measuring
    const timer = setTimeout(() => {
      if (!navListRef.current) return;
      
      const activeItem = navListRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        // Find the center of the active item relative to the navList
        const left = activeItem.offsetLeft + (activeItem.offsetWidth / 2) - 2; // -2px to center the 4px dot
        setDotStyle({ left, opacity: 1 });
      } else {
        setDotStyle(prev => ({ ...prev, opacity: 0 }));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

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
          <ul className={styles.navList} ref={navListRef}>
            <li data-active={pathname === '/properties'}>
              <Link href="/properties" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                Properties
              </Link>
            </li>
            <li data-active={pathname === '/point-preserve-inn'}>
              <Link href="/point-preserve-inn" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                Point Preserve Inn
              </Link>
            </li>
            <li data-active={pathname.startsWith('/area-guide')}>
              <Link href="/area-guide" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                Area Guide
              </Link>
            </li>
            <li data-active={pathname === '/about'}>
              <Link href="/about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li data-active={pathname === '/contact'}>
              <Link href="/contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <MagneticButton>
                <Link href="#book" className={`btn-primary ${styles.bookBtn}`} onClick={() => setMobileMenuOpen(false)}>
                  <span>Book Now</span>
                </Link>
              </MagneticButton>
            </li>
            
            <motion.div 
              className={styles.activeDot}
              initial={false}
              animate={{ 
                left: dotStyle.left,
                opacity: dotStyle.opacity
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
            />
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
