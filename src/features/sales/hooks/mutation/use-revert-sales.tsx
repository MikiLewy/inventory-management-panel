import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { revertSales } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';

export const useRevertSales = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (salesIds: number[]) => revertSales(salesIds),
    onSuccess: (_, salesIds) => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(
        t('sales.dialog.revertSales.success', {
          count: salesIds.length,
        }),
      );
    },
  });
};
