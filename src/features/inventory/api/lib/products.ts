import { SortDirection } from '@tanstack/react-table';

import api from '@/api/clients/api';
import { ProductStatus } from '@/server/db/types/enum/product-status';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import {
  createProduct as createProductAction,
  deleteProducts,
  updateProduct as updateProductAction,
  markAsSold as markAsSoldAction,
  duplicateProduct as duplicateProductAction,
} from '../../server/actions/inventory';
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
  filters?: {
    status?: ProductStatus[];
    warehouse: string[];
    dateRange?: {
      from: Date;
      to: Date;
    };
  },
): Promise<PaginatedResponse<Product>> => {
  const { data } = await api.get('/products', {
    params: {
      offset,
      limit,
      search: query,
      sortBy,
      sortOrder: sortDirection,
      filters: filters ? JSON.stringify(filters) : undefined,
    },
  });

  return data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export const createProduct = async (payload: CreateProductPayload) => {
  await createProductAction(payload);
};

export const updateProduct = async (id: number, payload: UpdateProductPayload) => {
  await updateProductAction(id, payload);
};

export const removeProducts = async (productsIds: number[]) => {
  await deleteProducts(productsIds);
};

export const markAsSold = async (products: MarkProductsAsSoldPayload[]) => {
  await markAsSoldAction(products);
};

export const duplicateProduct = async (productId: number) => {
  await duplicateProductAction(productId);
};
