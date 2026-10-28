import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './CheckoutSuccess.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { Button, Loading } from '@/ui/components';
import { setIsFullScreenLoadingVisible } from '@/ecom/store/layout/layout-slice';
import { getProductPath } from '@/ecom/utils/pathUtils';

export default function CheckoutSuccess() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const orderNumber = useAppSelector((state) => state.payment.succeedOrderId);

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
        Your order is confirmed. Your courses are in My Courses, and we have emailed you the order details.
      </p>
    </>
  );

  const renderOrderDetails = () => (
    <div className={styles.details}>
      <p>
        Order ID:
        <span className={styles.orderIdDisabled}>{`#${orderNumber}`}</span>
      </p>
    </div>
  );

  const renderContinueShoppingButton = () => (
    <div className={styles.button}>
      <Button onClick={() => router.push('/account/dashboard')}>
        Go to My Courses
      </Button>
      <Button variant="outlined" onClick={() => router.push(getProductPath())}>
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
