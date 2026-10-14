'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '@/ui/form';
import styles from './ChangePassword.module.scss';
import changePasswordFormFields from '@/ecom/components/account/ChangePassword/changePasswordFormFields';
import { changeCustomerPassword } from '@/ecom/services/account';
import { Button, Typography } from '@/ui/components';

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const form = useForm<FormData>();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    const { oldPassword, newPassword } = data;

    setIsLoading(true);
    try {
      await changeCustomerPassword(oldPassword, newPassword);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => (
    <div className={styles.header}>
      <Typography variant="h1" component="h1">Change Password</Typography>
    </div>
  );

  const renderPasswordSection = () => (
    <div className={styles.section}>
      <AppForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.formWrapper}>
          <FieldGroup
            formFields={changePasswordFormFields}
            displayLabel
            fieldSize="medium"
          />

          <Button
            type="button"
            variant="contained"
            color="primary"
            className={styles.primaryBtn}
            disabled={!form.formState.isDirty || isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </AppForm>
    </div>
  );

  return (
    <div className={styles.profileSecurityCard}>
      {renderHeader()}
      {renderPasswordSection()}
    </div>
  );
}
