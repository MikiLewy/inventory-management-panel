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

import { useExportProducts } from '../../../hooks/mutation/use-export-products';
import { ExportProductsParams } from '../../../server/actions/export-products';

export interface ExportDropdownProps {
  selectedIds: number[];
  filters?: ExportProductsParams['filters'];
  query?: string;
  disabled?: boolean;
}

export const ExportDropdown = ({ selectedIds, filters, query, disabled }: ExportDropdownProps) => {
  const t = useI18n();
  const { mutate: exportProducts, isPending } = useExportProducts();

  const hasSelection = selectedIds.length > 0;

  const handleExport = (scope: 'all' | 'selected', format: 'csv' | 'xlsx') => {
    exportProducts({
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
          {isPending ? t('exportProducts.exporting') : t('exportProducts.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{t('exportProducts.exportAll')}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExport('all', 'csv')}>
              <FileText className="h-4 w-4" />
              {t('exportProducts.csv')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('all', 'xlsx')}>
              <FileSpreadsheet className="h-4 w-4" />
              {t('exportProducts.xlsx')}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={!hasSelection}>
            {t('exportProducts.exportSelected')} ({selectedIds.length})
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExport('selected', 'csv')} disabled={!hasSelection}>
              <FileText className="h-4 w-4" />
              {t('exportProducts.csv')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('selected', 'xlsx')} disabled={!hasSelection}>
              <FileSpreadsheet className="h-4 w-4" />
              {t('exportProducts.xlsx')}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
