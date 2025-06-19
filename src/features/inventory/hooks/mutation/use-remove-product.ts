import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { removeProducts } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';

export const useRemoveProduct = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => removeProducts(ids),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success(t('inventory.dialog.remove.success', { count: ids.length }));
    },
    onError: () => {
      toast.error('failed');
    },
  });
};
