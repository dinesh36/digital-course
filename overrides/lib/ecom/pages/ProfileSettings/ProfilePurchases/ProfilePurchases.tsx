'use client';

import { ShoppingCartIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import styles from './ProfilePurchases.module.scss';
import { Loading, Typography } from '@/ui/components';
import { Pagination } from '@/ecom/components/layout';
import { formatOrderDate } from '@/ecom/utils';
import { CustomerOrder, CustomerOrderLineItem } from '@/ecom/types/account';
import useOrders from '@/ecom/pages/account/Order/OrderHistory/useOrders';

type OrderItem = CustomerOrderLineItem & CustomerOrder;
type OrderItems = Array<OrderItem>;

export default function ProfilePurchases() {
  const {
    orders, isLoading, totalPages, currentPage,
  } = useOrders();

  const orderItems: OrderItems = useMemo(() => {
    const items: OrderItems = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        items.push({ ...item, ...order });
      });
    });
    return items;
  }, [orders]);

  const getOrderAmount = (order: CustomerOrder) => order.grandTotal ?? 0;

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
      <th>Instructor</th>
      <th className={styles.right}>Amount</th>
    </tr>
  );

  const renderTableContent = () => orderItems.map((orderItem) => (
    <tr key={orderItem.orderNumber}>
      <td>{orderItem.orderNumber}</td>
      <td>{formatOrderDate(orderItem.orderDate)}</td>
      <td>{orderItem.product.name}</td>
      <td>{orderItem.product.documentAuthorName}</td>
      <td>
        {' '}
        ₹
        {getOrderAmount(orderItem).toLocaleString('en-IN')}
      </td>
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
