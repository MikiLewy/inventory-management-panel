import { useQuery } from '@tanstack/react-query';

import { fetchSale } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';

export const useSale = ({ id, enabled }: { id: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => fetchSale(id),
    enabled,
  });
};
