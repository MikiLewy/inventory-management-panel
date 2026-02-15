'use client';

import { PlusIcon, Upload } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet } from '@/components/ui/sheet';
import { useDialog } from '@/hooks/use-dialog';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useI18n } from '@/locales/client';
import { useSalesSelection } from '@/store/sales-selection';

import { ExportDropdown } from '../molecules/export-dropdown/export-dropdown';

import { CreateNewSaleSheet } from './create-new-sale-sheet/create-new-sale-sheet';
import { CreateSaleFromInventorySheet } from './create-sale-from-inventory-sheet/create-sale-from-inventory-sheet';
import ImportSalesDialog from './dialogs/import-sales';

const SalesPageHeaderActions = () => {
  const t = useI18n();

  const saleCreationType = useRef<'new' | 'inventory'>('new');

  const [isOpenCreateSaleSheet, handleOpenCreateSaleSheet, handleCloseCreateSaleSheet] = useDialog();

  const [isOpenImportDialog, handleOpenImportDialog, handleCloseImportDialog] = useDialog();

  const { getSelectedIds } = useSalesSelection();
  const selectedIds = getSelectedIds();

  const { filters } = useUrlFilters();
  const { query } = useUrlQuery();

  const exportFilters = {
    profitPositive: filters.profitPositive ? (filters.profitPositive[0] as boolean) : undefined,
  };

  return (
    <div className="flex items-center gap-2">
      <ExportDropdown selectedIds={selectedIds} filters={exportFilters} query={query} />

      <Button variant="outline" onClick={handleOpenImportDialog}>
        <Upload className="mr-2 h-4 w-4" />
        {t('importSales.title')}
      </Button>

      <Sheet
        open={isOpenCreateSaleSheet}
        onOpenChange={() => {
          if (isOpenCreateSaleSheet) {
            handleCloseCreateSaleSheet();
          } else {
            handleOpenCreateSaleSheet();
          }
        }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              {t('createSale.title')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                saleCreationType.current = 'inventory';
                handleOpenCreateSaleSheet();
              }}>
              {t('createSale.selectFromInventory')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                saleCreationType.current = 'new';
                handleOpenCreateSaleSheet();
              }}>
              {t('createSale.addNew')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {saleCreationType.current === 'inventory' ? (
          <CreateSaleFromInventorySheet open={isOpenCreateSaleSheet} onClose={handleCloseCreateSaleSheet} />
        ) : (
          <CreateNewSaleSheet open={isOpenCreateSaleSheet} onClose={handleCloseCreateSaleSheet} />
        )}
      </Sheet>

      <ImportSalesDialog open={isOpenImportDialog} onClose={handleCloseImportDialog} />
    </div>
  );
};

export default SalesPageHeaderActions;
