"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OfferBanner.module.css';

const OFFERS = [
  "✦ COMPLIMENTARY BEACH BONFIRE WITH 7-NIGHT STAY",
  "✦ BOOK DIRECT FOR BEST RATES",
  "✦ LUXURY CONCIERGE SERVICE INCLUDED"
];

export default function OfferBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.banner}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.offerText}
        >
          {OFFERS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
