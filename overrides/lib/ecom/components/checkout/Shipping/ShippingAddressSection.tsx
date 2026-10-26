import React from 'react';
import { AddressForm } from '@/ecom/components/account';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { loadCustomerAddresses, loadRegionsByCountry } from '@/ecom/store/customer-address/customer-address-thunk';
import { Loading } from '@/ui/components';

export function ShippingAddressSection() {
  const dispatch = useAppDispatch();
  const { addresses: customerAddresses, isFetchingAddresses, stateOptions } = useAppSelector((state) => state.address);
  const isLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  React.useEffect(() => {
    if (!customerAddresses.length && isLoggedIn) {
      dispatch(loadCustomerAddresses());
    }
    if (!stateOptions.length) {
      dispatch(loadRegionsByCountry());
    }
  }, [
    customerAddresses.length,
    stateOptions.length,
    isLoggedIn,
  ]);

  if (isFetchingAddresses) {
    return <Loading />;
  }

  return (
    <AddressForm isShipping />
  );
}
