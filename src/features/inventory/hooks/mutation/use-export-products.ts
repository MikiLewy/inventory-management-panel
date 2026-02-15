import { useExport } from '@/shared/hooks/use-export';

import { exportProducts, ExportProductsParams } from '../../server/actions/export-products';

export const useExportProducts = () => {
  return useExport<ExportProductsParams>({
    mutationFn: exportProducts,
  });
};
