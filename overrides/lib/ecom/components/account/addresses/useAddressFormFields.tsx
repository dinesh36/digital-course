import React from 'react';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { CheckboxField, DropDown, TextField } from '@/ui/form';
import { Button } from '@/ui/components';
import { openAuthModal } from '@/ecom/store/layout/layout-slice';
import styles from '@/ecom-base/components/account/addresses/AddressForm/AddressForm.module.scss';

const personalDetailsOrder = ['firstname', 'lastname', 'email', 'telephone'];
const useAddressFormFields = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const stateOptions = useAppSelector((state) => state.address.stateOptions);
  const dispatch = useAppDispatch();

  return React.useMemo(() => {
    const createField = (
      name: string,
      label: string | React.ReactNode,
      placeholder: string,
      rules?: { required: string, pattern?: {} } | undefined,
      renderer = TextField,
      disabled = false,
    ) => (
      {
        name, label, placeholder, renderer, rules, disabled,
      }
    );

    const emailLabel = isLoggedIn
      ? 'Email'
      : (
        <>
          <span>Email  (Already have an account? </span>
          <Button variant="clear" className={styles.loginTextButton} onClick={() => dispatch(openAuthModal())}>
            Log in
          </Button>
          <span>)</span>
        </>
      );

    const base = [
      createField(
        'email',
        emailLabel,
        'Email',
        {
          required: 'Enter your email.',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
        },
        TextField,
        isLoggedIn,
      ),
      createField('firstname', 'First Name', 'First Name', { required: 'First Name is required.' }),
      createField('lastname', 'Last Name', 'Last Name', { required: 'Last Name is required.' }),
      createField('telephone', 'Phone Number', 'Phone Number', { required: 'Enter your phone number.' }),
      createField('company', 'Company', 'Company'),
      createField('addressLine1', 'Address', 'Address', { required: 'Enter your address.' }),
      createField('addressLine2', 'Locality', 'Locality'),
      createField('postcode', 'Pincode', 'Pincode', { required: 'Enter your Pin code.' }),
      {
        name: 'region.regionCode',
        label: 'State',
        placeholder: 'Select State',
        renderer: DropDown,
        rules: { required: 'Select your state.' },
        options: stateOptions.map((option) => ({
          label: option.name,
          value: option.code,
        })),
        colSpan: isLoggedIn ? 1 : 2,
      },
      {
        name: 'city',
        label: 'City',
        placeholder: 'city',
        renderer: TextField,
        rules: { required: 'Select your city.' },
        colSpan: isLoggedIn ? 1 : 2,
      },
      {
        name: 'isDefaultAddress', label: 'Mark as Default Address', renderer: CheckboxField, colSpan: 2,
      },
    ].map((field: any) => ({
      ...field, colSpan: field.colSpan || 2,
    }));

    return isLoggedIn
      ? base
      : base.filter((f) => f.name !== 'isDefaultAddress');
  }, [stateOptions, isLoggedIn]);
};

export default useAddressFormFields;

export const getBillingDetails = (fields: any[], colSpan: number) => fields
  .filter((f: any) => !personalDetailsOrder.includes(String(f.name))
      && Boolean(f.rules && f.rules.required))
  .map((f: any) => {
    if (f.name === 'city') return { ...f, colSpan };
    if (f.name === 'region.regionCode') return { ...f, colSpan };
    return { ...f };
  });

export const getPersonalDetails = (fields: any[], colSpan: number) => fields
  .filter((f: any) => personalDetailsOrder.includes(String(f.name)))
  .map((f: any) => {
    if (f.name === 'firstname') return { ...f, colSpan };
    if (f.name === 'lastname') return { ...f, colSpan };
    return { ...f };
  });
