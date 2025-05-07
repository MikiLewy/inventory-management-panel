import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/features/inventory/api/lib/products';
import { productsKeys } from '@/features/inventory/api/query-keys/products-keys';

export const useProducts = ({ page, perPage }: { page: number; perPage: number }) => {
  return useQuery({
    queryKey: productsKeys.list({ page, perPage }),
    queryFn: () => fetchProducts(page, perPage),
  });
};
