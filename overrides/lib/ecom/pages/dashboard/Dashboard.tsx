'use client';

import { ArrowRight, ShoppingCartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Dashboard.module.scss';
import { Button, Loading, Typography } from '@/ui/components';
import { Pagination } from '@/ecom/components/layout';
import { PRODUCTS_PER_PAGE } from '@/ecom/constants';
import { getPurchasedProducts } from '@/ecom/services/product';
import { Product } from '@/ecom/types/product';
import ProductTile from '@/ecom/components/product/ProductTile/ProductTile';

// The courses the customer bought: `GET /products/purchased` (each course once, the newest purchase first, by the same
// rule as the download link), paged.
export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;
  const [courses, setCourses] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const { items, total_count: totalCount } = await getPurchasedProducts({
          pageSize: PRODUCTS_PER_PAGE,
          currentPage,
        });
        setCourses(items);
        setTotalPages(Math.ceil(totalCount / PRODUCTS_PER_PAGE));
      } catch {
        setCourses([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, [currentPage]);

  const renderPurchasedCourses = () => courses.map((product) => (
    <ProductTile key={product.sku} product={product} isDashboardTile />
  ));

  const renderHeader = () => (
    <div className={styles.header}>
      <Typography variant="h2" component="h2" className={styles.title}>My Courses</Typography>
      <Button className={styles.browseButton} variant="clear" onClick={() => router.push('/courses')}>
        Browse More
        <ArrowRight className={styles.icon} />
      </Button>
    </div>
  );

  const renderMyCourse = () => (
    <div className={styles.purchasesList}>
      <div className={styles.ordersList}>{renderPurchasedCourses()}</div>
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.icon}><ShoppingCartIcon /></div>
      <Typography variant="h3" component="h3">No purchases yet</Typography>
      <p>Your purchased courses will appear here.</p>
    </div>
  );

  const renderPagination = () => !isLoading && courses.length > 0 && totalPages > 1 && (
    <Pagination currentPage={currentPage} totalPages={totalPages} syncWithQuery className="mt-4" />
  );

  return (
    <div className={styles.profilePurchasesContainer}>
      {renderHeader()}
      {isLoading && <Loading message="Loading your courses..." />}
      {!isLoading && (courses.length > 0 ? renderMyCourse() : renderEmptyState())}
      {renderPagination()}
    </div>
  );
}
