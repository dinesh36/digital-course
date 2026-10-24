'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import styles from '@/ecom/components/SearchResultsPanel/SearchResultsPanel.module.scss';
import {
  Button, Loading, Typography, ErrorMessage,
} from '@/ui/components';
import { fetchProducts } from '@/ecom/services/product';
import { Product } from '@/ecom/types/product';
import { HorizontalScrollContainer } from '@/ui/layout';
import { useDebounce } from '@/ecom/utils/hook/useDebounce';
import ProductTile from '@/ecom/components/product/ProductTile/ProductTile';
import { useAppSelector } from '@/ecom/store/hooks';

type Props = {
  searchText: string;
  onClose?: () => void;
};

type SearchState = 'loading' | 'success' | 'error' | 'no-data';

export function SearchResultsPanel({ searchText, onClose }: Props) {
  const router = useRouter();
  const [results, setResults] = useState<Product[]>([]);
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [state, setState] = useState<SearchState>('loading');
  const debouncedSearch = useDebounce(searchText, 300);
  const isUserLoggedIn = useAppSelector((appState) => appState.auth.isUserLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      setState('loading');
      try {
        const res = await fetchProducts({
          search: debouncedSearch,
          pageSize: 8,
          currentPage: 1,
        });
        const items = res.items as Product[];
        setResults(items);
        setTotalProductCount(res.total_count ?? 0);
        setState(items.length ? 'success' : 'no-data');
      } catch {
        setState('error');
      }
    };
    fetchData();
  }, [debouncedSearch, isUserLoggedIn]);

  const handleViewAllClick = () => {
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
    onClose?.();
  };

  const visibleProducts = results.length <= 3 ? results.slice(0, 3) : results;

  const renderHeader = () => (
    <Typography variant="h2" component="h2" className={styles.heading}>
      Product Results
    </Typography>
  );
  const renderProductList = () => (
    <HorizontalScrollContainer className={styles.productList}>
      {visibleProducts.map((product) => (
        <div key={product.productId} className={styles.productCard}>
          <ProductTile product={product} isSearchTile onClick={onClose} />
        </div>
      ))}
    </HorizontalScrollContainer>
  );

  const renderViewAllButton = () => (
    <Button variant="outlined" color="black" className={styles.viewAllButton} onClick={handleViewAllClick}>
      {`View All Results (${totalProductCount})`}
    </Button>
  );

  return createPortal(
    <div className={styles.searchResultPanel} data-testId="search-results-panel">
      {(state === 'success' || state === 'loading') && renderHeader()}
      {state === 'loading' && <Loading message="Searching Products..." />}
      {state === 'success' && (
        <>
          {renderProductList()}
          {renderViewAllButton()}
        </>
      )}
      {state === 'no-data' && (
      <ErrorMessage message="No products found for your search. Please try a different keyword." minHeight="80px" />
      )}
      {state === 'error' && (
        <ErrorMessage message="Error in searching products" minHeight="150px" />
      )}
    </div>,
    document.body,
  );
}
