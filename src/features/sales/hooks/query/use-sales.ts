import { useQuery } from '@tanstack/react-query';
import { SortDirection } from '@tanstack/react-table';

import { fetchSales } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';

export const useSales = ({
  offset,
  limit,
  query,
  sortBy,
  sortDirection,
  filters,
  enabled,
}: {
  offset: number;
  limit: number;
  query?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  filters?: {
    dateRange?: {
      from: Date;
      to: Date;
    };
  };
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: salesKeys.list({ offset, limit, query, sortBy, sortDirection, filters }),
    queryFn: () => fetchSales(offset, limit, query, sortBy, sortDirection, filters),
    enabled,
  });
};
