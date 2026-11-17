import React from 'react';
import StaticLayoutContainer from '@/ecom/pages/layout/StaticLayoutContainer';

// Built once at `next build`: the layout must not read the request. Pages that can be the same for everyone go in this group.
export default function StaticLayout({ children }: { children: React.ReactNode; }) {
  return (
    <StaticLayoutContainer>
      {children}
    </StaticLayoutContainer>
  );
}
