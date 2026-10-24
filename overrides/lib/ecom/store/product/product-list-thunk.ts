import { createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_PER_PAGE } from '@/ecom/constants';
import {
  setIsFetchingProducts,
  setProducts,
  setProductsByPage,
  setTotalPages,
  setTotalProductCount,
} from '@/ecom/store/product/product-list-slice';
import { RootState } from '@/ecom/store';
import { fetchProducts } from '@/ecom/services/product';

type FetchProductsThunkPayload = {
  categoryUrlKey?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const fetchProductsThunk = createAsyncThunk(
  'product-list/fetch-products',
  async (payload: FetchProductsThunkPayload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const {
      productList: {
        currentPage,
        searchQuery,
        sortBy,
        filter: { selectedCategories, selectedCategoryGroups },
      },
    }: RootState = thunkAPI.getState() as RootState;

    const categoryUrlKeyGroups = Object.values(selectedCategoryGroups)
      .filter((group) => group.length > 0);

    dispatch(setIsFetchingProducts(true));
    try {
      const { items, total_count: totalCount } = await fetchProducts({
        search: searchQuery,
        pageSize: PRODUCTS_PER_PAGE,
        currentPage,
        categoryUrlKey: payload.categoryUrlKey,
        categoryUrlKeys: selectedCategories,
        sortBy,
        categoryUrlKeyGroups,
      });

      dispatch(setTotalProductCount(totalCount));
      dispatch(setTotalPages(Math.ceil(totalCount / PRODUCTS_PER_PAGE)));
      dispatch(setProductsByPage({ page: currentPage, products: items }));
      dispatch(setProducts(items));
    } finally {
      dispatch(setIsFetchingProducts(false));
    }
  },
);
