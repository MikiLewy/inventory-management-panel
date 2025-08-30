import { useQuery } from '@tanstack/react-query';

import { fetchProductSuggestions } from '@/shared/api/lib/product-suggestions';
import { productSuggestionsQueryKeys } from '@/shared/api/query-keys/product-suggestions';

export const useProductSuggestions = ({ search, enabled }: { search: string; enabled: boolean }) => {
  return useQuery({
    queryKey: productSuggestionsQueryKeys.list(search),
    queryFn: () => fetchProductSuggestions(search),
    enabled,
  });
};
