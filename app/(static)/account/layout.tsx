'use client';

import React from 'react';
import AccountContainer from '@/ecom/pages/account/AccountContainer/AccountContainer';

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AccountContainer>
      {children}
    </AccountContainer>
  );
}
