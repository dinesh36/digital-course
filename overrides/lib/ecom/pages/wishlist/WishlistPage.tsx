'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductTile from '@/ecom/components/product/ProductTile/ProductTile';
import { ProductListSkeleton } from '@/ecom/components/product/ProductList/ProductListSkeleton/ProductListSkeleton';
import { Button, EmptyMessage, Typography } from '@/ui/components';
import styles from './WishlistPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { fetchCustomerWishlistWithProductDetailsThunk } from '@/ecom/store/wishlist/wishlist-thunk';
import { Pagination } from '@/ecom/components/layout';

export function WishlistPage() {
  const {
    products, isLoading, totalPages, currentPage,
  } = useAppSelector((state) => state.wishlist.wishlistPage);
  const { pageSeoDetails } = useAppSelector((state) => state.layout);
  const searchParams = useSearchParams();
  const currentPageParam = Number(searchParams?.get('page')) || 1;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCustomerWishlistWithProductDetailsThunk(currentPageParam));
  }, [currentPageParam]);

  const renderActionButton = () => (
    <div className={styles.browseMoreContainer}>
      <Button variant="outlined" color="black" onClick={() => router.push('/products')} className={styles.browseButton}>
        Browse More Courses
      </Button>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ProductListSkeleton />;
    } if (!products.length) {
      return <EmptyMessage message="Your wishlist is empty. Start adding products to see them here!" />;
    }
    return (
      <>
        <div className={styles.productGridContainer}>
          {products.map((item) => (
            <ProductTile key={item.productId} product={item} />
          ))}
        </div>
        <Pagination className="mt-2" currentPage={currentPage} totalPages={totalPages} syncWithQuery />
      </>
    );
  };

  const renderItemCount = () => (!isLoading ? (
    <div className={styles.itemCount}>
      {products.length}
      {products.length === 1 ? ' item saved' : ' items saved'}
    </div>
  ) : null);

  const renderTitle = () => (
    <Typography variant="h1" className="text-left block mb-4">
      {pageSeoDetails.pageTitle || 'My Wishlist'}
    </Typography>
  );

  return (
    <div className={styles.wishlistContainer}>
      {renderTitle()}
      {renderItemCount()}
      {renderContent()}
      {!isLoading && (renderActionButton())}
    </div>
  );
}
