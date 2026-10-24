'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { Typography } from '@/ui/components';
import type { BlogPost } from '@/ecom/types/blog';
import styles from './BlogCard.module.scss';
import { errorSrc } from '@/ecom/constants';
import { UserIcon } from '@/ui/icons';

type Props = {
    post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  const router = useRouter();
  const detailPath = post.urlKey
    ? `/blogs/${encodeURIComponent(post.urlKey)}`
    : '/blogs';

  const renderImage = () => (
    <div
      className={styles.imageWrapper}
      role="presentation"
      onClick={() => router.push(detailPath)}
      data-testid="blog-image"
    >
      <img
        src={post.image ?? errorSrc}
        alt={post.name ?? ''}
        className={styles.blogImage}
      />
    </div>
  );

  const renderMeta = () => (
    <div className={styles.meta}>
      <CalendarIcon width={12} />
      {post.createdAt
        ? new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        : ''}
    </div>
  );

  const renderFooter = () => (
    <div className={styles.footer}>
      <span className={styles.author}>
        <div className={styles.avatar}><UserIcon width={16} /></div>
        {post.authorName}
      </span>
      <span className={styles.arrow}><ArrowRight /></span>
    </div>
  );

  const renderCategory = () => {
    const category = post.tags?.[1] || post.tags?.[0];
    if (!category) return null;
    return (
      <div className={styles.category}>
        {category}
      </div>
    );
  };
  const renderTitle = () => (
    <Typography variant="h3" component="h3" className={styles.title}>
      {post.name}
    </Typography>
  );

  const renderDescription = () => (
    <p className={styles.excerpt}>
      {post.shortDescription}
    </p>
  );

  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={styles.blogCard}
      data-testid="blog-card"
      onClick={() => router.push(detailPath)}
    >
      <div className={styles.content}>
        {renderImage()}
        {renderCategory()}
        <div className={styles.info}>
          {renderMeta()}
          {renderTitle()}
          {renderDescription()}
          {renderFooter()}
        </div>
      </div>
    </div>
  );
}
