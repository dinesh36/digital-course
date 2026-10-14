import React, {
  useState, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '@/ui/form';
import styles from './AddressForm.module.scss';
import { Button } from '@/ui/components';
import ShieldIcon from '@/ui/icons/ShieldIcon';
import { CustomerAddress } from '@/ecom/types/account';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { LockIcon } from '@/ui/icons';
import { getProductDisplayPrice } from '@/ecom/utils/price';
import useAddressFormFields, {
  getBillingDetails,
  getPersonalDetails,
} from '@/ecom/components/account/addresses/useAddressFormFields';
import { useIsMobile, initializeRazorPay } from '@/ecom/utils';
import { clearCart } from '@/ecom/store/cart/cart-slice';
import { submitCodOrderThunk, submitRazorpayOrderThunk } from '@/ecom/store/checkout/checkout-thunk';
import { resetCartThunk, setRzpPaymentDetailsThunk } from '@/ecom/store/payment/payment-thunk';
import { setIsFullScreenLoadingVisible } from '@/ecom/store/layout/layout-slice';
import { CASH_ON_DELIVERY_PAYMENT_METHOD } from '@/ecom/constants';

type AddressFormProps = {
  onClose?: () => void;
  initialValues?: CustomerAddress;
  isShipping?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AddressForm({ onClose, initialValues, isShipping = false }: AddressFormProps) {
  const isLoading = useAppSelector((state) => state.layout.isFullScreenLoaderVisible);
  const [errorMessage, setErrorMessage] = useState('');
  const isEdit = initialValues?.id;
  const dispatch = useAppDispatch();
  const fields = useAddressFormFields();
  const isMobile = useIsMobile();
  const colSpan = isMobile ? 2 : 1;
  const router = useRouter();
  const {
    cartTotal, cartItems, shippingAddress, email,
  } = useAppSelector((state) => state.cart);

  const { addresses } = useAppSelector((state) => state.address);

  const defaultValues = useMemo(() => ({
    ...(addresses[0] || shippingAddress),
    email,
  }), [initialValues, addresses, email]);
  const form = useForm<CustomerAddress>({ defaultValues, mode: 'onChange' });
  const enableLoading = () => {
    dispatch(setIsFullScreenLoadingVisible(true));
    setErrorMessage('');
  };
  const disableLoading = () => dispatch(setIsFullScreenLoadingVisible(false));

  useEffect(() => {
    if (addresses && Object.keys(addresses).length && isShipping) {
      form.trigger();
    }
  }, [addresses, form]);

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const handleRazorpayPaymentSuccess = (rzpOrderId: string) => async (response: any) => {
    enableLoading();
    const { razorpay_payment_id: rzpPaymentId, razorpay_signature: rzpSignature } = response;

    try {
      await dispatch(setRzpPaymentDetailsThunk({ orderId: rzpOrderId, rzpPaymentId, rzpSignature })).unwrap();
      dispatch(clearCart());
      router.push('/checkout/success');
    } catch (e: any) {
      setErrorMessage(e?.message || 'Payment verification failed');
    } finally {
      disableLoading();
    }
  };

  const handleCodSubmit = async (customerAddress: CustomerAddress) => {
    enableLoading();
    try {
      await dispatch(submitCodOrderThunk({ customerAddress, isEdit })).unwrap();
      router.push('/checkout/success');
    } catch (error: any) {
      setErrorMessage(error?.message || 'Failed to place COD order');
    } finally {
      disableLoading();
    }
  };

  const handleRazorpaySubmit = async (customerAddress: CustomerAddress) => {
    enableLoading();
    try {
      const rzpResult = await dispatch(submitRazorpayOrderThunk({ customerAddress, isEdit })).unwrap();

      await initializeRazorPay({
        totalAmount: cartTotal.grandTotal,
        orderId: rzpResult.razorpayOrderId as string,
        handler: handleRazorpayPaymentSuccess(rzpResult.rzpOrderId as string),
        onModalDismiss: async () => {
          await dispatch(resetCartThunk(rzpResult.rzpOrderId as string));
          disableLoading();
        },
        rzpOrderId: rzpResult.rzpOrderId,
      });
    } catch (error: any) {
      setErrorMessage(error?.message || 'Failed to place Razorpay order');
      disableLoading();
    }
  };

  const handleSubmit = async (customerAddress: CustomerAddress) => {
    const isCashOnDelivery = process?.env?.NEXT_PUBLIC_PAYMENT_METHOD === CASH_ON_DELIVERY_PAYMENT_METHOD;

    if (isCashOnDelivery) {
      await handleCodSubmit(customerAddress);
      return;
    }
    await handleRazorpaySubmit(customerAddress);
  };
  const { formState: { errors, isValid } } = form;
  const isSaveDisabled = isLoading || Object.keys(errors).length > 0 || !isValid;

  const renderSelectedCourses = () => (
    <div className={styles.selectedCourses}>
      {cartItems.map((item, idx) => {
        const isLast = idx === cartItems.length - 1;
        return (
          <div key={item.cartItemId}>
            <div className={styles.courseCard}>
              <img
                src={item.image?.url ?? item.image}
                alt={item.name}
                className={styles.courseImage}
              />
              <div className={styles.courseMeta}>
                <h3 className={styles.courseTitle}>{item.name}</h3>
                <p className={styles.courseInstructor}>
                  {`by ${item.documentAuthorName}`}
                </p>
                <p className={styles.coursePrice}>{getProductDisplayPrice(item)}</p>
              </div>
            </div>

            {cartItems.length > 1 && !isLast && (
            <div className={styles.courseDivider} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderPersonalInfoForm = () => (
    <section className={styles.checkoutSection}>
      {renderSelectedCourses()}
      <h2>Personal Information</h2>
      <FieldGroup
        formFields={getPersonalDetails(fields, colSpan)}
        columns={2}
        displayLabel
      />
    </section>
  );

  const renderBillingForm = () => (
    <section className={styles.checkoutSection}>
      <h2>Billing Address</h2>
      <FieldGroup
        formFields={getBillingDetails(fields, colSpan)}
        columns={2}
        displayLabel
      />
    </section>
  );

  const renderAddressForm = () => (
    <AppForm
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
      className={styles.checkoutForm}
    >
      {renderPersonalInfoForm()}
      {renderBillingForm()}
      <div className={styles.checkoutPaymentInfo}>
        <p>
          <span><LockIcon /></span>
          <strong>Secure Payment via Razorpay: </strong>
          All payments are processed securely. You&#39;ll be redirected to Razorpay to complete payment.
        </p>
      </div>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        disabled={isSaveDisabled}
        className={styles.checkoutSubmitButton}
      >
        {isLoading ? 'Processing...' : `Proceed to Pay - ₹ ${cartTotal.grandTotal.toLocaleString('en-IN')}`}
      </Button>
    </AppForm>
  );

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutContent}>
          <h1 className={styles.checkoutTitle}>Complete Your Purchase</h1>
          {renderAddressForm()}
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <div className={styles.checkoutSecurityInfo}>
            <ShieldIcon className={styles.shield} />
            <span>Your payment information is secure and encrypted.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
