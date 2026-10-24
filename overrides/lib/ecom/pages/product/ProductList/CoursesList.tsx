'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import ProductListSidebar from '@/ecom/components/product/ProductList/ProductListSidebar/ProductListSidebar';
import { DropDownIcon, FilterIcon } from '@/ui/icons';
import { FILTER_GROUP_CATEGORIES_QUERY_PARAM, productListDropDownOptions } from '@/ecom/constants';
import { setProductSortBy } from '@/ecom/store/product/product-list-slice';
import { parseFilteredCategories } from '@/ecom/utils';
import { RootState } from '@/ecom/store';
import styles from './CoursesList.module.scss';
import ProductGrid from '@/ecom/components/product/ProductGrid/ProductGrid';
import { SortBy } from '@/ecom/types/product';
import { Typography } from '@/ui/components';

export default function CoursesList() {
  const dispatch = useDispatch();
  const [isSliderOpen, setSliderOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const { sortBy } = useSelector((state: RootState) => state.productList);
  const allCategories = useSelector((state: RootState) => state.layout.categories.allCategories);

  // The title, description and banner are those of the category when the list is filtered by that one category
  const activeProductCategory = React.useMemo(() => {
    const filtered = parseFilteredCategories(searchParams?.get(FILTER_GROUP_CATEGORIES_QUERY_PARAM));
    return filtered.length === 1 ? allCategories.find(({ urlKey }) => urlKey === filtered[0]) : undefined;
  }, [searchParams, allCategories]);

  React.useEffect(() => {
    document.body.style.overflow = isSliderOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSliderOpen]);

  const handleSortChange = (value: string) => {
    dispatch(setProductSortBy(value as SortBy));
  };

  const renderFilterButton = () => (
    <button
      type="button"
      onClick={() => setSliderOpen(true)}
      className={styles.filterButton}
    >
      <span className={styles.filterIconWrapper}>
        <FilterIcon />
      </span>
      Filter
    </button>
  );

  const renderDropDown = () => (
    <div className={styles.sortDropdown}>
      <select value={sortBy ?? ''} onChange={(e) => handleSortChange(e.target.value)}>
        {productListDropDownOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span className={styles.chevron}><DropDownIcon className={styles.icon} /></span>
    </div>
  );

  const renderToolBarLeft = () => (
    <div className={styles.toolbarLeft}>{renderFilterButton()}</div>
  );

  const renderToolBarRight = () => (
    <div className={styles.toolbarRight}>
      <span className={styles.label}>Sort by:</span>
      {renderDropDown()}
    </div>
  );

  const renderToolbarAndSearch = () => (
    <div className={styles.toolbar}>
      {renderToolBarLeft()}
      {renderToolBarRight()}
    </div>
  );

  const renderProductListLayout = () => (
    <div className={styles.productListLayout}>
      <ProductListSidebar isSliderOpen={isSliderOpen} setSliderOpen={setSliderOpen} />
      <div>
        {activeProductCategory?.image && (
          <img
            src={activeProductCategory.image}
            alt={activeProductCategory.name}
            className={styles.bannerImage}
          />
        )}
        {renderToolbarAndSearch()}
        <ProductGrid />
      </div>
    </div>
  );

  const renderCourseListTitle = () => {
    const categoryTitle = activeProductCategory?.name || 'Browse';
    const categoryDescription = activeProductCategory?.description;

    return (
      <div className={styles.titleWrapper}>
        <Typography variant="h1" component="h1" className={styles.title}>
          {`${categoryTitle} Courses`}
        </Typography>
        {categoryDescription ? (
          <div className={styles.description}>{parse(categoryDescription)}</div>
        ) : (
          <p>Discover top-tier courses across programming, design, business, and more. Taught by industry leaders.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderCourseListTitle()}
      {renderProductListLayout()}
    </div>
  );
}
