'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.scss';
import { CheckoutFormContainer, CheckoutOrderSummary } from '@/ecom/components/checkout';
import { CartLoadContainer } from '@/ecom/components/cart';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { openAuthModal, setAuthWarningMessage, setAuthSuccessRedirectUrl } from '@/ecom/store/layout/layout-slice';
import { CHECKOUT_AUTH_WARNING_MESSAGE } from '@/ecom/constants';

export function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const isSessionChecked = useAppSelector((state) => state.auth.isSessionChecked);

  // A guest goes back to the cart to log in. It waits for the session check: a built page does not know the customer until the
  // browser has asked the backend, and it does not render in a build either.
  useEffect(() => {
    if (isSessionChecked && !isUserLoggedIn) {
      router.push('/cart');
      dispatch(openAuthModal());
      dispatch(setAuthWarningMessage(CHECKOUT_AUTH_WARNING_MESSAGE));
      dispatch(setAuthSuccessRedirectUrl('/checkout'));
    }
  }, [isSessionChecked, isUserLoggedIn]);

  return (
    <CartLoadContainer>
      <div className={styles.checkoutLayout}>
        <CheckoutFormContainer />
        <CheckoutOrderSummary />
      </div>
    </CartLoadContainer>
  );
}
