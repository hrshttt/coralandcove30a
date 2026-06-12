"use client";

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      text: "Exceeded every expectation. The attention to detail and personalized service made our family vacation truly unforgettable.",
      author: "Sarah Jenkins",
      rating: 5
    },
    {
      id: 2,
      text: "From booking to checkout, everything was seamless. The house was spotless, beautifully decorated, and exactly as pictured. A true 5-star experience on 30A.",
      author: "Michael Chen",
      rating: 5
    },
    {
      id: 3,
      text: "We've stayed at many rentals along the coast, but this was by far the best. The concierge service helped us plan the perfect family vacation.",
      author: "The Thompson Family",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="reviews" className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.stars}>★★★★★</div>
          <h2 className={styles.title}>Hear From Our Guests</h2>
        </div>

        <div className={styles.carousel}>
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`${styles.review} ${index === activeIndex ? styles.active : ''}`}
            >
              <p className={styles.quote}>"{review.text}"</p>
              <p className={styles.author}>— {review.author}</p>
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
