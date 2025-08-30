import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { salesKeys } from '@/features/sales/api/query-keys/sales-keys';
import { useI18n } from '@/locales/client';

import { markAsSold } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';
import { MarkProductsAsSoldPayload } from '../../types/payload/mark-products-as-sold';

export const useMarkProductsAsSold = () => {
  const t = useI18n();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (products: MarkProductsAsSoldPayload[]) => markAsSold(products),
    onSuccess: (_, products) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      toast.success(
        t('inventory.dialog.markAsSold.success', {
          count: products.length,
        }),
      );
    },
  });
};
