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

  // The rating and the number of reviews of the product; they change when a review is added.
  const [summary, setSummary] = useState({ averageRating: product.ratingSummary ?? 0, totalReviews: product.totalReviews ?? 0 });
  const [refreshKey, setRefreshKey] = useState(0);
  const { totalReviews } = summary;

  useEffect(() => {
    setSummary({ averageRating: product.ratingSummary ?? 0, totalReviews: product.totalReviews ?? 0 });
  }, [product.productId]);

  // The page moves when the form closes and the block changes height: after a review, go to the top of the review block.
  // eslint-disable-next-line no-undef
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollPending = useRef(false);
  const scrollToSection = () => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // The list loads when it comes into view; one the customer just created (the first review) is shown at once.
  const [loadWhenVisible, setLoadWhenVisible] = useState(!!product.totalReviews);

  useEffect(() => {
    setLoadWhenVisible(!!product.totalReviews);
  }, [product.productId]);

  // The list loads itself again (once) and reports the new rating. The first review is the whole rating, so it is shown now.
  const onReviewSubmitted = ({ rating }: { rating: number }) => {
    setShowReviewForm(false);
    setSummary((prev) => (prev.totalReviews ? prev : { averageRating: rating, totalReviews: 1 }));
    setRefreshKey((prev) => prev + 1);
    scrollPending.current = true;
    setTimeout(scrollToSection, 0);
  };

  // Once the list has loaded the block has its final height: go to its top again.
  const onReviewsLoaded = (freshSummary: { averageRating: number, totalReviews: number }) => {
    setSummary(freshSummary);
    if (scrollPending.current) {
      scrollPending.current = false;
      scrollToSection();
    }
  };

  const ListContainer = loadWhenVisible ? VisibleOnScroll : React.Fragment;
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
          <ProductReviewForm
            onCancel={() => setShowReviewForm((prev) => !prev)}
            productId={product.productId}
            onSubmitted={onReviewSubmitted}
          />
        </div>
      )}
    </div>
  );

  const renderRatingSummary = () => (
    <div className={styles.ratingSummary}>
      <Typography variant="h2" component="h2">{summary.averageRating.toFixed(1)}</Typography>
      <div className={styles.starSummary}>
        <ProductStarRating value={summary.averageRating} size={20} />
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
      <ListContainer>
        {renderReviewTitle()}
        {showReviewForm && (
          <div ref={formRef} className={styles.reviewFormContainer}>
            <ProductReviewForm
              onCancel={() => setShowReviewForm((prev) => !prev)}
              productId={product.productId}
              onSubmitted={onReviewSubmitted}
            />
          </div>
        )}
        <ProductReviewList product={product} refreshKey={refreshKey} onLoaded={onReviewsLoaded} />
      </ListContainer>
    </div>
  );

  return (
    // The navbar is fixed: keep the top of the block below it.
    <div ref={sectionRef} className={styles.reviewSection} style={{ scrollMarginTop: '88px' }}>
      {totalReviews ? renderReviewList() : renderReviewCart()}
    </div>
  );
}
