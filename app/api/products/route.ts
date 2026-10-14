import { handleProductsRequest } from '@/ecom/api-handler/products';

export async function GET(request: Request) {
  return handleProductsRequest(request);
}
