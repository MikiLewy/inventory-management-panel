import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { duplicateSale } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';

export const useDuplicateSale = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (saleId: number) => duplicateSale(saleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(t('sales.dialog.duplicateSale.success'));
    },
  });
};
