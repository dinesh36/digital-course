import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { setUser } from '@/ecom/store/auth/auth-slice';
import { createStore } from '@/ecom/store';
import { fetchCategoriesThunk } from '@/ecom/store/categories-thunk';
import { Footer } from '@/ecom/components/layout/Footer/Footer';
import { ErrorMessage } from '@/ui/components';
import AppLayoutClientSide from '@/ecom/pages/layout/AppLayoutClientSide';
import styles from '@/ecom/pages/layout/layout.module.scss';
import { getCurrentPath } from '@/ecom/ssr-utils';
import { setBreadCrumbWithPath, fetchSeoMetadataThunk } from '@/ecom/store/layout/layout-thunk';
import { fetchDynamicPageData } from '@/ecom/store/layout/layout-thunk-ssr';
import { fetchMenusThunk } from '@/ecom/store/layout/menu-thunk';
import { Navbar, Toaster } from '@/ecom/components/layout';
import { isFullScreenLayout } from '@/ecom/pages/layout/layoutUtils';
import { AppStore } from '@/ecom/pages/layout/AppStore';
import FullScreenLoader from '@/ecom/components/layout/GlobalLoader/FullScreenLoader';

export default async function LayoutContainer({ children }: { children: React.ReactNode; }) {
  // Init category and user data on the server side
  const initStore = createStore();
  const currentPath = await getCurrentPath();

  // load categories (server-side) and then snapshot the preloaded state
  await initStore.dispatch(fetchCategoriesThunk(currentPath));
  await initStore.dispatch(fetchMenusThunk());

  const headersList = await headers();
  const user = headersList.get('x-user') ? JSON.parse(headersList.get('x-user') as string) : null;
  if (user) {
    initStore.dispatch(setUser(user));
  }

  await initStore.dispatch(fetchDynamicPageData(currentPath));

  // Set breadcrumb items based on the current path
  initStore.dispatch(setBreadCrumbWithPath(currentPath));

  // Fetch SEO metadata based on the current path
  await initStore.dispatch(fetchSeoMetadataThunk(currentPath));

  // Set the layout for the home page differently
  const containerClass = isFullScreenLayout(currentPath) ? '' : styles.appContainer;

  const isImageEditor = currentPath.startsWith('/image-editor');
  const hideFooter = currentPath === '/print-layout' || currentPath === '/image-editor';

  // Check for category loading error
  const preloadedState = initStore.getState();
  const categoryError = preloadedState.layout.categories.error;

  return (
    <html lang="en">
      <body>
        {categoryError ? (
          <ErrorMessage
            message="Something went wrong, please try again"
            minHeight="100vh"
          />
        ) : (
          <AppStore preloadedState={preloadedState}>
            <Navbar />
            <Toaster />
            <FullScreenLoader />
            <Suspense fallback="Loading...">
              <div className={styles.pageContainer}>
                <AppLayoutClientSide containerClass={styles.appContainer} />
                <div
                  className={`${containerClass} ${isImageEditor ? styles.imageEditorContainer : ''}`}
                  data-testid="app-container"
                >
                  {children}
                </div>
              </div>
            </Suspense>
            {!hideFooter && <Footer />}
          </AppStore>
        )}
      </body>
    </html>
  );
}
