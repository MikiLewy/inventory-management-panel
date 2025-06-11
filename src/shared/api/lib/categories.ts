import api from '@/api/clients/api';

import { Category } from '../types/category';

export const fetchCategories = async (skipAttachAccessToken: boolean = false): Promise<Category[]> => {
  const { data } = await api.get('/categories', {
    skipAttachAccessToken,
  });

  return data;
};
