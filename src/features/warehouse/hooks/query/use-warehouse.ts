import { useQuery } from '@tanstack/react-query';

import { fetchWarehouse } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';

export const useWarehouse = ({ id, enabled }: { id: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: warehousesKeys.detail(id),
    queryFn: () => fetchWarehouse(id),
    enabled,
  });
};
