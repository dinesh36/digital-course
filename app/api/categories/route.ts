import { handleCategoriesRequest } from '@/ecom/api-handler/categories';

export async function GET(request: Request) {
  return handleCategoriesRequest(request);
}
