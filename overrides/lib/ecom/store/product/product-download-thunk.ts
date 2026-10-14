import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/ecom/store';
import { fetchProductDownloadLink } from '@/ecom/services/product/product-list/product-download.service';
import { addAlertMessage } from '@/ecom/store/layout/layout-slice';
import { ProductDownloadLinkItem } from '@/ecom/types/product';

type FetchProductDownloadThunkArgs = {
  sku: string;
};

export type ProductDownloadDetails = ProductDownloadLinkItem & { downloadUrl: string };

const loginRequiredMessage = 'Please log in to download this course.';
const downloadUnavailableMessage = 'Your download is not available yet.';
const downloadErrorMessage = 'Unable to prepare your download. Please try again.';

export const fetchProductDownloadThunk = createAsyncThunk<
  ProductDownloadDetails,
  FetchProductDownloadThunkArgs,
  { state: RootState; dispatch: AppDispatch }
>(
  'product/fetch-download-link',
  async ({ sku }, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const normalizedSku = sku.trim();

    try {
      if (!getState().auth.isUserLoggedIn) {
        throw new Error(loginRequiredMessage);
      }

      if (!normalizedSku) {
        throw new Error(downloadErrorMessage);
      }

      const productDownloadLink = await fetchProductDownloadLink(normalizedSku);

      if (!productDownloadLink?.downloadUrl) {
        throw new Error(downloadUnavailableMessage);
      }

      return {
        sku: productDownloadLink.sku,
        downloadUrl: productDownloadLink.downloadUrl,
      };
    } catch (error: any) {
      dispatch(addAlertMessage({ type: 'error', message: error.message || 'Error in downloading product' }));
      throw error;
    }
  },
);
