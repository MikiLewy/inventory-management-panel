import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';

import { exportProducts, ExportProductsParams } from '../../server/actions/export-products';
import { triggerDownload } from '../../utils/export-products';

export const useExportProducts = () => {
  const t = useI18n();

  return useMutation({
    mutationFn: (params: ExportProductsParams) => exportProducts(params),
    onSuccess: result => {
      triggerDownload(result.data, result.filename, result.mimeType);
      toast.success(t('exportProducts.success', { count: result.count }));
    },
    onError: (error: Error) => {
      if (error.message === 'No products to export') {
        toast.error(t('exportProducts.noProducts'));
      } else if (error.message.includes('Export limit exceeded')) {
        toast.error(t('exportProducts.limitExceeded'));
      } else {
        toast.error(t('exportProducts.error'));
      }
    },
  });
};
