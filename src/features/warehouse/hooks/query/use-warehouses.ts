import { useQuery } from '@tanstack/react-query';

import { fetchWarehouses } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';

export const useWarehouses = (enabled: boolean = true) => {
  return useQuery({
    queryKey: warehousesKeys.list(),
    queryFn: () => fetchWarehouses(),
    enabled,
  });
};
