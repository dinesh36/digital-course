'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/ecom/components/cart/CartOrderSummary/CartOrderSummary.module.scss';
import { OrderTotalSection, ApplyCoupon } from '@/ecom/components/cart';
import { Typography } from '@/ui/components';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { openAuthModal, setAuthSuccessRedirectUrl, setAuthWarningMessage } from '@/ecom/store/layout/layout-slice';
import { CHECKOUT_AUTH_WARNING_MESSAGE } from '@/ecom/constants';

export function CartOrderSummary({
  isSliderView,
  isViewCartButtonVisible,
}: {
  isSliderView?: boolean,
  isViewCartButtonVisible?: boolean
}): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  const renderHeader = () => (
    <Typography variant="h2" component="h2" className={styles.cartHeader}>Order Summary</Typography>
  );

  const handleProceedToCheckout = () => {
    if (isUserLoggedIn) {
      router.push('/checkout');
    } else {
      dispatch(openAuthModal());
      dispatch(setAuthWarningMessage(CHECKOUT_AUTH_WARNING_MESSAGE));
      dispatch(setAuthSuccessRedirectUrl('/checkout'));
    }
  };

  const renderFunction = () => (
    <div className={`${styles.summaryContainer}`}>
      {isSliderView ? null : renderHeader()}
      <OrderTotalSection
        onCheckoutClick={handleProceedToCheckout}
        checkoutButtonLabel="Checkout"
        isSliderView={isSliderView}
        isViewCartButtonVisible={isViewCartButtonVisible}
      />
      {!isSliderView && <ApplyCoupon />}
    </div>
  );

  return renderFunction();
}
