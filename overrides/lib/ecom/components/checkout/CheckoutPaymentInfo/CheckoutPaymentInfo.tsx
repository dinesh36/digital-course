import React from 'react';
import { LockIcon } from '@/ui/icons';

type CheckoutPaymentInfoProps = {
  isFreeOrder: boolean;
  isCashOnDelivery: boolean;
};

export function CheckoutPaymentInfo({ isFreeOrder, isCashOnDelivery }: CheckoutPaymentInfoProps) {
  if (isFreeOrder) {
    return (
      <p>
        <span><LockIcon /></span>
        <strong>Nothing to pay: </strong>
        Your order is free, so it is confirmed at once, with no payment.
      </p>
    );
  }
  if (isCashOnDelivery) {
    return (
      <p>
        <span><LockIcon /></span>
        <strong>Cash on delivery: </strong>
        You place the order now and pay when it is delivered.
      </p>
    );
  }
  return (
    <p>
      <span><LockIcon /></span>
      <strong>Secure Payment via Razorpay: </strong>
      All payments are processed securely. You&#39;ll be redirected to Razorpay to complete payment.
    </p>
  );
}
