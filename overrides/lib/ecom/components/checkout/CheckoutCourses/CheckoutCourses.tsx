import React from 'react';
import { useAppSelector } from '@/ecom/store/hooks';
import { getProductDisplayPrice } from '@/ecom/utils/price';
import styles from './CheckoutCourses.module.scss';

export function CheckoutCourses() {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className={styles.selectedCourses}>
      {cartItems.map((item, idx) => {
        const isLast = idx === cartItems.length - 1;
        return (
          <div key={item.cartItemId}>
            <div className={styles.courseCard}>
              <img
                src={item.image?.url ?? item.image}
                alt={item.name}
                className={styles.courseImage}
              />
              <div className={styles.courseMeta}>
                <h3 className={styles.courseTitle}>{item.name}</h3>
                <p className={styles.courseInstructor}>
                  {`by ${item.documentAuthorName}`}
                </p>
                <p className={styles.coursePrice}>{getProductDisplayPrice(item)}</p>
              </div>
            </div>

            {cartItems.length > 1 && !isLast && (
              <div className={styles.courseDivider} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
