import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { UserAddress } from '@/ecom/types/account';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { loadCustomerAddresses, loadStates } from '@/ecom/store/customer-address/customer-address-thunk';
import { Loading } from '@/ui/components';
import { CheckoutForm } from './CheckoutForm';

export function CheckoutFormContainer() {
  const dispatch = useAppDispatch();
  const { addresses, isFetchingAddresses, stateOptions } = useAppSelector((state) => state.address);
  const isLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const user = useAppSelector((state) => state.auth.user);

  // The saved address, or for a new one the account's name and phone
  const defaultValues = useMemo(() => ({
    ...addresses[0],
    firstName: addresses[0]?.firstName ?? user?.firstName,
    lastName: addresses[0]?.lastName ?? user?.lastName,
    phone: addresses[0]?.phone ?? user?.phone,
  }), [addresses, user]);
  const form = useForm<UserAddress>({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    if (!addresses.length && isLoggedIn) {
      dispatch(loadCustomerAddresses());
    }
    if (!stateOptions.length) {
      dispatch(loadStates());
    }
  }, [addresses.length, stateOptions.length, isLoggedIn]);

  useEffect(() => {
    if (addresses.length) {
      form.trigger();
    }
  }, [addresses, form]);

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  if (isFetchingAddresses) {
    return <Loading />;
  }

  return <CheckoutForm form={form} />;
}
