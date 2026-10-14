'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';
import styles from './TestimonialsSection.module.scss';

type Testimonial = {
  name: string;
  role: string;
  image: string;
  feedback: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Aarav Mehta',
    role: 'Frontend Developer',
    image: 'https://i.pravatar.cc/120?img=12',
    feedback:
        'The course quality is incredible. I landed freelance projects within weeks of finishing the React learning path.',
  },
  {
    name: 'Nisha Kapoor',
    role: 'UX Designer',
    image: 'https://i.pravatar.cc/120?img=32',
    feedback:
        'Every lesson feels premium and easy to follow. The design courses '
        + 'gave me the confidence to switch careers successfully.',
  },
  {
    name: 'Rohan Sethi',
    role: 'Data Analyst',
    image: 'https://i.pravatar.cc/120?img=47',
    feedback:
        'The platform helped me build real-world analytics skills, and the structured paths made'
        + ' learning feel simple and motivating every day.',
  },
];

export default function TestimonialsSection() {
  const renderStars = () => (
    <div className={styles.ratingRow}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={styles.starIcon} />))}
    </div>
  );

  const renderTestimonialCard = (item: Testimonial) => (
    <div key={item.name} className={styles.testimonialCard}>
      <Quote className={styles.quoteIcon} />

      <div className={styles.authorRow}>
        <img src={item.image} alt={item.name} className={styles.authorAvatar} />
        <div>
          <h4 className={styles.name}>{item.name}</h4>
          <p className={styles.role}>{item.role}</p>
        </div>
      </div>
      <p className={styles.feedback}>
        &quot;
        {item.feedback}
        &quot;
      </p>
      {renderStars()}
    </div>
  );

  const renderHeader = () => (
    <div className={styles.sectionHeader}>
      <h2>Loved by Students</h2>
      <p>Don&apos;t just take our word for it. Here&apos;s what our community says.</p>
    </div>
  );

  const renderGrid = () => (
    <div className={styles.testimonialsGrid}>
      {testimonials.map(renderTestimonialCard)}
    </div>
  );

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {renderHeader()}
        {renderGrid()}
      </div>
    </section>
  );
}
