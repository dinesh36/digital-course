import React from 'react';
import SSRLayoutContainer from '@/ecom/pages/layout/SSRLayoutContainer';

// Rendered on every request: the layout reads the request's path and signed-in user (`headers()`).
export default async function SSRLayout({ children }: { children: React.ReactNode; }) {
  return (
    <SSRLayoutContainer>
      {children}
    </SSRLayoutContainer>
  );
}
