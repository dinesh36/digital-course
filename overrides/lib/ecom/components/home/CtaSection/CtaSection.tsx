import Link from 'next/link';
import styles from './CtaSection.module.scss';
import { Button } from '@/ui/components';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.topBar} />

          <h2>Ready to start your learning journey?</h2>
          <p>
            Join thousands of students and start achieving your goals today with our
            premium courses.
          </p>

          <div className={styles.actions}>
            <Link href="/courses" className={styles.linkReset}>
              <Button className={styles.primaryButton}>Get Started for Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
