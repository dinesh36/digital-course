import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@storybook/icons';
import styles from './ProductReviewList.module.scss';
import { Button, Loading, Typography } from '@/ui/components';
import { Product, ProductReview } from '@/ecom/types/product';
import { fetchProductReviews } from '@/ecom/services/product';
import { ProductStarRating } from '@/ecom/components/product';

type ReviewListState = {
  items: ProductReview[], currentPage: number, totalPages: number, loadingMore: boolean
}

type ReviewSummary = { averageRating: number, totalReviews: number };

// `refreshKey` changes when a review was added: the list is loaded again from the first page, and `onLoaded` gives the
// rating and the number of reviews that come with it.
export function ProductReviewList({ product, refreshKey = 0, onLoaded }: {
  product: Product, refreshKey?: number, onLoaded?: (summary: ReviewSummary) => void
}) {
  const { productId } = product;
  const [listState, setListState] = useState<ReviewListState>({
    items: [], currentPage: 1, totalPages: 1, loadingMore: false,
  });
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  // The key of the last load, so the second run of an effect (React StrictMode in development) does not call again.
  const loadedKey = useRef<string | null>(null);

  const fetchReviews = async () => {
    setIsFirstLoading(true);
    try {
      const { items, totalPages, summary } = await fetchProductReviews({ productId, currentPage: 1 });
      setListState((prev) => ({
        ...prev, items, totalPages, currentPage: 1,
      }));
      onLoaded?.(summary);
    } finally {
      setIsFirstLoading(false);
    }
  };

  // It is shown only for a product that has reviews, so it always loads them.
  useEffect(() => {
    const key = `${productId}:${refreshKey}`;
    if (loadedKey.current === key) return;
    loadedKey.current = key;
    fetchReviews();
  }, [productId, refreshKey]);

  const onLoadMore = async () => {
    setListState((prev) => ({ ...prev, loadingMore: true }));
    try {
      const { items, totalPages } = await fetchProductReviews({ productId, currentPage: listState.currentPage + 1 });
      setListState((prev) => ({
        ...prev,
        totalPages,
        items: [...listState.items, ...items],
        currentPage: listState.currentPage + 1,
      }));
    } finally {
      setListState((prev) => ({ ...prev, loadingMore: false }));
    }
  };

  const renderAvatar = (name: string) => {
    const getInitials = (fullName: string) => fullName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div className={styles.avatar}>
        {getInitials(name)}
      </div>
    );
  };

  const renderUserContent = (name: string, rating: number, createdBefore: string) => (
    <div className={styles.userContent}>
      <div className={styles.ratingRow}>
        <Typography variant="h2" component="h2">{name}</Typography>
        <ProductStarRating value={rating} size={16} />
        <span>{rating.toFixed(1)}</span>
      </div>
      <span className={styles.reviewDate}>{createdBefore}</span>
    </div>
  );
  const renderReviewCard = (
    name: string,
    rating: number,
    summary: string,
    text: string,
    createdBefore: string,
    index: number,
  ) => (
    <div key={index} className={styles.card}>
      {renderAvatar(name)}
      <div className={styles.cardHeader}>
        {renderUserContent(name, rating, createdBefore)}
        <Typography variant="h3" component="h3">{summary}</Typography>
        {text && <p className={styles.comment}>{text}</p>}
      </div>
    </div>
  );

  const renderLoadMoreButton = () => {
    const { currentPage, totalPages, items } = listState;
    if (currentPage >= totalPages || !items.length) return null;

    return (
      <div className={styles.loadMoreSection}>
        <Button variant="outlined" onClick={onLoadMore} className={styles.loadMoreButton}>
          Load more reviews
          {' '}
          <ChevronDownIcon width={14} />
        </Button>
      </div>
    );
  };

  const renderReviewList = () => (
    <div className={`${styles.reviewList} ${listState.currentPage > 1 ? styles.reviewListScrollable : ''}`.trim()}>
      {listState.items.map((review, index) => {
        const starRating = Math.round(review.averageRating);
        return renderReviewCard(
          review.nickname,
          starRating,
          review.summary,
          review.text,
          review.createdBefore,
          index,
        );
      })}
    </div>
  );

  const renderContent = () => {
    if (isFirstLoading && !listState.items.length) {
      return <Loading message="loading product reviews" />;
    }
    if (!listState.items.length) {
      return null;
    }
    return renderReviewList();
  };

  return (
    <div className={styles.reviewListContainer}>
      {renderContent()}
      {renderLoadMoreButton()}
    </div>
  );
}
