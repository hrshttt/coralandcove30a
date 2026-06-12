import Image from 'next/image';
import BookingWidget from '../BookingWidget/BookingWidget';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/images/hero_coastal_sunset_1781267807355.png"
          alt="Coral and Cove 30A Coastal Property at Sunset"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <div className="container">
          <div className={styles.textContent}>
            <p className={styles.eyebrow}>Where 30A Meets Five-Star</p>
            <h1 className={styles.title}>
              Coral <span className={styles.ampersand}>&amp;</span> Cove
            </h1>
            <p className={styles.subtitle}>
              Curated Luxury Rentals along Highway 30A
            </p>
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
          </div>
        </div>
      </div>

      <BookingWidget />
    </section>
  );
}
