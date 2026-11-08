import React, { Suspense } from 'react';
import { createStore } from '@/ecom/store';
import { fetchCategoriesThunk } from '@/ecom/store/categories-thunk';
import { Footer } from '@/ecom/components/layout/Footer/Footer';
import { ErrorMessage } from '@/ui/components';
import AppLayoutClientSide from '@/ecom/pages/layout/AppLayoutClientSide';
import styles from '@/ecom/pages/layout/layout.module.scss';
import { fetchNavMenusThunk } from '@/ecom/store/layout/nav-menu-thunk';
import { Navbar, Toaster } from '@/ecom/components/layout';
import { AppStore } from '@/ecom/pages/layout/AppStore';
import FullScreenLoader from '@/ecom/components/layout/GlobalLoader/FullScreenLoader';

// The page chrome of the pages built once at `next build` (the `(static)` route group). It is `SSRLayoutContainer` without
// anything that comes from the request: it does not read `headers()`, so the path, the breadcrumb and the SEO details are set
// in the browser (`AppLayoutClientSide`) and the page puts its own SEO tags in the HTML (`StaticPageSeo`). The signed-in
// customer is not known at build time either: `AppLayoutClientSide` asks the backend in the browser (`checkSession`).
export default async function StaticLayoutContainer({ children }: { children: React.ReactNode; }) {
  const initStore = createStore();

  const results = [
    await initStore.dispatch(fetchCategoriesThunk('')),
    await initStore.dispatch(fetchNavMenusThunk()),
  ];
  // A page built with an error in it is served until the next build, so a call that fails during `next build` fails the build.
  if (process.env.NEXT_PHASE === 'phase-production-build' && results.some(({ meta }) => meta.requestStatus === 'rejected')) {
    throw new Error('The static layout could not load the categories or the nav menus: is NEXT_ECOM_BACKEND_URL reachable?');
  }

  const preloadedState = initStore.getState();
  const categoryError = preloadedState.layout.categories.error;

  if (categoryError) {
    return <ErrorMessage message="Something went wrong, please try again" minHeight="100vh" />;
  }

  return (
    <AppStore preloadedState={preloadedState}>
      <Navbar />
      <Toaster />
      <FullScreenLoader />
      <Suspense fallback="Loading...">
        <div className={styles.pageContainer}>
          <AppLayoutClientSide containerClass={styles.appContainer} renderSeoTags={false} checkSession />
          <div className={styles.appContainer} data-testid="app-container">
            {children}
          </div>
        </div>
      </Suspense>
      <Footer />
    </AppStore>
  );
}
