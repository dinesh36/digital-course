'use client';

import React from 'react';
import {
  ArrowRight,
  Briefcase,
  Code,
  Cpu,
  HeartPulse,
  Landmark,
  LayoutGrid,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './OurCollection.module.scss';
import { Button, Typography } from '@/ui/components';
import { Link } from '@/ecom/components/layout';
import { useAppSelector } from '@/ecom/store/hooks';
import { findCategoryChildrenByName, getCategoryLink } from '@/ecom/utils/categoryUtils';
import { getProductListPath } from '@/ecom/utils/pathUtils';
import type { ProductCategory } from '@/ecom/types/productCategory';

// The home page shows the first categories of the course group, in the backend's order (the same as the filter and the footer).
const COURSES_GROUP = 'Courses Group';
const TOP_CATEGORIES_COUNT = 4;

const ICONS_BY_URL_KEY: Record<string, React.ElementType> = {
  programming: Code,
  finance: Landmark,
  'ai-digital-skills': Cpu,
  'career-business': Briefcase,
  'health-life': HeartPulse,
};

function OurCollection() {
  const router = useRouter();
  const allCategories = useAppSelector((state) => state.layout.categories.data);
  const categories = React.useMemo(
    () => findCategoryChildrenByName(allCategories, COURSES_GROUP).slice(0, TOP_CATEGORIES_COUNT),
    [allCategories],
  );

  const renderViewAllButton = (className: string, isShowIcon: boolean, variant: 'clear' | 'outlined') => (
    <Button variant={variant} className={className} onClick={() => router.push(getProductListPath())}>
      View All Courses
      {isShowIcon && <ArrowRight className={styles.viewAllIcon} />}
    </Button>
  );

  const renderTopBar = () => (
    <div className={styles.topBar}>
      <div className={styles.sectionHeading}>
        <Typography variant="h2" className={styles.heading}>Top Categories</Typography>
        <p>Explore our most popular learning paths</p>
      </div>
      {renderViewAllButton(styles.desktopViewAllBtn, true, 'clear')}
    </div>
  );

  const renderCategoryCard = (category: ProductCategory) => {
    const Icon = ICONS_BY_URL_KEY[category.urlKey] ?? LayoutGrid;

    return (
      <Link key={category.id} className={styles.card} href={getCategoryLink(category.urlKey)}>
        <div className={styles.iconWrap}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <Typography variant="h2" className={styles.cardHeader}>{category.name}</Typography>
        </div>
      </Link>
    );
  };

  const renderGrid = () => (
    <div className={styles.grid}>
      {categories.map(renderCategoryCard)}
    </div>
  );

  return (
    <section id="categories" className={styles.categoriesSection}>
      <div className={styles.categoriesContainer}>
        {renderTopBar()}
        {renderGrid()}
        {renderViewAllButton(styles.mobileViewAllBtn, false, 'outlined')}
      </div>
    </section>
  );
}

export default OurCollection;
