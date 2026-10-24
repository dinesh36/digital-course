import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/ecom/store';
import { createCustomerAddressThunk, updateCustomerAddressThunk } from '@/ecom/store/customer-address/customer-address-thunk';
import { setFullBillingAddressOnCartThunk } from '@/ecom/store/cart/cart-thunk';
import { setPaymentMethodThunk, placeOrderThunk, placeRazorpayOrderThunk } from '@/ecom/store/payment/payment-thunk';
import { clearCart } from '@/ecom/store/cart/cart-slice';
import { CustomerAddress } from '@/ecom/types/account';
import { CASH_ON_DELIVERY_PAYMENT_METHOD, RAZORPAY_PAYMENT_METHOD } from '@/ecom/constants';

const prepareCheckout = async (
  customerAddress: CustomerAddress,
  isEdit: string | undefined,
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const state = getState();
  const isLoggedIn = state.auth.isUserLoggedIn;
  const addresses = state.address.addresses || [];
  const { cartId } = state.cart;
  let addressToUse: CustomerAddress = customerAddress;

  if (isLoggedIn) {
    if (isEdit && customerAddress.id) {
      addressToUse = await dispatch(updateCustomerAddressThunk({ ...customerAddress, id: customerAddress.id })).unwrap();
    } else {
      const exists = addresses.some((a: CustomerAddress) => (
        (a.id && customerAddress.id && a.id === customerAddress.id)
      ));
      if (!exists) {
        addressToUse = await dispatch(createCustomerAddressThunk(customerAddress)).unwrap();
      }
    }
  }
  await dispatch(setFullBillingAddressOnCartThunk(addressToUse)).unwrap();
  if (!cartId) {
    throw new Error('Cart not found');
  }
  return cartId;
};

export const submitCodOrderThunk = createAsyncThunk<
  { orderNumber?: string },
  { customerAddress: CustomerAddress; isEdit?: string },
  { state: RootState; dispatch: AppDispatch }
>(
  'checkout/submitCodOrder',
  async ({ customerAddress, isEdit }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch as AppDispatch;
    const getState = thunkAPI.getState as () => RootState;
    const cartId = await prepareCheckout(customerAddress, isEdit, dispatch, getState);

    await dispatch(setPaymentMethodThunk({ cartId, code: CASH_ON_DELIVERY_PAYMENT_METHOD })).unwrap();
    // TODO - This is a temporary fix to ensure that the payment method is set before placing the order.
    //  We need to find a better way to handle this.
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    await dispatch(placeOrderThunk(cartId)).unwrap();
    dispatch(clearCart());
    return {
      orderNumber: getState().payment.succeedOrderId || undefined,
    };
  },
);

export const submitRazorpayOrderThunk = createAsyncThunk<
  { razorpayOrderId?: string; rzpOrderId?: string },
  { customerAddress: CustomerAddress; isEdit?: string },
  { state: RootState; dispatch: AppDispatch }
>(
  'checkout/submitRazorpayOrder',
  async ({ customerAddress, isEdit }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch as AppDispatch;
    const getState = thunkAPI.getState as () => RootState;
    const cartId = await prepareCheckout(customerAddress, isEdit, dispatch, getState);

    await dispatch(setPaymentMethodThunk({ cartId, code: RAZORPAY_PAYMENT_METHOD })).unwrap();
    // TODO - This is a temporary fix to ensure that the payment method is set before placing the order.
    //  We need to find a better way to handle this.
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    const result = await dispatch(placeRazorpayOrderThunk(cartId)).unwrap();

    return {
      razorpayOrderId: result.razorpayOrderId,
      rzpOrderId: result.rzpOrderId,
    };
  },
);
