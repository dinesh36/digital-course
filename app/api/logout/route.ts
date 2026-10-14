import { handleLogout } from '@/ecom/api-handler/logout';

export async function GET() {
  return handleLogout();
}
