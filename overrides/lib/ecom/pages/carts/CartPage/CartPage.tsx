'use client';

import React from 'react';
import { useAppSelector } from '@/ecom/store/hooks';
import styles from '@/ecom-base/pages/carts/CartPage/CartPage.module.scss';
import { CartLoadContainer, CartOrderSummary } from '@/ecom/components/cart';
import CartList from '@/ecom/components/cart/CartList/CartList';
import CategoryProducts from '@/ecom/components/product/CategoryProducts/CategoryProducts';
import { Typography } from '@/ui/components';

export function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { pageSeoDetails } = useAppSelector((state) => state.layout);

  const renderCartListWithAdditionalComments = () => (
    <div className={styles.leftColumn}>
      <Typography variant="h2" component="h2" className={styles.cartHeader}>{pageSeoDetails.pageTitle || 'Your Cart'}</Typography>
      <CartList />
    </div>
  );

  return (
    <CartLoadContainer>
      <div className={styles.cartPageContainer}>
        {renderCartListWithAdditionalComments()}
        {cartItems.length > 0 && <CartOrderSummary />}
      </div>
      <CategoryProducts categoryUrlKey="trending" title="Best Selling" />
    </CartLoadContainer>
  );
}
