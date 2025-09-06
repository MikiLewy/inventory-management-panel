import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { removeWarehouse } from '../../api/lib/warehouses';
import { warehousesKeys } from '../../api/query-keys/warehouses-keys';

export const useRemoveWarehouse = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (warehouseId: number) => removeWarehouse(warehouseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehousesKeys.lists() });

      toast.success(t('warehouse.dialog.remove.success'));
    },
    onError: () => {
      toast.error(t('warehouse.dialog.remove.error'));
    },
  });
};
