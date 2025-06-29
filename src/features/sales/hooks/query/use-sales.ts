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
}: {
  offset: number;
  limit: number;
  query: string;
  sortBy: string;
  sortDirection: SortDirection;
}) => {
  return useQuery({
    queryKey: salesKeys.list({ offset, limit, query, sortBy, sortDirection }),
    queryFn: () => fetchSales(offset, limit, query, sortBy, sortDirection),
  });
};
