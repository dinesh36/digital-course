import { handleRetryAuth } from '@/ecom/api-handler/retry-auth';
import { ProxyRequest } from '@/ecom/api-handler/utils';

export async function POST(request: ProxyRequest) {
  return handleRetryAuth(request);
}
