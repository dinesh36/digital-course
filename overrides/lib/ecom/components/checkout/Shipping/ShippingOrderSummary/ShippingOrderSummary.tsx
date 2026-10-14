'use client';

import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { useAppSelector } from '@/ecom/store/hooks';
import { getProductDisplayPrice, getDisplayPrice } from '@/ecom/utils/price';
import styles from './ShippingOrderSummary.module.scss';
import { Typography } from '@/ui/components';

export function ShippingOrderSummary() {
  const { cartItems, cartTotal } = useAppSelector((state) => state.cart);

  const finalAmount = cartTotal?.grandTotal ?? 0;
  const formattedFinal = getDisplayPrice(finalAmount);

  const renderEmptyCartSection = () => (
    <div className={styles.emptyCart}>
      <p>
        {'Cart is empty. '}
        <a href="/courses" className={styles.browseLink}>
          Browse courses
        </a>
      </p>
    </div>
  );

  const renderDiscountSection = () => (
    cartTotal?.discount ? (
      <div className={styles.taxRow}>
        <span className={styles.rowLabel}>Discount</span>
        <span className={styles.rowValue}>{getDisplayPrice(Math.abs(cartTotal.discount), undefined, true)}</span>
      </div>
    ) : null
  );

  const renderTaxSection = () => (
    cartTotal.appliedTaxes.map((tax, idx) => (
      <div key={tax.label ?? `tax-${idx}`} className={styles.taxRow}>
        <span className={styles.rowLabel}>{tax.label}</span>
        <span className={styles.rowValue}>{getDisplayPrice(tax.value ?? 0)}</span>
      </div>
    ))
  );

  const renderCartSection = () => (
    <>
      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.cartItemId} className={styles.courseRow}>
            <span className={styles.courseTitle}>{item.name}</span>
            <span className={styles.coursePrice}>{getProductDisplayPrice(item)}</span>
          </div>
        ))}
      </div>

      <div className={styles.subtotalRow}>
        <span className={styles.rowLabel}>Subtotal</span>
        <span className={styles.rowValue}>{getDisplayPrice(cartTotal?.subTotal ?? 0)}</span>
      </div>
      {cartTotal?.appliedTaxes?.length > 0 && (renderTaxSection())}
      {renderDiscountSection()}
    </>
  );

  const renderBenefits = () => (
    <div className={styles.benefits}>
      <h3 className={styles.benefitsTitle}>What You Get</h3>
      <ul className={styles.benefitsList}>
        <li className={styles.benefitItem}>
          <CheckCircle2 className={styles.checkIcon} />
          <span>Lifetime access to all course materials</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle2 className={styles.checkIcon} />
          <span>Downloadable PDF course materials</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle2 className={styles.checkIcon} />
          <span>Mobile and desktop access</span>
        </li>
      </ul>
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className={styles.deliveryInfo}>
      <Clock className={styles.clockIcon} />
      <div className={styles.deliveryText}>
        <p className={styles.deliveryTitle}>Instant Access</p>
        <p className={styles.deliveryDesc}>Get access immediately after purchase</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.orderSummaryCard}>
        <Typography variant="h2" className={styles.title}>Order Summary</Typography>
        <div className={styles.itemsSection}>{cartItems.length === 0 ? renderEmptyCartSection() : renderCartSection()}</div>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>{formattedFinal}</span>
        </div>
        {renderBenefits()}
        {renderDeliveryInfo()}
      </div>
    </div>
  );
}
