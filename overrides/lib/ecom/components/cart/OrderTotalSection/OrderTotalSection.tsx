import { Button } from '@/ui/components';
import { getDisplayPrice } from '@/ecom/utils/price';
import styles from './OrderTotalSection.module.scss';
import { DEFAULT_CURRENCY } from '@/ecom/constants';
import { useAppSelector } from '@/ecom/store/hooks';

interface OrderSummaryRowProps {
    checkoutButtonLabel: string;
    disableCheckout?: boolean;
    onCheckoutClick?: () => void;
    isSliderView?: boolean;
    isPaymentPage?: boolean;
    isViewCartButtonVisible?: boolean;
}

interface SummaryItem {
    id: string;
    label: string;
    value: string;
}

export function OrderTotalSection({
  disableCheckout = false,
  onCheckoutClick,
  checkoutButtonLabel,
  isSliderView = false,
  isPaymentPage = false,
  isViewCartButtonVisible = true,
}: OrderSummaryRowProps) {
  const {
    cartTotal, cartItems, isCartLoading,
  } = useAppSelector((state) => state.cart);
  const cartItemsLength = cartItems.length;

  const subTotalRow = {
    id: 'subTotal',
    label: cartItemsLength && cartItemsLength > 0 ? `Subtotal (${cartItemsLength} items)` : 'Subtotal',
    value: getDisplayPrice(cartTotal.subtotal),
  };

  const summaryItems: SummaryItem[] = [
    subTotalRow,
    ...cartTotal.discount ? [{
      id: 'discount',
      label: 'Discount',
      value: getDisplayPrice(Math.abs(cartTotal.discount), DEFAULT_CURRENCY, true),
    }] : [],
    ...cartTotal.shippingFee ? [{ id: 'shippingFee', label: 'Shipping Fee', value: getDisplayPrice(cartTotal.shippingFee) }] : [],
  ];

  const renderSummaryItem = (summaryItem: SummaryItem, className: string = '') => (
    <p key={summaryItem.id} className={className}>
      <span className={styles.label}>{summaryItem.label}</span>
      <span className={styles.price}>{summaryItem.value}</span>
    </p>
  );

  const renderAppliedTaxes = () => (
    <div className={styles.taxes}>
      {cartTotal.appliedTaxes?.map(
        (tax) => renderSummaryItem(
          { id: tax.label, label: tax.label, value: getDisplayPrice(tax.value) },
          styles.taxItem,
        ),
      )}
    </div>
  );

  const renderTax = () => (
    <div>
      {renderSummaryItem({ id: 'tax', label: 'Tax', value: getDisplayPrice(cartTotal.tax) } as SummaryItem)}
      {renderAppliedTaxes()}
    </div>
  );

  const renderCheckoutButton = () => (
    <>
      {!isPaymentPage && (
      <Button
        color="primary"
        variant="contained"
        className={styles.checkoutButton}
        onClick={onCheckoutClick}
        disabled={disableCheckout || isCartLoading}
      >
        {checkoutButtonLabel}
      </Button>
      )}
      {isViewCartButtonVisible && isSliderView && (
        <Button variant="outlined" href="/cart" className={styles.viewCartButton}>
          View Cart
        </Button>
      )}
    </>
  );

  const renderSummaryItemRows = () => {
    if (isSliderView) {
      return renderSummaryItem(subTotalRow, styles.subTotal);
    }
    return (
      <>
        {summaryItems.map((item) => renderSummaryItem(item))}
        {renderTax()}
        {renderSummaryItem(
          { id: 'grandTotal', label: 'Total Amount', value: getDisplayPrice(cartTotal.grandTotal) },
          styles.grandTotal,
        )}
      </>
    );
  };

  return (
    <div className={`${styles.orderTotalSection} ${isSliderView ? styles.sliderViewSummary : ''}`}>
      {renderSummaryItemRows()}
      {renderCheckoutButton()}
    </div>
  );
}
