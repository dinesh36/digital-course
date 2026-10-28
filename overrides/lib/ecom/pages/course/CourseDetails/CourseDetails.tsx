'use client';

import React, { useEffect, useMemo } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import styles from './CourseDetails.module.scss';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { getProductAttributesFromQuery } from '@/ecom/utils';
import { fetchProductByUrlKey } from '@/ecom/store/product/product-details-thunk';
import { ApiState } from '@/ecom/types/common';
import { Loading, VisibleOnScroll } from '@/ui/components';
import PreviewCard from '@/ecom/components/course/PreviewCard/PreviewCard';
import CourseInfo from '@/ecom/components/course/CourseInfo/CourseInfo';
import AboutDocumentSection from '@/ecom/components/course/AboutDocumentSection/AboutDocumentSection';
import DocumentStructureSection from '@/ecom/components/course/DocumentStructureSection/DocumentStructureSection';
import { RelatedProduct } from '@/ecom/components/product';
import { ProductReview } from '@/ecom/components/product/ProductReview/ProductReview';

export default function CourseDetails() {
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
        <DocumentStructureSection documentStructure={product.documentStructure} />
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
