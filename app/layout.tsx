import React from 'react';
import LayoutContainer from '@/ecom/pages/layout/LayoutContainer';
import '../styles/globals.scss';

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  );
}
