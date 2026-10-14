'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/ecom/pages/checkout/Shipping/Shipping.module.scss';
import { ShippingAddressSection, ShippingOrderSummary } from '@/ecom/components/checkout';
import { CartLoadContainer } from '@/ecom/components/cart';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { openAuthModal, setAuthWarningMessage, setAuthSuccessRedirectUrl } from '@/ecom/store/layout/layout-slice';
import { CHECKOUT_AUTH_WARNING_MESSAGE } from '@/ecom/constants';

export function Shipping() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  if (!isUserLoggedIn) {
    router.push('/cart');
    dispatch(openAuthModal());
    dispatch(setAuthWarningMessage(CHECKOUT_AUTH_WARNING_MESSAGE));
    dispatch(setAuthSuccessRedirectUrl('/checkout'));
  }

  return (
    <CartLoadContainer>
      <div className={styles.shippingOrderSummary}>
        <ShippingAddressSection />
        <ShippingOrderSummary />
      </div>
    </CartLoadContainer>
  );
}
