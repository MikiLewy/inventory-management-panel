import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { productsKeys } from '../../api/query-keys/products-keys';
import { importProducts } from '../../server/actions/inventory';
import { ImportProductPayload, ImportResult } from '../../types/payload/import-products';

export const useImportProducts = () => {
  const t = useI18n();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (products: ImportProductPayload[]): Promise<ImportResult> => importProducts(products),
    onSuccess: result => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      if (result.failed === 0) {
        toast.success(t('importProducts.success', { count: result.success }));
      } else if (result.success > 0) {
        toast.success(t('importProducts.partialSuccess', { success: result.success, failed: result.failed }));
      } else {
        toast.error(t('importProducts.error'));
      }
    },
    onError: () => {
      toast.error(t('importProducts.error'));
    },
  });
};
