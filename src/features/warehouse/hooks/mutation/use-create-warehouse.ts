import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { createWarehouse } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';
import { CreateWarehousePayload } from '../../types/payload/create-warehouse';

export const useCreateWarehouse = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (warehouse: CreateWarehousePayload) => createWarehouse(warehouse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehousesKeys.lists() });

      toast.success(t('warehouse.dialog.add.success'));
    },
    onError: () => {
      toast.error(t('warehouse.dialog.add.error'));
    },
  });
};
