'use client';

import { ArrowRight, ShoppingCartIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.scss';
import { Button, Loading, Typography } from '@/ui/components';
import { Pagination } from '@/ecom/components/layout';
import useOrders from '@/ecom/pages/account/Order/OrderHistory/useOrders';
import { CustomerOrder, CustomerOrderLineItem } from '@/ecom/types/account';
import ProductTile from '@/ecom/components/product/ProductTile/ProductTile';

type OrderItem = CustomerOrderLineItem & CustomerOrder;
type OrderItems = Array<OrderItem>;

export default function Dashboard() {
  const {
    orders, isLoading, totalPages, currentPage,
  } = useOrders();
  const router = useRouter();
  const courseOrders: OrderItems = useMemo(() => {
    const items: OrderItems = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        items.push({ ...item, ...order });
      });
    });
    return items;
  }, [orders]);

  const renderPurchasedCourses = () => courseOrders.map((orderItem) => (
    <ProductTile product={orderItem.product} orderItem={orderItem} isDashboardTile />
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

  const renderPagination = () => !isLoading && orders.length > 0 && totalPages > 1 && (
    <Pagination currentPage={currentPage} totalPages={totalPages} syncWithQuery className="mt-4" />
  );

  return (
    <div className={styles.profilePurchasesContainer}>
      {renderHeader()}
      {isLoading && <Loading message="Loading your courses..." />}
      {!isLoading && (courseOrders.length > 0 ? renderMyCourse() : renderEmptyState())}
      {renderPagination()}
    </div>
  );
}
