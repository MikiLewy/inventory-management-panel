import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { removeSales } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';

export const useRemoveSales = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => removeSales(ids),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(t('sales.dialog.remove.success', { count: ids.length }));
    },
    onError: () => {
      toast.error('failed');
    },
  });
};
