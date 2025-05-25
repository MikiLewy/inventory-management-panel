import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/features/inventory/api/lib/products';
import { productsKeys } from '@/features/inventory/api/query-keys/products-keys';

export const useProducts = ({ page, perPage, query }: { page: number; perPage: number; query: string }) => {
  return useQuery({
    queryKey: productsKeys.list({ page, perPage, query }),
    queryFn: () => fetchProducts(page, perPage, query),
  });
};
