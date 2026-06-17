"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mainImage}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={goPrev}
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={goNext}
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Counter */}
        <div className={styles.counter}>
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ''}`}
            onClick={() => goTo(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
