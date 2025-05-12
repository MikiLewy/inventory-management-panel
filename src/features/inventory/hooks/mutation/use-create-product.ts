import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { createProduct } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';

export const useCreateProduct = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success(t('createProduct.success'));
    },
    onError: () => {
      toast.error(t('createProduct.error'));
    },
  });
};
