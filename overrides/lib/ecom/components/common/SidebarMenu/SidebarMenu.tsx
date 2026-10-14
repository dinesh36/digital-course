'use client';

import type { ReactNode } from 'react';
import { Typography } from '@/ui/components';
import styles from './SidebarMenu.module.scss';

export type SidebarMenuItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

export type SidebarMenuSection = {
  key: string;
  title?: string;
  items: SidebarMenuItem[];
};

type SidebarMenuProps = {
  title?: ReactNode;
  sections: SidebarMenuSection[];
  className?: string;
};

export default function SidebarMenu({ title, sections, className = '' }: SidebarMenuProps) {
  const renderTitle = () => (title ? (
    <Typography variant="h2" component="h2" className={styles.title}>
      {title}
    </Typography>
  ) : null);

  const renderMenuItems = (section: SidebarMenuSection) => section.items.map((item) => (
    <button
      key={item.key}
      type="button"
      onClick={item.onClick}
      className={`${styles.menuItem} ${item.isActive ? styles.active : ''}`}
      aria-current={item.isActive ? 'page' : undefined}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  ));

  const renderSections = () => (
    <div className={styles.sections}>
      {sections.map((section) => (
        <div key={section.key} className={styles.menuSection}>
          {section.title ? <div className={styles.menuTitle}>{section.title}</div> : null}
          <div className={styles.menu}>{renderMenuItems(section)}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`${styles.sidebarWrapper} ${className}`.trim()}>
      {renderTitle()}
      {renderSections()}
    </div>
  );
}
