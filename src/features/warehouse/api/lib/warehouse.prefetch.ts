import { QueryClient } from '@tanstack/react-query';

import { warehousesKeys } from '../query-keys/warehouses-keys';

import { fetchWarehouse, fetchWarehouses } from './warehouses';

export const prefetchWarehouses = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: warehousesKeys.lists(),
    queryFn: () => fetchWarehouses(),
  });
};

export const prefetchWarehouse = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery({
    queryKey: warehousesKeys.detail(id),
    queryFn: () => fetchWarehouse(id),
  });
};
