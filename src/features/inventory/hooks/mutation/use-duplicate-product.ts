import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { duplicateProduct } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';

export const useDuplicateProduct = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => duplicateProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success(t('inventory.dialog.duplicateProduct.success'));
    },
  });
};
