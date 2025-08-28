import api from '@/api/clients/api';

import { ProductSuggestion } from '../types/product-suggestion';

export const fetchProductSuggestions = async (search: string): Promise<ProductSuggestion[]> => {
  const { data } = await api.get(`/product-suggestions`, {
    params: {
      search,
    },
  });

  return data;
};
