'use client';

import Image from 'next/image';
import Link from 'next/link';
import { areaGuidePosts } from '@/lib/areaGuide';
import FadeIn from '@/components/FadeIn/FadeIn';
import styles from './page.module.css';
import { ArrowRight } from 'lucide-react';

export default function AreaGuidePage() {
  if (!areaGuidePosts || areaGuidePosts.length === 0) {
    return null;
  }

  return (
    <main className="page-main">
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/guideMain.jpg"
            alt="30A Area Guide"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <FadeIn className={styles.heroContent}>
          <h1 className={styles.heroTitle}>30A Area Guide</h1>
          <p className={styles.heroSubtitle}>
            Explore our curated guides to make the most of your Emerald Coast vacation.
          </p>
        </FadeIn>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {areaGuidePosts.map((post, index) => (
              <FadeIn delay={index * 0.1} key={post.id} className={styles.gridItem}>
                <Link href={`/area-guide/${post.slug}`} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.image}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.categoryTag}>{post.readingTime}</span>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <span className={styles.readMoreBtn}>
                      Read Article <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
