import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AppForm, FieldGroup } from '@/ui/form';
import { Button } from '@/ui/components';
import ShieldIcon from '@/ui/icons/ShieldIcon';
import { UserAddress } from '@/ecom/types/account';
import { useAppSelector } from '@/ecom/store/hooks';
import useAddressFormFields from '@/ecom/components/account/addresses/useAddressFormFields';
import { useCheckoutSubmit } from '@/ecom/components/checkout/useCheckoutSubmit';
import { useIsMobile } from '@/ecom/utils';
import { CheckoutCourses } from '@/ecom/components/checkout/CheckoutCourses/CheckoutCourses';
import { CheckoutPaymentInfo } from '@/ecom/components/checkout/CheckoutPaymentInfo/CheckoutPaymentInfo';
import { getBillingDetails, getPersonalDetails } from '@/ecom/components/checkout/checkoutFields';
import styles from './CheckoutForm.module.scss';

type CheckoutFormProps = {
  form: UseFormReturn<UserAddress>;
};

// Draws the checkout page and places the order; the container loads the saved address and owns the form
export function CheckoutForm({ form }: CheckoutFormProps) {
  const isLoading = useAppSelector((state) => state.layout.isFullScreenLoaderVisible);
  const { cartTotal } = useAppSelector((state) => state.cart);
  const fields = useAddressFormFields();
  const isMobile = useIsMobile();
  const colSpan = isMobile ? 2 : 1;
  const {
    submit, errorMessage, isFreeOrder, isCashOnDelivery,
  } = useCheckoutSubmit();
  const { formState: { errors, isValid } } = form;
  const isSubmitDisabled = isLoading || Object.keys(errors).length > 0 || !isValid;

  const getSubmitLabel = () => {
    if (isLoading) return 'Processing...';
    if (isFreeOrder) return 'Place Free Order';
    const amount = `₹ ${cartTotal.grandTotal.toLocaleString('en-IN')}`;
    return isCashOnDelivery ? `Place Order - ${amount}` : `Proceed to Pay - ${amount}`;
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutContent}>
          <h1 className={styles.checkoutTitle}>Complete Your Purchase</h1>
          <AppForm
            form={form}
            onSubmit={form.handleSubmit(submit)}
            className={styles.checkoutForm}
          >
            <section className={styles.checkoutSection}>
              <CheckoutCourses />
              <h2>Personal Information</h2>
              <FieldGroup formFields={getPersonalDetails(fields, colSpan)} columns={2} displayLabel />
            </section>
            <section className={styles.checkoutSection}>
              <h2>Billing Address</h2>
              <FieldGroup formFields={getBillingDetails(fields, colSpan)} columns={2} displayLabel />
            </section>
            <div className={styles.checkoutPaymentInfo}>
              <CheckoutPaymentInfo isFreeOrder={isFreeOrder} isCashOnDelivery={isCashOnDelivery} />
            </div>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitDisabled}
              className={styles.checkoutSubmitButton}
            >
              {getSubmitLabel()}
            </Button>
          </AppForm>
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
