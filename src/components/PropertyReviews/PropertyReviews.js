"use client";

import { useState } from 'react';
import styles from './PropertyReviews.module.css';

export default function PropertyReviews({ reviews }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewCard}>
        <div className={styles.stars}>
          {[...Array(reviews[activeIndex].rating)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-secondary)" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          ))}
        </div>

        <blockquote className={styles.quote}>
          &ldquo;{reviews[activeIndex].text}&rdquo;
        </blockquote>

        <div className={styles.attribution}>
          <span className={styles.author}>{reviews[activeIndex].author}</span>
          <span className={styles.date}>{reviews[activeIndex].date}</span>
        </div>
      </div>

      {reviews.length > 1 && (
        <div className={styles.navigation}>
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
