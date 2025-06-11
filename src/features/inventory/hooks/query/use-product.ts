import { useQuery } from '@tanstack/react-query';

import { fetchProduct } from '@/features/inventory/api/lib/products';
import { productsKeys } from '@/features/inventory/api/query-keys/products-keys';

export const useProduct = ({ id, enabled }: { id: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled,
  });
};
