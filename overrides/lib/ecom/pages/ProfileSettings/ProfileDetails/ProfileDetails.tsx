'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '@/ui/form';
import styles from './ProfileDetails.module.scss';
import profileFormFields from '@/ecom/pages/account/Profile/profileFormFields';
import { Button, Typography } from '@/ui/components';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { updateCustomerInfo } from '@/ecom/services/auth';
import { User } from '@/ecom/types/auth';

export default function ProfileDetails() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<User>({
    defaultValues: { firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '' },
  });

  React.useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  const onSubmit = async (data: User) => {
    setIsLoading(true);
    try {
      await updateCustomerInfo(data, dispatch);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileHeader = () => (
    <div className={styles.header}>
      <Typography variant="h1" component="h1">Personal & Academic Identity</Typography>
    </div>
  );

  const renderForm = () => (
    <div className={styles.section}>
      <Typography variant="h2" component="h2" className={styles.sectionTitle}>Basic Information</Typography>

      <AppForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.formWrapper}>
          <FieldGroup formFields={profileFormFields} displayLabel fieldSize="medium" />
          <Button
            className={styles.saveBtn}
            disabled={!form.formState.isDirty || isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </AppForm>
    </div>
  );

  return (
    <div className={styles.profileDetailsCard}>
      {renderProfileHeader()}
      {renderForm()}
    </div>
  );
}
