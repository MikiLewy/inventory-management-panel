import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { updateWarehouse } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';
import { CreateWarehousePayload } from '../../types/payload/create-warehouse';

export const useUpdateWarehouse = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, warehouse }: { id: number; warehouse: CreateWarehousePayload }) =>
      updateWarehouse(id, warehouse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehousesKeys.lists() });

      toast.success(t('warehouse.dialog.edit.success'));
    },
    onError: () => {
      toast.error(t('warehouse.dialog.edit.error'));
    },
  });
};
