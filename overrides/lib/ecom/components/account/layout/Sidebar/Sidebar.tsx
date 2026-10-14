'use client';

import React, { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SidebarMenu from '@/ecom/components/common/SidebarMenu/SidebarMenu';
import { SignOutModal } from '@/ecom/components/SignOutModal/SignOutModal';
import { sidebarSections } from '@/ecom/common/sidebarData';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const isProfileSettingsPage = pathname === '/account/profile-settings';

  const handleNavigation = (route: string) => {
    setShowSignOutModal(false);
    router.push(route);
  };

  const sections = useMemo(
    () => sidebarSections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        icon: item.icon,
        isActive: item.route ? pathname.startsWith(item.route) : showSignOutModal,
        onClick: () => (item.route ? handleNavigation(item.route) : setShowSignOutModal(true)),
      })),
    })),
    [pathname, showSignOutModal],
  );
  return (
    <>
      {!isProfileSettingsPage && <SidebarMenu sections={sections} />}
      <SignOutModal show={showSignOutModal} onClose={() => setShowSignOutModal(false)} />
    </>
  );
}
