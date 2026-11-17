'use client';

import React, { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import styles from './CourseDetails.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { getProductAttributesFromQuery } from '@/ecom/utils';
import { getCourseDetails } from '@/ecom/utils/product-utils/courseDetails';
import { fetchProductByUrlKey } from '@/ecom/store/product/product-details-thunk';
import { setProductData } from '@/ecom/store/product/product-details-slice';
import type { Product } from '@/ecom/types/product';
import { ApiState } from '@/ecom/types/common';
import { Loading, VisibleOnScroll } from '@/ui/components';
import PreviewCard from '@/ecom/components/course/PreviewCard/PreviewCard';
import CourseInfo from '@/ecom/components/course/CourseInfo/CourseInfo';
import AboutDocumentSection from '@/ecom/components/course/AboutDocumentSection/AboutDocumentSection';
import DocumentStructureSection from '@/ecom/components/course/DocumentStructureSection/DocumentStructureSection';
import { RelatedProduct } from '@/ecom/components/product';
import { ProductReview } from '@/ecom/components/product/ProductReview/ProductReview';

// `initialProduct` is the product the page was built with (`next build`): it is in the HTML. The customer's own data
// (`isPurchased`) is not in it, so a signed-in customer's browser loads the product again. The query is read in the effect,
// not with `useSearchParams`, which would leave the whole page to the browser in a built page.
export default function CourseDetails({ initialProduct }: { initialProduct?: Product }) {
  const params = useParams();
  const rawUrlKey = params?.['courses-urlKey'];
  const urlKey: string | undefined = Array.isArray(rawUrlKey) ? rawUrlKey[0] : rawUrlKey;

  const dispatch = useAppDispatch();
  const storeProduct = useAppSelector((s) => s.productDetails.data);
  const isUserLoggedIn = useAppSelector((s) => s.auth.isUserLoggedIn);
  const product = storeProduct?.urlKey === urlKey ? storeProduct : (initialProduct ?? storeProduct);
  const apiState = useAppSelector((s) => s.productDetails.apiState);

  useEffect(() => {
    if (!urlKey) return;
    if (initialProduct && storeProduct?.urlKey !== urlKey) {
      dispatch(setProductData(initialProduct));
    }
    // A page without a built product loads it; a built one is loaded again for a signed-in customer (`isPurchased`)
    if (initialProduct ? isUserLoggedIn : urlKey !== storeProduct?.urlKey) {
      const attributes = new URLSearchParams(window.location.search).get('attributes') || '';
      dispatch(fetchProductByUrlKey({ urlKey, urlAttributes: getProductAttributesFromQuery(attributes) }));
    }
  }, [urlKey, isUserLoggedIn]);

  if (apiState === ApiState.Loading && !product) {
    return <Loading message="Fetching product details..." minHeight="80vh" />;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className={styles.courseDetailsWrapper}>
      <div className={styles.courseDetails}>
        <div className={`${styles.courseContent} ${styles.container}`}>
          <div className={styles.gradientBackdrop} />
          <div className={styles.row}>
            <CourseInfo product={product}>
              <AboutDocumentSection description={product.description} />
            </CourseInfo>
            <PreviewCard product={product} />
          </div>
        </div>
      </div>
      <div className={`${styles.documentSection} ${styles.container}`}>
        <DocumentStructureSection documentStructure={getCourseDetails(product).structure} />
        <div className={styles.reviewsCell}>
          <ProductReview product={product} />
        </div>
      </div>
      <div className={`${styles.container} ${styles.relatedProductsSection}`}>
        <VisibleOnScroll>
          <RelatedProduct sku={product.sku} />
        </VisibleOnScroll>
      </div>
    </div>
  );
}
