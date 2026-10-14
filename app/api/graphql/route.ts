import { handleGraphqlRequest } from '@/ecom/api-handler/graphql';

export async function POST(request: Request) {
  return handleGraphqlRequest(request);
}
