import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { createSale } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';
import { CreateSaleFormValues } from '../../components/organisms/create-new-sale-sheet/create-new-sale-sheet';

export const useCreateSale = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sale: CreateSaleFormValues) => createSale(sale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(t('createSale.successCreate'));
    },
    onError: () => {
      toast.error(t('createSale.errorCreate'));
    },
  });
};
