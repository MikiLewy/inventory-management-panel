import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/shared/api/lib/categories';
import { categoriesKeys } from '@/shared/api/query-keys/categories-keys';

export const useCategories = () => {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: () => fetchCategories(),
  });
};
