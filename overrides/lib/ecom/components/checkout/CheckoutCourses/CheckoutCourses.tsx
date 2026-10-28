import React from 'react';
import { getCourseDetails } from '@/ecom/utils/product-utils/courseDetails';
import { getProductImagePath } from '@/ecom/utils/product-utils/productImage';
import { useAppSelector } from '@/ecom/store/hooks';
import { getCartItemDisplayPrice } from '@/ecom/utils/price';
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
                src={getProductImagePath(item)}
                alt={item.product.name}
                className={styles.courseImage}
              />
              <div className={styles.courseMeta}>
                <h3 className={styles.courseTitle}>{item.product.name}</h3>
                <p className={styles.courseInstructor}>
                  {`by ${getCourseDetails(item.product).author}`}
                </p>
                <p className={styles.coursePrice}>{getCartItemDisplayPrice(item)}</p>
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
