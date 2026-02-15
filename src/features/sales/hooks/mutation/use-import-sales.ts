import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';
import { ImportResult } from '@/shared/types/import-export';

import { salesKeys } from '../../api/query-keys/sales-keys';
import { importSales } from '../../server/actions/import-sales';
import { ImportSalePayload } from '../../types/payload/import-sales';

export const useImportSales = () => {
  const t = useI18n();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sales: ImportSalePayload[]): Promise<ImportResult> => importSales(sales),
    onSuccess: result => {
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      if (result.failed === 0) {
        toast.success(t('importSales.success', { count: result.success }));
      } else if (result.success > 0) {
        toast.success(t('importSales.partialSuccess', { success: result.success, failed: result.failed }));
      } else {
        toast.error(t('importSales.error'));
      }
    },
    onError: () => {
      toast.error(t('importSales.error'));
    },
  });
};
