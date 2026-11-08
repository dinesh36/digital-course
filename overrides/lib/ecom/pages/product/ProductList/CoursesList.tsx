'use client';

import React, { Suspense } from 'react';
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
import type { ProductCategory } from '@/ecom/types/productCategory';
import { Typography } from '@/ui/components';

// `useSearchParams` leaves everything under the nearest `Suspense` to the browser in a built page. So the parts of the list
// that read the URL's query are components of their own, inside a `Suspense`: the heading and the description stay in the
// built HTML, and the courses (the grid) are loaded in the browser, never written into the HTML.

// The category the list is filtered by: the one category in the query (`?filterCategories=`)
function useActiveProductCategory(): ProductCategory | undefined {
  const searchParams = useSearchParams();
  const allCategories = useSelector((state: RootState) => state.layout.categories.allCategories);

  return React.useMemo(() => {
    const filtered = parseFilteredCategories(searchParams?.get(FILTER_GROUP_CATEGORIES_QUERY_PARAM));
    return filtered.length === 1 ? allCategories.find(({ urlKey }) => urlKey === filtered[0]) : undefined;
  }, [searchParams, allCategories]);
}

// The title, description and banner are those of the category when the list is filtered by that one category
function CourseListTitleView({ category }: { category?: ProductCategory }) {
  const categoryTitle = category?.name || 'Browse';
  const categoryDescription = category?.description;

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
}

function CourseListTitle() {
  const category = useActiveProductCategory();

  return <CourseListTitleView category={category} />;
}

type CourseListLayoutProps = { isSliderOpen: boolean; setSliderOpen: (isOpen: boolean) => void };

function CourseListLayout({ isSliderOpen, setSliderOpen }: CourseListLayoutProps) {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.productList);
  const activeProductCategory = useActiveProductCategory();

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

  return (
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
}

export default function CoursesList() {
  const [isSliderOpen, setSliderOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isSliderOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSliderOpen]);

  return (
    <div>
      <Suspense fallback={<CourseListTitleView />}>
        <CourseListTitle />
      </Suspense>
      <Suspense fallback={null}>
        <CourseListLayout isSliderOpen={isSliderOpen} setSliderOpen={setSliderOpen} />
      </Suspense>
    </div>
  );
}
