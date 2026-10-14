import { usePathname, useRouter } from 'next/navigation';
import { setUser } from '@/ecom/store/auth/auth-slice';
import { closeAuthModal, setAuthSuccessRedirectUrl } from '@/ecom/store/layout/layout-slice';
import { useAppDispatch, useAppSelector } from '@/ecom/store/hooks';
import { User } from '@/ecom/types/auth';
import { fetchMinimalWishlistThunk } from '@/ecom/store/wishlist/wishlist-thunk';
import { fetchCartThunk } from '@/ecom/store/cart/cart-thunk';

export const useAfterLogin = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authSuccessRedirectUrl = useAppSelector((state) => state.layout.authSuccessRedirectUrl);

  const afterLogin = ({ user }: {user: User}) => {
    dispatch(setUser(user));
    dispatch(closeAuthModal());
    if (!pathname?.startsWith('/checkout')) {
      router.push(authSuccessRedirectUrl === '/checkout' ? '/checkout' : '/account/dashboard');
    }
    dispatch(setAuthSuccessRedirectUrl(''));
    dispatch(fetchMinimalWishlistThunk());
    dispatch(fetchCartThunk());
  };

  return {
    afterLogin,
  };
};
