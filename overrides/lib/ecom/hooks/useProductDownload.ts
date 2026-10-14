'use client';

import { useCallback, useState } from 'react';
import { Product } from '@/ecom/types/product';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { fetchProductDownloadThunk } from '@/ecom/store/product/product-download-thunk';

export function useProductDownload(product?: Product) {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const [isDownloading, setIsDownloading] = useState(false);
  const sku = product?.sku;
  const isPurchased = Boolean(product?.isPurchased);
  const canDownload = isUserLoggedIn && isPurchased;

  const downloadProduct = useCallback(async (e: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!sku || isDownloading) {
      return;
    }

    setIsDownloading(true);
    try {
      const { downloadUrl } = await dispatch(fetchProductDownloadThunk({ sku })).unwrap();
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsDownloading(false);
    }
  }, [dispatch, isDownloading, sku]);

  return {
    canDownload,
    isDownloading,
    downloadProduct,
  };
}
