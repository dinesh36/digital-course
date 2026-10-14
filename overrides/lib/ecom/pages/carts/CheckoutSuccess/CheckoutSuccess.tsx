import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from '@/ecom/pages/carts/CheckoutSuccess/CheckoutSuccess.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { Button, Loading } from '@/ui/components';
import { setIsFullScreenLoadingVisible } from '@/ecom/store/layout/layout-slice';
import { PRODUCTS_PATH } from '@/ecom/constants';

export default function CheckoutSuccess() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const orderNumber = useAppSelector((state) => state.payment.succeedOrderId);
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  useEffect(() => {
    dispatch(setIsFullScreenLoadingVisible(false));
    if (!orderNumber) {
      router.replace('/');
    }
  }, [dispatch, orderNumber, router]);

  if (!orderNumber) {
    return <Loading />;
  }

  const renderSuccessCheckmarkIcon = () => (
    <svg className={styles.checkmark} viewBox="0 0 52 52">
      <circle className={styles.circle} cx="26" cy="26" r="25" />
      <path className={styles.check} fill="none" d="M14 27l7 7 17-17" />
    </svg>
  );

  const renderTitleAndMessage = () => (
    <>
      <h1>Thank You for Your Order!</h1>
      <p className={styles.message}>
        We’ve received your order and are preparing it for delivery.
      </p>
    </>
  );

  const renderOrderDetails = () => (
    <div className={styles.details}>
      <p>
        Order ID:
        {isUserLoggedIn ? (
          <button
            type="button"
            className={styles.orderId}
            onClick={() => router.replace(`/account/orders/${orderNumber}`)}
          >
            {`#${orderNumber}`}
          </button>
        ) : (
          <span className={styles.orderIdDisabled}>{`#${orderNumber}`}</span>
        )}
      </p>
      <p>
        Delivery:
        <strong style={{ marginLeft: 'var(--size-1)' }}>Expected in 5–7 Business Days</strong>
      </p>
    </div>
  );

  const renderContinueShoppingButton = () => (
    <div className={styles.button}>
      <Button onClick={() => router.push(`/${PRODUCTS_PATH}`)}>
        Continue Shopping
      </Button>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {renderSuccessCheckmarkIcon()}
        {renderTitleAndMessage()}
        {renderOrderDetails()}
        {renderContinueShoppingButton()}
      </div>
    </div>
  );
}
