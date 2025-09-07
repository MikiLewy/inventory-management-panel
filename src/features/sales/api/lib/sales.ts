import { SortDirection } from '@tanstack/react-table';

import api from '@/api/clients/api';
import { PaginatedResponse } from '@/types/interfaces/paginated-response';

import { CreateSaleFormValues } from '../../components/organisms/create-new-sale-sheet/create-new-sale-sheet';
import {
  createSale as createSaleAction,
  updateSale as updateSaleAction,
  deleteSales as deleteSalesAction,
  revertSale as revertSalesAction,
  duplicateSale as duplicateSaleAction,
} from '../../server/actions/sales';
import { UpdateSalePayload } from '../../types/payload/update-sale';
import { Sale } from '../types/sales';

export const fetchSales = async (
  offset: number,
  limit: number,
  query?: string,
  sortBy?: string,
  sortDirection?: SortDirection,
  filters?: {
    dateRange?: {
      from: Date;
      to: Date;
    };
  },
): Promise<PaginatedResponse<Sale>> => {
  const { data } = await api.get('/sales', {
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

export const fetchSale = async (id: number): Promise<Sale> => {
  const { data } = await api.get(`/sales/${id}`);

  return data;
};

export const createSale = async (sale: CreateSaleFormValues) => {
  return createSaleAction(sale);
};

export const updateSale = async (id: number, sale: UpdateSalePayload) => {
  return updateSaleAction(id, sale);
};

export const removeSales = async (salesIds: number[]) => {
  return deleteSalesAction(salesIds);
};

export const revertSales = async (saleIds: number[], warehouseId: number) => {
  return revertSalesAction(saleIds, warehouseId);
};

export const duplicateSale = async (saleId: number) => {
  return duplicateSaleAction(saleId);
};
