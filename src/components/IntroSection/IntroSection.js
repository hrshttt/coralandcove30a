"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './IntroSection.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';

export default function IntroSection({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" className={styles.intro} ref={ref}>
      <div className="container">
        <div className={styles.containerInner}>
          <div className={styles.textContent}>
            <FadeIn maskReveal delay={0.1}>
              <p className={styles.eyebrow}>{content?.eyebrow}</p>
            </FadeIn>
            <FadeIn maskReveal delay={0.2}>
              <h2 className={styles.title}>{content?.title}</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className={styles.divider}></div>
              <p className={`${styles.description} ${styles.dropCap}`}>
                {content?.description1}
              </p>
              <p className={styles.description}>
                {content?.description2}
              </p>
              <button className={styles.btnGhost}>{content?.buttonText}</button>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className={styles.imageContent}>
            <div className={styles.verticalText}>{content?.verticalText}</div>
            <div className={styles.imageWrapperMain}>
              <motion.img
                style={{ y, scale: 1.3 }}
                src="/images/about.jpeg"
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
