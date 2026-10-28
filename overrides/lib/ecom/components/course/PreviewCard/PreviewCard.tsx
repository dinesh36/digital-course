'use client';

import React from 'react';
import {
  CheckCircle, FileText, Code, Award, Download, Clock,
} from 'lucide-react';
import styles from './PreviewCard.module.scss';
import { Product } from '@/ecom/types/product';
import { AddToCartButton, ProductPrice } from '@/ecom/components/product';
import { Button } from '@/ui/components';
import { useProductDownload } from '@/ecom/components/product/useProductDownload';

type Props = {
  product: Product
};

export default function PreviewCard({
  product,
}: Props) {
  const { canDownload, isDownloading, downloadProduct } = useProductDownload(product);
  const isPurchased = Boolean(product.isPurchased);

  const renderDocItem = (Icon: React.ComponentType<{ className?: string }>, text: string) => (
    <li className={styles.docItem}>
      <span className={styles.docIcon}><Icon /></span>
      <span>{text}</span>
    </li>
  );

  const renderMedia = () => (
    <div className={styles.media}>
      <img src={product.thumbnailImage.url} alt="Course Preview" className={styles.previewImage} />
    </div>
  );

  const renderDocumentSection = () => (
    <div className={styles.docsSection}>
      <h4 className={styles.docsTitle}>Document Details:</h4>
      <ul className={styles.docList}>
        {renderDocItem(FileText, `${product.documentPageCount} Pages`)}
        {renderDocItem(Code, `${product.documentFormat} Format`)}
        {renderDocItem(Award, product.documentFileSize as string)}
        {renderDocItem(Clock, `${product.documentHours} hours` as string)}
      </ul>
    </div>
  );

  const renderDownloadButton = () => (
    <Button
      variant="contained"
      type="button"
      className={styles.outlineButton}
      onClick={downloadProduct}
      disabled={isDownloading}
    >
      <Download />
      <span>{isDownloading ? 'Downloading...' : 'Download Course PDF'}</span>
    </Button>
  );

  const renderPurchasedBadge = () => (
    <div className={styles.purchasedBadge}>
      <CheckCircle />
      <span>You own this course</span>
    </div>
  );

  return (
    <div className={styles.previewWrap}>
      <div className={styles.glassCard}>
        {renderMedia()}
        <div className={styles.cardBody}>
          <ProductPrice product={product} className={styles.productPrice} />

          {isPurchased ? renderPurchasedBadge() : (
            <AddToCartButton product={product} quantity={1} className={styles.addToCartButton} />
          )}
          {renderDocumentSection()}
          {canDownload ? renderDownloadButton() : null}
        </div>
      </div>
    </div>
  );
}
