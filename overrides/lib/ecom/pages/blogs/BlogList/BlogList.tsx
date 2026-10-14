'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/ecom/components/blogs/BlogCard/BlogCard';
import { EmptyMessage, Loading, Typography } from '@/ui/components';
import { getMagePlazaBlogPosts } from '@/ecom/services/blog/blog.service';
import type { BlogPost } from '@/ecom/services/blog/blog.response.type';
import styles from '@/ecom/pages/blogs/BlogList/BlogList.module.scss';
import { POSTS_PER_PAGE } from '@/ecom/constants';
import { Pagination } from '@/ecom/components/layout';

function BlogList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get('page');
  const currentPage = pageParam ? parseInt(pageParam, POSTS_PER_PAGE) : 1;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const { blogPosts: fetchedPosts, totalPages: fetchedTotalPages } = await getMagePlazaBlogPosts({ currentPage });
        if (!mounted) return;
        setPosts(fetchedPosts);
        setTotalPages(fetchedTotalPages);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [currentPage]);

  const renderBlogList = () => (
    <>
      <div className={styles.blogGrid}>
        {posts.map((post) => (
          <BlogCard key={post.postId} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination currentPage={currentPage} totalPages={totalPages} syncWithQuery />
        </div>
      )}
    </>
  );

  if (posts.length === 0 && !isLoading) {
    return <EmptyMessage message="No blogs found!" />;
  }

  const renderBlogHeader = () => (
    <div className={styles.blogHeader}>
      <Typography variant="h1" component="h1" className={styles.heading}>
        EduVerse
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
      {isLoading ? <Loading message="Loading Blogs..." /> : renderBlogList()}
    </div>
  );
}

export default BlogList;
