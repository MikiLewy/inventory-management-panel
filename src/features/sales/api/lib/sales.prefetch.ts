import { QueryClient } from '@tanstack/react-query';

import { salesKeys } from '../query-keys/sales-keys';

import { fetchSale, fetchSales } from './sales';

export const prefetchSales = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: salesKeys.lists(),
    queryFn: () => fetchSales(0, 10),
  });
};

export const prefetchSale = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => fetchSale(id),
  });
};
