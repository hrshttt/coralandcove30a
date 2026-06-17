"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import FadeIn from '../FadeIn/FadeIn';
import styles from './HeroSection.module.css';

export default function HeroSection({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  // Move the background down as we scroll down to create parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className={styles.hero} ref={ref}>
      <motion.div className={styles.background} style={{ y, scale: 1.1 }}>
        <Image
          src="/images/main.png"
          alt="Luxury beach house at sunset on 30A"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </motion.div>

      <div className={styles.content}>
        <div className="container">
          <div className={styles.textContent}>
            <FadeIn maskReveal delay={0.1}>
              <p className={styles.eyebrow}>{content?.eyebrow}</p>
            </FadeIn>
            <FadeIn maskReveal delay={0.3}>
              <h1 className={styles.title}>
                {content?.title} <span className={styles.ampersand}>{content?.ampersand}</span> {content?.title2}
              </h1>
            </FadeIn>
            <FadeIn maskReveal delay={0.5}>
              <p className={styles.subtitle}>
                {content?.subtitle}
              </p>
            </FadeIn>
            <div className={styles.ratingBadge}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span><strong>Rated 5 Stars</strong> by our guests</span>
            </div>
            <div className={styles.ctaContainer}>
              <Link href="/book" className={styles.ctaButton}>
                <span>Check Availability</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Explore</span>
        <div className={styles.scrollLineWrapper}>
          <div className={styles.scrollLine}></div>
        </div>
      </div>
    </section>
  );
}
