import styles from './OfferBanner.module.css';

export default function OfferBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.ticker}>
        <div className={styles.tickerContent}>
          <span>✦ COMPLIMENTARY BEACH BONFIRE WITH 7-NIGHT STAY</span>
          <span>✦ BOOK DIRECT FOR BEST RATES</span>
          <span>✦ LUXURY CONCIERGE SERVICE INCLUDED</span>
          <span>✦ COMPLIMENTARY BEACH BONFIRE WITH 7-NIGHT STAY</span>
          <span>✦ BOOK DIRECT FOR BEST RATES</span>
          <span>✦ LUXURY CONCIERGE SERVICE INCLUDED</span>
        </div>
      </div>
    </div>
  );
}
