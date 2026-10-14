import React from 'react';
import styles from './ProductTileSkeleton.module.scss';

export default function ProductTileSkeleton() {
  return (
    <div className={styles.productSkeleton} role="status" aria-label="Loading product">
      <div className={styles.productImageContainer}>
        <div className={styles.favoriteIcon} aria-hidden="true" />
        <div className={styles.badge} aria-hidden="true" />
        <div className={styles.image} aria-hidden="true" />
      </div>

      <div className={styles.productDetails}>
        <div className={styles.category} aria-hidden="true" />
        <div className={styles.title} aria-hidden="true" />
        <div className={styles.priceRow}>
          <div className={styles.price} aria-hidden="true" />
          <div className={styles.enrollButton} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
