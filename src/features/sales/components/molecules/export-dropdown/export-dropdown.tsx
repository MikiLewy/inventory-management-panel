'use client';

import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/locales/client';

import { useExportSales } from '../../../hooks/mutation/use-export-sales';
import { ExportSalesParams } from '../../../types/payload/export-sales';

export interface ExportDropdownProps {
  selectedIds: number[];
  filters?: ExportSalesParams['filters'];
  query?: string;
  disabled?: boolean;
}

export const ExportDropdown = ({ selectedIds, filters, query, disabled }: ExportDropdownProps) => {
  const t = useI18n();
  const { mutate: exportSales, isPending } = useExportSales();

  const hasSelection = selectedIds.length > 0;

  const handleExport = (scope: 'all' | 'selected', format: 'csv' | 'xlsx') => {
    exportSales({
      format,
      scope,
      selectedIds: scope === 'selected' ? selectedIds : undefined,
      filters: scope === 'all' ? filters : undefined,
      query: scope === 'all' ? query : undefined,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled || isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {isPending ? t('importExport.export.exporting') : t('importExport.export.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{t('importExport.export.exportAll')}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExport('all', 'csv')}>
              <FileText className="h-4 w-4" />
              {t('importExport.export.csv')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('all', 'xlsx')}>
              <FileSpreadsheet className="h-4 w-4" />
              {t('importExport.export.xlsx')}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={!hasSelection}>
            {t('importExport.export.exportSelected')} ({selectedIds.length})
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExport('selected', 'csv')} disabled={!hasSelection}>
              <FileText className="h-4 w-4" />
              {t('importExport.export.csv')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('selected', 'xlsx')} disabled={!hasSelection}>
              <FileSpreadsheet className="h-4 w-4" />
              {t('importExport.export.xlsx')}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
