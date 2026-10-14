'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBagIcon } from 'lucide-react';
import styles from './CartSlider.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { CartOrderSummary } from '@/ecom/components/cart';
import CartList from '@/ecom/components/cart/CartList/CartList';
import { Slider } from '@/ui/layout';
import { useCartDisplayCount } from '@/ecom/components/layout';
import { closeCartSlider } from '@/ecom/store/layout/layout-slice';

export default function CartSlider() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const isCartOpen = useAppSelector((state) => state.layout.isCartSliderOpen);
  const pathname = usePathname();
  const shouldOpen = isCartOpen && pathname !== '/cart';
  const { cartItemsCount, displayCount } = useCartDisplayCount();

  const renderCartItems = () => (
    <div className={styles.cartList}>
      <CartList forceMobileView />
    </div>
  );

  const renderOrderSummary = () => (cartItems.length > 0
    ? <CartOrderSummary isSliderView isViewCartButtonVisible={false} />
    : null
  );

  const onCloseCartSlider = () => {
    dispatch(closeCartSlider());
  };

  const renderCartSliderTitle = () => (
    <span className={styles.sliderTitleContainer}>
      <ShoppingBagIcon />
      <span className={styles.sliderTitle}>Your Bag</span>
      {cartItemsCount > 0 && <span className={styles.badge}>{displayCount}</span>}
    </span>
  );

  return (
    <Slider
      isOpen={shouldOpen}
      position="right"
      width="26.25rem"
      onClose={onCloseCartSlider}
      title={renderCartSliderTitle()}
    >
      <div className={styles.cartSliderContainer}>
        {renderCartItems()}
        {renderOrderSummary()}
      </div>
    </Slider>
  );
}
