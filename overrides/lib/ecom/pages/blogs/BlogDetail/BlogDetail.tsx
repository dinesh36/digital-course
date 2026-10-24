'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import {
  UserIcon, CalendarIcon, ClockIcon,
} from 'lucide-react';
import { Button, Loading, Typography } from '@/ui/components';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { fetchBlogByUrlKey } from '@/ecom/store/blog-details/blog-details-thunk';
import { ApiState } from '@/ecom/types/common';
import styles from './BlogDetail.module.scss';
import { BlogContent } from '@/ecom/components/blogs/BlogContent/BlogContent';
import { ArrowLeftIcon } from '@/ui/icons';
import BlogCard from '@/ecom/components/blogs/BlogCard/BlogCard';
import { HorizontalScrollContainer } from '@/ui/layout';
import type { BlogPost } from '@/ecom/services/blog/blog.response.type';
import { getBlogSuggestions } from '@/ecom/services/blog/blog.service';

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const rawKey = params?.['blog-urlKey'] ?? '';
  const blogUrlKey = rawKey ? decodeURIComponent(String(rawKey)) : '';
  const dispatch = useAppDispatch();
  const blogData = useAppSelector((state) => state.blogDetails.data);
  const blogDetailApiState = useAppSelector((state) => state.blogDetails.apiState);
  const tags = useMemo(() => blogData?.tags || [], [blogData]);
  const blogDate = useMemo(() => (blogData?.createdAt
    ? new Date(blogData?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''), [blogData]);
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);

  const readTimeMinutes = useMemo(() => {
    if (!blogData?.content) return 0;
    const wordsPerMinute = 200;
    const text = blogData.content.replace(/<[^>]+>/g, '');
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [blogData]);

  const metaItems = useMemo(() => [
    { icon: UserIcon, text: blogData?.authorName },
    { icon: CalendarIcon, text: blogDate },
    { icon: ClockIcon, text: `${readTimeMinutes} min read` },
  ], [blogData?.authorName, blogDate, readTimeMinutes]);

  useEffect(() => {
    if (!blogUrlKey) return;
    if (blogUrlKey && blogUrlKey !== blogData?.urlKey) {
      dispatch(fetchBlogByUrlKey(blogUrlKey));
    }
  }, [blogUrlKey, dispatch]);

  useEffect(() => {
    (async () => {
      if (!blogData) return;
      const blogPosts = await getBlogSuggestions(blogData);
      setSuggestions(blogPosts);
    })();
  }, [blogData]);

  const renderYouMightAlsoLike = () => {
    if (suggestions?.length === 0) return null;

    return (
      <div className={styles.suggestionsSection}>
        <div className={styles.sectionHeader}>
          <Typography variant="h2" component="h2">You Might also Like</Typography>
          <Button type="button" variant="outlined" onClick={() => router.push('/blogs')}>
            View All
          </Button>
        </div>

        <div className={styles.scrollContainer}>
          <HorizontalScrollContainer>
            {suggestions.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </HorizontalScrollContainer>
        </div>
      </div>
    );
  };

  const renderBlogMeta = () => (
    <div className={styles.blogMeta}>
      {metaItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div key={item.text} className={styles.metaItem}>
            <IconComponent />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );

  const renderHeaderInfo = () => (
    <Typography variant="h1" component="h1" className="flex-1 mb-4">{blogData?.name}</Typography>
  );

  const renderBlogHeader = () => (
    <div>
      {blogDetailApiState === ApiState.Loading ? (
        <div className={styles.skeleton} />
      ) : (
        <>
          <Button variant="clear" className={styles.backLink} onClick={() => router.push('/blogs')}>
            <ArrowLeftIcon width={12} />
            {' Back to Insights'}
          </Button>
          {tags.length > 1 && (<span className={styles.tag}>{tags[1]}</span>)}
          {renderHeaderInfo()}
          {renderBlogMeta()}
          {blogData?.image && (
            <img
              src={blogData.image}
              alt={blogData?.name || 'Blog Detail'}
              className={styles.featuredImage}
            />
          )}
        </>
      )}
    </div>
  );

  if (blogDetailApiState === ApiState.Error) {
    return notFound();
  }

  return (
    <div className={styles.blogDetailPage}>
      {renderBlogHeader()}
      {blogDetailApiState === ApiState.Loading ? (
        <Loading message="Loading Blog Details..." />
      ) : (<BlogContent blogData={blogData} />)}
      {blogDetailApiState !== ApiState.Loading && renderYouMightAlsoLike()}
    </div>
  );
}
