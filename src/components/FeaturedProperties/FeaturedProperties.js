import Image from 'next/image';
import styles from './FeaturedProperties.module.css';

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      name: "Key Lime Pie",
      price: "$230/night",
      guests: 10,
      beds: 4,
      baths: 3,
      image: "/images/hero_coastal_sunset_1781267807355.png" // Reusing hero for now
    },
    {
      id: 2,
      name: "Sea La Vie",
      price: "$199/night",
      guests: 14,
      beds: 5,
      baths: 5,
      // We will use the new exterior image generated here, assuming its path
      image: "/images/luxury_beach_house_exterior_1781270018064.png"
    }
  ];

  return (
    <section id="properties" className={styles.featured}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Properties</h2>
          <p className={styles.subtitle}>Discover our handpicked selection of exceptional homes</p>
        </div>

        <div className={styles.grid}>
          {properties.map((prop) => (
            <div key={prop.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={prop.image}
                  alt={prop.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.badge}>Featured</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.propName}>{prop.name}</h3>
                <p className={styles.propLocation}>{prop.price}</p>
                <div className={styles.amenities}>
                  <span>{prop.guests} Guests</span>
                  <span className={styles.dot}>•</span>
                  <span>{prop.beds} Beds</span>
                  <span className={styles.dot}>•</span>
                  <span>{prop.baths} Baths</span>
                </div>
                <button className={`btn-outline ${styles.cardBtn}`}>View Details</button>
              </div>
            </div>
          ))}
          
          <div className={`${styles.card} ${styles.comingSoonCard}`}>
            <div className={styles.comingSoonContent}>
              <h3 className={styles.comingSoonTitle}>More Properties<br/>Coming Soon</h3>
              <p className={styles.comingSoonText}>We are continually adding exceptional luxury homes to our curated collection.</p>
              <button className={`btn-outline ${styles.comingSoonBtn}`} disabled>Stay Tuned</button>
            </div>
          </div>
        </div>
        
        <div className={styles.viewAll}>
          <button className="btn-primary"><span>View All Properties</span></button>
        </div>
      </div>
    </section>
  );
}
