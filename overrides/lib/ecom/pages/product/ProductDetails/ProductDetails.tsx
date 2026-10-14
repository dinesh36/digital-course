'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams, notFound, useSearchParams } from 'next/navigation';
import ProductInfo from '@/ecom/components/product/ProductInfo/ProductInfo';
import styles from '@/ecom/pages/product/ProductDetails/ProductDetails.module.scss';
import ProductImagePreviewer from '@/ecom/components/product/ProductImagePreviewer/ProductImagePreviewer';
import { Product } from '@/ecom/types/product';
import { Loading, VisibleOnScroll } from '@/ui/components';
import { RelatedProduct, ProductContents } from '@/ecom/components/product';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { fetchProductByUrlKey } from '@/ecom/store/product/product-details-thunk';
import { setProductData } from '@/ecom/store/product/product-details-slice';
import { ApiState } from '@/ecom/types/common';
import { getProductAttributesFromQuery } from '@/ecom/utils';
import CanvasFeatures from '@/ecom/components/product/CanvasFeatures/CanvasFeatures';

export default function ProductDetails() {
  const params = useParams();
  const rawUrlKey = params?.['courses-urlKey'];
  const urlKey: string | undefined = Array.isArray(rawUrlKey) ? rawUrlKey[0] : rawUrlKey;
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.productDetails.data);
  const apiState = useAppSelector((s) => s.productDetails.apiState);

  const urlAttributes = useMemo(() => getProductAttributesFromQuery(searchParams?.get('attributes') || ''), [searchParams]);

  useEffect(() => {
    if (urlKey && urlKey !== product?.urlKey) {
      dispatch(fetchProductByUrlKey({ urlKey, urlAttributes }));
    }
  }, [urlKey, urlAttributes, product]);

  if (apiState === ApiState.Loading) {
    return <Loading message="Fetching product details..." minHeight="80vh" />;
  }

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div className={styles.productDetailsContainer}>
        <ProductImagePreviewer product={product} />
        <ProductInfo product={product} setProduct={(p: Product) => dispatch(setProductData(p))} />
      </div>
      <ProductContents product={product} />
      <CanvasFeatures />
      <VisibleOnScroll>
        <RelatedProduct sku={product.sku} />
      </VisibleOnScroll>
    </>
  );
}
