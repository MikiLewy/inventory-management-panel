import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { updateSale } from '../../api/lib/sales';
import { salesKeys } from '../../api/query-keys/sales-keys';
import { UpdateSalePayload } from '../../types/payload/update-sale';

export const useUpdateSale = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateSalePayload }) => updateSale(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(t('createProduct.successEdit'));
    },
    onError: () => {
      toast.error(t('createProduct.errorEdit'));
    },
  });
};
