import { SortDirection } from '@tanstack/react-table';

import api from '@/api/clients/api';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import { CreateSaleFormValues } from '../../components/organisms/create-new-sale-sheet/create-new-sale-sheet';
import { UpdateSalePayload } from '../../types/payload/update-sale';
import { Sale } from '../types/sales';

export const fetchSales = async (
  offset: number,
  limit: number,
  query?: string,
  sortBy?: string,
  sortDirection?: SortDirection,
): Promise<PaginatedResponse<Sale>> => {
  const { data } = await api.get('/sales', {
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

export const fetchSale = async (id: number): Promise<Sale> => {
  const { data } = await api.get(`/sales/${id}`);

  return data;
};

export const createSale = async (sale: CreateSaleFormValues) => {
  const { data } = await api.post('/sales', sale);

  return data;
};

export const updateSale = async (id: number, sale: UpdateSalePayload) => {
  const { data } = await api.patch(`/sales/${id}`, sale);

  return data;
};

export const removeSales = async (salesIds: number[]) => {
  await api.delete(`/sales`, { data: { salesIds } });
};

export const revertSales = async (saleIds: number[]) => {
  await api.post(`/sales/revert-sales`, { saleIds });
};

export const duplicateSale = async (saleId: number) => {
  await api.post(`/sales/${saleId}/duplicate`);
};
