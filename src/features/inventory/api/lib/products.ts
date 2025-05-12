import api from '@/api/clients/api';

import { CreateProductPayload } from '../../types/payload/create-product';

export const fetchProducts = async (page: number, perPage: number) => {
  const { data } = await api.get('/products', {
    params: {
      page,
      perPage,
    },
  });

  return data;
};

export const createProduct = async (product: CreateProductPayload) => {
  const { data } = await api.post('/products', product);

  return data;
};
