import { QueryClient } from '@tanstack/react-query';

import { categoriesKeys } from '../query-keys/categories-keys';

import { fetchCategories } from './categories';

export const prefetchCategories = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: categoriesKeys.lists(),
    queryFn: () => fetchCategories(),
  });
};
