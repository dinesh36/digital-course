'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductListSidebar.module.scss';
import {
  CategoryCheckboxFilter,
} from '@/ecom/components/product/ProductList/ProductListSidebar/CategoryCheckboxFilter/CategoryCheckboxFilter';
import { FILTER_CATEGORIES_QUERY_PARAM } from '@/ecom/constants';
import { Button, Typography } from '@/ui/components';
import { FilterIcon } from '@/ui/icons';
import { Slider } from '@/ui/layout';

export default function ProductListSidebar({ isSliderOpen, setSliderOpen }: {
    isSliderOpen?: boolean,
    setSliderOpen?: (open: boolean) => void
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasActiveFilters = !!searchParams?.get(FILTER_CATEGORIES_QUERY_PARAM);

  const handleClearClick = () => {
    const nextSearchParams = new URLSearchParams(searchParams?.toString() || '');
    nextSearchParams.delete('page');
    nextSearchParams.delete(FILTER_CATEGORIES_QUERY_PARAM);

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname || '/courses';

    router.replace(nextUrl, { scroll: false });
    setSliderOpen?.(false);
  };

  const renderClearButton = () => hasActiveFilters && (
    <Button
      type="button"
      variant="text"
      className={styles.clearButton}
      onClick={handleClearClick}
    >
      Clear
    </Button>
  );

  const renderHeader = () => (
    <div className={styles.header}>
      <Typography variant="h3" component="h3" className={styles.title}>
        <FilterIcon width={16} height={16} />
        <span>Filters</span>
      </Typography>
      {renderClearButton()}
    </div>
  );

  const renderFilterSections = () => (
    <div className={styles.filterSections}>
      <CategoryCheckboxFilter categoryName="Levels" title="Levels" />
      <div className={styles.divider} />
      <CategoryCheckboxFilter categoryName="Courses Group" title="Courses Group" />
    </div>
  );

  const renderContent = () => (
    <aside className={styles.contentWrapper}>
      <div className={styles.glassCard}>
        {renderHeader()}
        {renderFilterSections()}
      </div>
    </aside>
  );

  const renderSliderTitle = () => (
    <div className={styles.sliderTitleContainer}>
      Filters
      {renderClearButton()}
    </div>
  );

  return (
    <>
      <div className={styles.sliderWrapper}>
        <Slider
          isOpen={isSliderOpen || false}
          position="left"
          width="300px"
          title={renderSliderTitle()}
          onClose={() => setSliderOpen?.(false)}
        >
          {renderContent()}
        </Slider>
      </div>
      <div className={styles.sidebarWrapper}>
        {renderContent()}
      </div>
    </>
  );
}
