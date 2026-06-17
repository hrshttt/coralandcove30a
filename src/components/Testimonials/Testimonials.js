"use client";

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

export default function Testimonials({ content }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load reviews:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading) {
    return (
      <section id="reviews" className={styles.testimonials}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.stars}>★★★★★</div>
            <h2 className={styles.title}>{content?.title || "Hear From Our Guests"}</h2>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.stars}>★★★★★</div>
          <h2 className={styles.title}>{content?.title}</h2>
        </div>

        <div className={styles.carousel}>
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`${styles.review} ${index === activeIndex ? styles.active : ''}`}
            >
              <p className={styles.quote}>"{review.text}"</p>
              <p className={styles.author}>
                — {review.author} 
                <span className="text-sm text-gray-500 ml-2 opacity-70">via {review.source}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {reviews.map((_, index) => (
            <button 
              key={index} 
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
