import { ShoppingCartIcon } from 'lucide-react';
import {
  HeartIcon,
  ShieldIcon,
  SignOutIcon,
  UserIcon,
} from '@/ui/icons';
import ExploreIcon from '@/ui/icons/ExploreIcon';
import GridIcon from '@/ui/icons/GridIcon';
import SettingsIcon from '@/ui/icons/SettingsIcon';

export const sidebarSections = [
  {
    key: 'menu',
    items: [
      {
        key: 'my-courses', label: 'My Courses', route: '/account/dashboard', icon: <GridIcon width={18} height={18} />,
      },
      {
        key: 'explore-courses', label: 'Explore Courses', route: '/courses', icon: <ExploreIcon width={18} height={18} />,
      },
      {
        key: 'wishlist', label: 'Wishlist', route: '/wishlist', icon: <HeartIcon width={18} height={18} />,
      },
    ],
  },
  {
    key: 'settings',
    title: 'Settings',
    items: [
      {
        key: 'profile-settings',
        label: 'Profile Settings',
        route: '/account/profile-settings',
        icon: <SettingsIcon width={18} height={18} />,
      },
      {
        key: 'logout', label: 'Log out', action: 'logout', icon: <SignOutIcon width={18} height={18} />,
      },
    ],
  },
];

export const profileMenuItems = [
  {
    key: 'settings',
    items: [
      {
        key: 'account', label: 'Account', icon: <UserIcon />, component: 'ProfileDetails',
      },
      {
        key: 'purchases', label: 'Purchases', icon: <ShoppingCartIcon />, component: 'ProfilePurchases',
      },
      {
        key: 'security', label: 'Change Password', icon: <ShieldIcon />, component: 'ChangePassword',
      },
    ],
  },
];
