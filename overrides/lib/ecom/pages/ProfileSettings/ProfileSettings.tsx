'use client';

import React, { useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProfileSettings.module.scss';
import SidebarMenu, { SidebarMenuSection } from '@/ecom/components/common/SidebarMenu/SidebarMenu';
import { ChangePassword, ProfileDetails, ProfilePurchases } from '@/ecom/pages/ProfileSettings';
import { Button } from '@/ui/components';
import { profileMenuItems } from '@/ecom/common/sidebarData';

export default function ProfileSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(profileMenuItems[0].items[0].key);

  const componentMap: Record<string, ComponentType> = { ProfileDetails, ChangePassword, ProfilePurchases };

  const sections: SidebarMenuSection[] = useMemo(
    () => profileMenuItems.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        isActive: activeTab === item.key,
        onClick: () => setActiveTab(item.key),
      })),
    })),
    [activeTab],
  );

  const activeItem = profileMenuItems
    .flatMap((section) => section.items)
    .find((item) => item.key === activeTab);
  const activeComponentKey = activeItem?.component;
  const ActiveComponent = activeComponentKey ? componentMap[activeComponentKey] : undefined;

  const renderBackButton = () => (
    <Button variant="clear" type="button" className={styles.backButton} onClick={() => router.push('/account/dashboard')}>
      <p>←</p>
      Back to My Courses
    </Button>
  );

  return (
    <>
      <div className={styles.backButtonContainer}>{renderBackButton()}</div>
      <div className={styles.container}>
        <SidebarMenu title="Settings" sections={sections} />
        {ActiveComponent && <ActiveComponent />}
      </div>
    </>
  );
}
