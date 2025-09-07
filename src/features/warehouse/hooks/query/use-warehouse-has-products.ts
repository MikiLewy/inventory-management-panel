import { useQuery } from '@tanstack/react-query';

import { fetchWarehouseHasProducts } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';

export const useWarehouseHasProducts = ({ id, enabled }: { id: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: warehousesKeys.hasProducts(id),
    queryFn: () => fetchWarehouseHasProducts(id),
    enabled,
  });
};
