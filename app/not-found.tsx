import React from 'react';
import NotFoundPage from '@/ecom/pages/layout/NotFound/NotFoundPage';
import StaticLayoutContainer from '@/ecom/pages/layout/StaticLayoutContainer';

// The root layout is only the document shell, so the page chrome comes from the static layout (the 404 does not depend on the
// request).
export default function NotFound() {
  return (
    <StaticLayoutContainer>
      <NotFoundPage />
    </StaticLayoutContainer>
  );
}
