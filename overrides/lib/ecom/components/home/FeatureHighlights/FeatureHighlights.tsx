import {
  Sparkles, Shield, RotateCcw, Truck,
} from 'lucide-react';
import styles from './FeatureHighlights.module.scss';

const features = [
  { icon: Sparkles, title: 'Anti-Tarnish', description: 'Long-lasting shine guaranteed' },
  { icon: Shield, title: 'Skin Friendly', description: 'Hypoallergenic & tested' },
  { icon: RotateCcw, title: 'Easy Returns', description: '30-day hassle-free returns' },
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
];

export default function FeatureHighlights() {
  return (
    <section className={styles.featureHighlightsWrapper}>
      <div className={styles.container}>
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className={styles.item}>
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
