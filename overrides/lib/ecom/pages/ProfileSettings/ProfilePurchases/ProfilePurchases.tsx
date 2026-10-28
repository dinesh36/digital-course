'use client';

import { ShoppingCartIcon } from 'lucide-react';
import React from 'react';
import styles from './ProfilePurchases.module.scss';
import { Loading, Typography } from '@/ui/components';
import { Pagination } from '@/ecom/components/layout';
import { formatOrderAmount, formatOrderDate } from '@/ecom/components/account/Order/OrdersDetails/utils';
import useOrders from '@/ecom/pages/account/Order/OrderHistory/useOrders';

export default function ProfilePurchases() {
  const {
    orders, isLoading, totalPages, currentPage,
  } = useOrders();

  const renderHeader = () => (
    <div className={styles.header}>
      <Typography variant="h1" component="h1">Purchase & Billing History</Typography>
      <p>View all your purchases for your courses here</p>
    </div>
  );

  const renderTableHeader = () => (
    <tr>
      <th>Order Id</th>
      <th>Date</th>
      <th>Course/Material</th>
      <th className={styles.right}>Amount</th>
    </tr>
  );

  // One row per order: the courses in it and what was paid (the order total, with tax)
  const renderTableContent = () => orders.map((order) => (
    <tr key={order.id}>
      <td>{order.orderNumber}</td>
      <td>{formatOrderDate(order)}</td>
      <td>{order.items.map((item) => item.name).join(', ')}</td>
      <td className={styles.right}>{formatOrderAmount(order)}</td>
    </tr>
  ));

  const renderTable = () => (
    <div className={styles.tableWrapper}>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
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
      {isLoading && <Loading message="Loading purchases..." />}
      {!isLoading && (orders.length > 0 ? renderTable() : renderEmptyState())}
      {renderPagination()}
    </div>
  );
}
