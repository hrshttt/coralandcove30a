import Image from 'next/image';
import styles from './Experiences.module.css';

export default function Experiences() {
  const experiences = [
    {
      id: 1,
      title: "Coastal Biking",
      image: "/images/biking_couple_lifestyle_1781267846839.png",
      span: "large"
    },
    {
      id: 2,
      title: "Family Beach Days",
      image: "/images/family_beach_lifestyle_1781267833225.png",
      span: "small"
    },
    {
      id: 3,
      title: "Luxury Interiors",
      image: "/images/luxury_interior_living_1781267821857.png",
      span: "small"
    }
  ];

  return (
    <section id="experiences" className={styles.experiences}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>The 30A Lifestyle</p>
          <h2 className={styles.title}>Curated Experiences &amp; Service</h2>
        </div>

        <div className={styles.gallery}>
          {experiences.map((exp) => (
            <div key={exp.id} className={`${styles.item} ${styles[exp.span]}`}>
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
