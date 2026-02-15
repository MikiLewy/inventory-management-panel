import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useI18n } from '@/locales/client';
import { ExportResult } from '@/shared/types/import-export';

import { triggerDownload } from '../utils/export';

interface UseExportOptions<TParams> {
  mutationFn: (params: TParams) => Promise<ExportResult>;
}

export const useExport = <TParams>({ mutationFn }: UseExportOptions<TParams>) => {
  const t = useI18n();

  return useMutation({
    mutationFn,
    onSuccess: result => {
      triggerDownload(result.data, result.filename, result.mimeType);

      toast.success(t('importExport.export.success', { count: result.count }));
    },
    onError: () => {
      toast.error(t('importExport.export.error'));
    },
  });
};
