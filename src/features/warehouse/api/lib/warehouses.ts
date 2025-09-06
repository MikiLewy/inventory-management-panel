import api from '@/api/clients/api';

import {
  createWarehouse as createWarehouseAction,
  updateWarehouse as updateWarehouseAction,
  deleteWarehouse as deleteWarehouseAction,
} from '../../server/actions/warehouses';
import { CreateWarehousePayload } from '../../types/payload/create-warehouse';
import { Warehouse } from '../types/warehouse';

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
  const { data } = await api.get('/warehouses');

  return data;
};

export const fetchWarehouse = async (id: number): Promise<Warehouse> => {
  const { data } = await api.get(`/warehouses/${id}`);

  return data;
};

export const createWarehouse = async (warehouse: CreateWarehousePayload) => {
  return createWarehouseAction(warehouse);
};

export const updateWarehouse = async (id: number, warehouse: CreateWarehousePayload) => {
  return updateWarehouseAction(id, warehouse);
};

export const removeWarehouse = async (warehouseId: number) => {
  return deleteWarehouseAction(warehouseId);
};
