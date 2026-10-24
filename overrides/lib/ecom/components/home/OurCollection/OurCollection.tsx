'use client';

import React from 'react';
import {
  Briefcase,
  Code,
  PenTool,
  ArrowRight,
  ChartCandlestick,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './OurCollection.module.scss';
import { Button, Typography } from '@/ui/components';
import { Link } from '@/ecom/components/layout';
import { getCategoryLink } from '@/ecom/utils/categoryUtils';

type Category = {
    name: string;
    icon: React.ElementType;
    urlKey: string;
};

const categories: Category[] = [
  {
    name: 'Programming', icon: Code, urlKey: 'programming',
  },
  {
    name: 'Business', icon: Briefcase, urlKey: 'business',
  },
  {
    name: 'Design', icon: PenTool, urlKey: 'design',
  },
  {
    name: 'Marketing', icon: ChartCandlestick, urlKey: 'marketing',
  },
];

function OurCollection() {
  const router = useRouter();

  const renderViewAllButton = (className: string, isShowIcon: boolean, variant: 'clear' | 'outlined') => (
    <Button variant={variant} className={className} onClick={() => router.push('/courses')}>
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

  const renderCategoryCard = (category: Category) => {
    const Icon = category.icon;

    return (
      <div key={category.name} className={styles.card}>
        <div className={styles.iconWrap}>
          <Icon className={styles.icon} />
        </div>
        <Link className={styles.cardContent} href={getCategoryLink(category.urlKey)}>
          <Typography variant="h2" className={styles.cardHeader}>{category.name}</Typography>
        </Link>
      </div>
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
