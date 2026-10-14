import { handleShiprocket } from '@/ecom/api-handler/shiprocket';

export async function POST(req: Request) {
  return handleShiprocket(req);
}
