export interface NavSubItem {
  name: string;
  href: string;
}

export interface NavSubCategory {
  name: string;
  items: NavSubItem[];
}

export interface NavCategory {
  name: string;
  badge?: string;
  hasMegaMenu?: boolean;
  items?: NavSubItem[];
  subcategories?: NavSubCategory[];
  featured?: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
}

export const navigationData: NavCategory[] = [
  {
    name: 'New Arrivals',
    badge: 'New',
    items: [
      { name: 'Just Dropped', href: '/category' },
      { name: 'Best Sellers', href: '/category' },
      { name: 'Trending Now', href: '/category' },
    ],
  },
  {
    name: 'Fine Jewelry',
    hasMegaMenu: true,
    subcategories: [
      {
        name: 'Earrings',
        items: [
          { name: 'Studs', href: '/category' },
          { name: 'Hoops', href: '/category' },
          { name: 'Drops', href: '/category' },
          { name: 'Statement', href: '/category' },
        ],
      },
      {
        name: 'Necklaces',
        items: [
          { name: 'Chokers', href: '/category' },
          { name: 'Chains', href: '/category' },
          { name: 'Pendants', href: '/category' },
          { name: 'Layered', href: '/category' },
        ],
      },
      {
        name: 'Rings',
        items: [
          { name: 'Statement Rings', href: '/category' },
          { name: 'Stackable Rings', href: '/category' },
          { name: 'Band Rings', href: '/category' },
        ],
      },
      {
        name: 'Bracelets',
        items: [
          { name: 'Tennis Bracelets', href: '/category' },
          { name: 'Bangles', href: '/category' },
          { name: 'Charm Bracelets', href: '/category' },
        ],
      },
    ],
    featured: {
      title: 'The Rose Gold Edit',
      subtitle: 'Discover our curated rose gold collection',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      href: '/category',
    },
  },
  {
    name: 'Collections',
    hasMegaMenu: true,
    subcategories: [
      {
        name: 'Occasions',
        items: [
          { name: 'Bridal', href: '/category' },
          { name: 'Office Wear', href: '/category' },
          { name: 'Party & Festival', href: '/category' },
          { name: 'Gift Sets', href: '/category' },
        ],
      },
      {
        name: 'Style',
        items: [
          { name: 'Minimalist', href: '/category' },
          { name: 'Bohemian', href: '/category' },
          { name: 'Traditional', href: '/category' },
          { name: 'Contemporary', href: '/category' },
        ],
      },
    ],
    featured: {
      title: 'Bridal 2026',
      subtitle: 'Make your special day shine',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      href: '/category',
    },
  },
  {
    name: 'Gifts',
    items: [
      { name: 'Under ₹500', href: '/category' },
      { name: 'Under ₹1000', href: '/category' },
      { name: 'Gift Sets', href: '/category' },
      { name: 'Personalized', href: '/category' },
    ],
  },
  {
    name: 'Blog',
    items: [
      { name: 'Style Guides', href: '/blog' },
      { name: 'Jewelry Care', href: '/blog' },
      { name: 'Trending', href: '/blog' },
    ],
  },
  {
    name: 'About',
    items: [
      { name: 'Our Story', href: '/about' },
      { name: 'Our Team', href: '/about' },
      { name: 'Our Values', href: '/about' },
      { name: 'Shop Instagram', href: '/instagram' },
    ],
  },
];
