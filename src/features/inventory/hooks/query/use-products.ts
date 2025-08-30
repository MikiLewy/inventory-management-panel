import { useQuery } from '@tanstack/react-query';
import { SortDirection } from '@tanstack/react-table';

import { fetchProducts } from '@/features/inventory/api/lib/products';
import { productsKeys } from '@/features/inventory/api/query-keys/products-keys';

export const useProducts = ({
  offset,
  limit,
  query,
  sortBy,
  sortDirection,
  enabled,
  filters,
}: {
  offset: number;
  limit: number;
  query?: string;
  sortBy?: string;
  filters?: {
    dateRange?: {
      from: Date;
      to: Date;
    };
  };
  sortDirection?: SortDirection;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: productsKeys.list({ offset, limit, query, sortBy, sortDirection, filters }),
    queryFn: () => fetchProducts(offset, limit, query, sortBy, sortDirection, filters),
    enabled,
  });
};
