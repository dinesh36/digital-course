'use client';

import React, { Suspense } from 'react';
import { Loading, Typography } from '@/ui/components';
import styles from '@/ecom/pages/blogs/BlogList/BlogList.module.scss';
import { BRAND_NAME } from '@/ecom/constants';
import BlogListItems from '@/ecom/pages/blogs/BlogList/BlogListItems';

function BlogList() {
  const renderBlogHeader = () => (
    <div className={styles.blogHeader}>
      <Typography variant="h1" component="h1" className={styles.heading}>
        {BRAND_NAME}
        {' '}
        <span className={styles.gradientText}>Insights</span>
      </Typography>
      <p className={styles.description}>
        Exploring the intersection of cognitive science, technology, and the future of learning.
      </p>
    </div>
  );

  return (
    <div className={styles.blogListSection}>
      {renderBlogHeader()}
      <Suspense fallback={<Loading message="Loading Blogs..." />}>
        <BlogListItems />
      </Suspense>
    </div>
  );
}

export default BlogList;
