import styles from './IntroSection.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';

export default function IntroSection() {
  return (
    <section id="about" className={styles.intro}>
      <div className="container">
        <div className={styles.containerInner}>
          <div className={styles.textContent}>
            <FadeIn maskReveal delay={0.1}>
              <p className={styles.eyebrow}>ABOUT CORAL & COVE</p>
            </FadeIn>
            <FadeIn maskReveal delay={0.2}>
              <h2 className={styles.title}>A New Standard of Coastal Living</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className={styles.divider}></div>
              <p className={styles.description}>
                Experience the unmatched beauty of Florida's Emerald Coast. 
                Our meticulously curated portfolio of luxury vacation homes along Highway 30A 
                offers a sanctuary where pristine white sands meet emerald waters.
              </p>
              <p className={styles.description}>
                From seamless booking to personalized concierge services, we ensure every moment 
                of your stay is effortlessly extraordinary.
              </p>
              <button className={styles.btnGhost}>Discover Our Story &rarr;</button>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.3} className={styles.imageContent}>
            <div className={styles.verticalText}>THE 30A LIFESTYLE</div>
            <div className={styles.imageWrapperMain}>
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury living room in a beach house"
                className={styles.image}
              />
            </div>
            <div className={styles.decorativeBlock}></div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
