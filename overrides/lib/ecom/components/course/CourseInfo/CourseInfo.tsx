'use client';

import React from 'react';
import styles from './CourseInfo.module.scss';
import { Typography } from '@/ui/components';
import { renderHtml } from '@/ecom/utils';
import { Product } from '@/ecom/types/product';
import { UserIcon } from '@/ui/icons';
import { ProductReview } from '@/ecom/components/product/ProductReview/ProductReview';

type Props = {
    product: Product;
};

export default function CourseInfo({ product }: Props) {
  const renderTitle = () => (
    <Typography variant="h1" className={styles.title}>{product.name}</Typography>
  );

  const renderShortDescription = () => (
    <p className={styles.description}>
      {renderHtml(product.shortDescription || 'No description available.')}
    </p>
  );

  const renderAuthorInfo = () => (
    <div className={styles.authorContainer}>
      <div className={styles.iconContainer}>
        <UserIcon className={styles.avatar} />
      </div>
      <div>
        <span className={styles.mutedSmall}>Created by</span>
        <span className={styles.instructorName}>
          {product.documentAuthorName}
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.info}>
      {renderTitle()}
      {renderShortDescription()}
      {renderAuthorInfo()}
      <div className={styles.statsRow}>
        <ProductReview product={product} />
      </div>
    </div>
  );
}
