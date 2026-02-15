import { useExport } from '@/shared/hooks/use-export';

import { exportSales } from '../../server/actions/export-sales';
import { ExportSalesParams } from '../../types/payload/export-sales';

export const useExportSales = () => {
  return useExport<ExportSalesParams>({
    mutationFn: exportSales,
  });
};
