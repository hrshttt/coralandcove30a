import Image from 'next/image';
import styles from './Experiences.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';

export default function Experiences({ content }) {
  const experiences = content?.items || [];

  return (
    <section id="experiences" className={styles.experiences}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{content?.eyebrow}</p>
            <h2 className={styles.title}>{content?.title}</h2>
          </div>
        </FadeIn>

        <div className={styles.gallery}>
          {experiences.map((exp, index) => (
            <FadeIn key={exp.id} delay={index * 0.2} className={`${styles.item} ${styles[exp.span]}`}>
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
