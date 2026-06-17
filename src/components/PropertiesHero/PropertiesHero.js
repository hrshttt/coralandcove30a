import ParallaxImage from '@/components/ParallaxImage/ParallaxImage';
import styles from './PropertiesHero.module.css';

export default function PropertiesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <ParallaxImage
          src="/images/properties_hero_aerial.png"
          alt="Aerial view of the 30A coastline at golden hour"
          priority={true}
          containerClassName={styles.background}
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className="container">
          <p className={styles.eyebrow}>Our Collection</p>
          <h1 className={styles.title}>Luxury Properties</h1>
          <p className={styles.subtitle}>
            Handpicked homes along Florida&apos;s iconic Highway 30A — where turquoise waters meet sugar-white sand.
          </p>
        </div>
      </div>
    </section>
  );
}
