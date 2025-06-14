import { SortDirection } from '@tanstack/react-table';

import api from '@/api/clients/api';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import { CreateProductPayload } from '../../types/payload/create-product';
import { MarkProductsAsSoldPayload } from '../../types/payload/mark-products-as-sold';
import { UpdateProductPayload } from '../../types/payload/update-product';
import { Product } from '../types/products';

export const fetchProducts = async (
  offset: number,
  limit: number,
  query?: string,
  sortBy?: string,
  sortDirection?: SortDirection,
): Promise<PaginatedResponse<Product>> => {
  const { data } = await api.get('/products', {
    params: {
      offset,
      limit,
      search: query,
      sortBy,
      sortOrder: sortDirection,
    },
  });

  return data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export const createProduct = async (product: CreateProductPayload) => {
  await api.post('/products', product);
};

export const updateProduct = async (id: number, product: UpdateProductPayload) => {
  await api.patch(`/products/${id}`, product);
};

export const removeProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};

export const markAsSold = async (products: MarkProductsAsSoldPayload[]) => {
  await api.post(`/products/mark-as-sold`, {
    products,
  });
};
