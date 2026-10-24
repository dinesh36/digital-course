import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '@/ecom/services/product';
import { setApiState, setProductData } from '@/ecom/store/product/product-details-slice';
import { getProductWithAttributes } from '@/ecom/utils';
import { ApiState } from '@/ecom/types/common';

export const fetchProductByUrlKey = createAsyncThunk(
  'product-details/fetch-product',
  async (
    {
      urlKey,
      urlAttributes,
    }: { urlKey: string; urlAttributes?: any[] | undefined },
    thunkAPI,
  ) => {
    const { dispatch } = thunkAPI;
    dispatch(setApiState(ApiState.Loading));
    try {
      const resp = await fetchProducts({ urlKey });
      const [productData] = resp?.items || [];

      dispatch(setApiState(ApiState.Success));

      if (!productData) {
        dispatch(setProductData(null));
        throw new Error('Product not found');
      }

      const product = getProductWithAttributes(
        productData,
        urlAttributes,
      );
      dispatch(setProductData(product));
      return product;
    } catch {
      // TODO need to log the proper errors here later
      dispatch(setProductData(null));
      dispatch(setApiState(ApiState.Error));
      return null;
    }
  },
);
