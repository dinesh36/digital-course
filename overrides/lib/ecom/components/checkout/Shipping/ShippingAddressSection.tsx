import React, { useRef } from 'react';
import { AddressForm } from '@/ecom/components/account';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { loadCustomerAddresses, loadRegionsByCountry } from '@/ecom/store/customer-address/customer-address-thunk';
import { Loading } from '@/ui/components';
import { hasValidBillingInfo, hasValidShippingMethod } from '@/ecom/components/checkout/utils';
import { updateBillingAndShipMethodThunk } from '@/ecom/store/cart/cart-thunk';

export function ShippingAddressSection() {
  const dispatch = useAppDispatch();
  const { addresses: customerAddresses, isFetchingAddresses, stateOptions } = useAppSelector((state) => state.address);
  const isLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);
  const { cartId, totalItems } = useAppSelector((state) => state.cart);
  const hasShippingMethod = useAppSelector(hasValidShippingMethod);
  const hasBillingMethod = useAppSelector(hasValidBillingInfo);
  const prevShippingCode = useRef<string | undefined>(shippingAddress?.postcode);
  // -1 is set to trigger the shipping method for the first time when lending in this page
  const prevCartItemsLength = useRef<number>(-1);
  const shouldUpdateBillingShippingDetails = cartId && shippingAddress?.postcode && (
    // Update if there is no details available for the shipping or billing
    (Boolean(shippingAddress && Object.keys(shippingAddress).length) && (!hasShippingMethod || !hasBillingMethod))
    || prevShippingCode.current !== shippingAddress?.postcode // update on postal code change
    || prevCartItemsLength.current !== totalItems // Update on cart items change
  );

  React.useEffect(() => {
    if (!customerAddresses.length && isLoggedIn) {
      dispatch(loadCustomerAddresses());
    }
    if (!stateOptions.length) {
      dispatch(loadRegionsByCountry());
    }

    if (shouldUpdateBillingShippingDetails) {
      prevShippingCode.current = shippingAddress?.postcode;
      prevCartItemsLength.current = totalItems;
      dispatch(
        updateBillingAndShipMethodThunk({
          cartId,
          postcode: shippingAddress.postcode,
        }),
      );
    }
  }, [
    customerAddresses.length,
    stateOptions.length,
    isLoggedIn,
    shouldUpdateBillingShippingDetails,
  ]);

  if (isFetchingAddresses) {
    return <Loading />;
  }

  return (
    <AddressForm isShipping />
  );
}
