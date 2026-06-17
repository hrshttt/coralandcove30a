import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAreaGuidePostBySlug, getAreaGuidePosts } from '@/lib/areaGuide';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';
import ParallaxImage from '@/components/ParallaxImage/ParallaxImage';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAreaGuidePosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getAreaGuidePostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Not Found | Coral & Cove 30A',
    };
  }

  return {
    title: `${post.title} | Area Guide | Coral & Cove 30A`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = getAreaGuidePostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <div className={styles.heroBackground}>
          <ParallaxImage
            src={post.coverImage}
            alt={post.title}
            sizes="100vw"
            priority={true}
            containerClassName={styles.heroBackground}
          />
        </div>
        <div className={styles.heroOverlay} />
        
        <div className="container">
          <FadeIn className={styles.heroContent}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>{post.date}</span>
              <span className={styles.dot}>•</span>
              <span>{post.readingTime}</span>
            </div>
          </FadeIn>
        </div>
      </header>

      <div className="container">
        <div className={styles.contentWrapper}>
          <FadeIn delay={0.2}>
            <Link href="/area-guide" className={styles.topBackLink}>
              <ArrowLeft size={16} /> Back to Area Guide
            </Link>
            
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <Link href="/area-guide" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Area Guide
            </Link>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
