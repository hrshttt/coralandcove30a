"use client";

import styles from './page.module.css';
import FadeIn from '@/components/FadeIn/FadeIn';
import ParallaxImage from '@/components/ParallaxImage/ParallaxImage';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "When are check-in and check-out times?",
    answer: "Check-in begins at 5:00 PM, and check-out is by 10:00 AM. If your home happens to be ready earlier, we’ll gladly let you check in ahead of time at no extra charge."
  },
  {
    question: "Do you charge fees for early check-in or late check-out?",
    answer: "We never charge early check-in fees. For late check-outs, there are generally no fees either, with the exception of our Point Preserve Inn property, where a $50 fee applies to accommodate our housekeeping schedule."
  },
  {
    question: "Who do I contact in case of an emergency?",
    answer: "For medical or severe emergencies, please dial 911 immediately. For any urgent issues related directly to your rental home, you can contact our owner, Thomas, directly at (850) 714-7045 or via email at Thomas@CoralandCove30A.com."
  },
  {
    question: "Is it better to book directly through this website?",
    answer: "Absolutely. Booking directly through our secure platform (powered by OwnerRez) saves you from the hidden markups and costly service fees charged by third-party booking sites."
  },
  {
    question: "What payment methods do you accept, and what is the schedule?",
    answer: "We accept all major credit cards. You won’t need to pay your entire balance upfront—we simply require a 50% deposit at the time of booking, with the remaining balance due closer to your arrival date. We also do not charge security deposits."
  },
  {
    question: "Are linens, towels, and household essentials provided?",
    answer: "Yes, every home is fully stocked. We provide premium linens, fresh towels, kitchen starter kits, laundry pods, and complimentary toiletries to ensure your stay is completely effortless."
  },
  {
    question: "Why should I choose Coral & Cove 30A for my vacation?",
    answer: "We offer highly competitive pricing with absolutely no hidden 'junk fees', paired with a standard of service you won't find anywhere else. From the moment you book with us, you are treated like family."
  }
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQuestion} onClick={onClick}>
        <span>{faq.question}</span>
        <div className={styles.iconWrapper}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div className={styles.faqAnswerWrapper}>
        <div className={styles.faqAnswerInner}>
          <div className={styles.faqAnswer}>
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroBackground}>
          <ParallaxImage 
            src="/images/guideMain.jpg" 
            alt="Beautiful coastal ocean view"
            className={styles.heroImage}
            containerClassName={styles.heroImageContainer}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <FadeIn>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <p className={styles.subtitle}>Answers to questions you may have below</p>
          </FadeIn>
        </div>
      </header>

      <section className={styles.contentSection}>
        <FadeIn delay={0.2}>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                isOpen={openIndex === index} 
                onClick={() => toggleFAQ(index)} 
              />
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
