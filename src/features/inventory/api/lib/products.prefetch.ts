import { QueryClient } from '@tanstack/react-query';

import { productsKeys } from '../query-keys/products-keys';

import { fetchProduct, fetchProducts } from './products';

export const prefetchProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.lists(),
    queryFn: () => fetchProducts(0, 10),
  });
};

export const prefetchProduct = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => fetchProduct(id),
  });
};
