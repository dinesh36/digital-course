import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductReview.module.scss';
import { Button, Typography, VisibleOnScroll } from '@/ui/components';
import { Product } from '@/ecom/types/product';
import { ProductReviewForm, ProductReviewList, ProductStarRating } from '@/ecom/components/product';
import { EditIcon } from '@/ui/icons';
import StarredChatIcon from '@/ui/icons/StarredChatIcon';

interface ProductReviewProps {
  product: Product;
  showForm?: boolean;
  onToggleForm?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProductReview({ product, showForm, onToggleForm }: ProductReviewProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const totalReviews = product.totalReviews ?? 0;
  // eslint-disable-next-line no-undef
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showReviewForm && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showReviewForm]);

  const reviewButton = () => (
    <Button variant="outlined" onClick={() => setShowReviewForm((prev) => !prev)} className={styles.writeReviewButton}>
      <span><EditIcon /></span>
      {totalReviews ? 'Write a Review' : 'Write the First Review'}
    </Button>
  );

  const renderReviewCart = () => (
    <div className={styles.reviewCard}>
      <StarredChatIcon />
      <Typography variant="h2" component="h2" className={styles.reviewTitle}>Reviews & Ratings</Typography>
      <Typography variant="h3" component="h3" className={styles.emptyTitle}>No reviews yet.</Typography>
      <div className={styles.emptySubtitle}>Be the first to share your experience with this document.</div>
      {reviewButton()}
      <div className={styles.footerText}>Your feedback helps other learners make confident decisions.</div>

      {showReviewForm && (
        <div ref={formRef} className={styles.reviewFormContainer}>
          <ProductReviewForm onCancel={() => setShowReviewForm((prev) => !prev)} sku={product.sku} />
        </div>
      )}
    </div>
  );

  const renderRatingSummary = () => (
    <div className={styles.ratingSummary}>
      <Typography variant="h2" component="h2">{product.ratingSummary?.toFixed(1)}</Typography>
      <div className={styles.starSummary}>
        <ProductStarRating value={product.ratingSummary} size={20} />
      </div>
      <span className={styles.reviewCount}>
        (
        {totalReviews}
        {' '}
        Reviews)
      </span>
    </div>
  );

  const renderReviewTitle = () => (
    <div className={styles.reviewTitleContainer}>
      <div>
        <Typography variant="h2" component="h2" className={styles.listTitle}>Reviews & Ratings</Typography>
        {renderRatingSummary()}
      </div>
      {reviewButton()}
    </div>
  );

  const renderReviewList = () => (
    <div className={styles.reviewListContainer}>
      <VisibleOnScroll>
        {renderReviewTitle()}
        {showReviewForm && (
          <div ref={formRef} className={styles.reviewFormContainer}>
            <ProductReviewForm onCancel={() => setShowReviewForm((prev) => !prev)} sku={product.sku} />
          </div>
        )}
        <ProductReviewList product={product} />
      </VisibleOnScroll>
    </div>
  );

  return (
    <div>
      {totalReviews ? renderReviewList() : renderReviewCart()}
    </div>
  );
}
