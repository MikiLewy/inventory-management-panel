import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { updateProduct } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';
import { UpdateProductPayload } from '../../types/payload/update-product';

export const useEditProduct = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateProductPayload }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success(t('createProduct.successEdit'));
    },
    onError: () => {
      toast.error(t('createProduct.errorEdit'));
    },
  });
};
