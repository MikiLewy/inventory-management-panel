import api from '@/api/clients/api';

import { Category } from '../types/category';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');

  return data;
};
