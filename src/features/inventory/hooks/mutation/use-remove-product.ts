import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { removeProduct } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';

export const useRemoveProduct = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success(t('inventory.dialog.remove.success'));
    },
    onError: () => {
      toast.error('failed');
    },
  });
};
