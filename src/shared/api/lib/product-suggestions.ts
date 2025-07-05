import api from '@/api/clients/api';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import { ProductSuggestion } from '../types/product-suggestion';

export const fetchProductSuggestions = async (search: string): Promise<PaginatedResponse<ProductSuggestion>> => {
  const { data } = await api.get('/product-suggestions', {
    params: {
      search,
    },
  });

  return data;
};
