import styles from './IntroSection.module.css';

export default function IntroSection() {
  return (
    <section id="about" className={styles.intro}>
      <div className="container">
        <div className={styles.containerInner}>
          <div className={styles.textContent}>
            <p className={styles.eyebrow}>ABOUT CORAL & COVE</p>
            <h2 className={styles.title}>A New Standard of Coastal Living</h2>
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
          </div>
          
          <div className={styles.imageContent}>
            <div className={styles.verticalText}>THE 30A LIFESTYLE</div>
            <div className={styles.imageWrapperMain}>
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury living room in a beach house"
                className={styles.image}
              />
            </div>
            <div className={styles.decorativeBlock}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
