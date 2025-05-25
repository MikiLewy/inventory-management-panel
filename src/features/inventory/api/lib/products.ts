import api from '@/api/clients/api';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import { CreateProductPayload } from '../../types/payload/create-product';
import { Product } from '../types/products';

export const fetchProducts = async (
  page: number,
  perPage: number,
  query: string,
): Promise<PaginatedResponse<Product>> => {
  const { data } = await api.get('/products', {
    params: {
      page,
      perPage,
      search: query,
    },
  });

  return data;
};

export const createProduct = async (product: CreateProductPayload) => {
  const { data } = await api.post('/products', product);

  return data;
};

export const removeProduct = async (id: number) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};
