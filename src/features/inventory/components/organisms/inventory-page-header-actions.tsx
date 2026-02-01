'use client';

import { PlusIcon, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { useDialog } from '@/hooks/use-dialog';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useI18n } from '@/locales/client';
import { useInventorySelection } from '@/store/inventory-selection';

import { ExportDropdown } from '../molecules/export-dropdown';

import { CreateProductSheet } from './create-product-sheet/create-product-sheet';
import { ImportProductsDialog } from './dialogs/import-products';

const InventoryPageHeaderActions = () => {
  const t = useI18n();

  const [isOpenCreateProductSheet, handleOpenCreateProductSheet, handleCloseCreateProductSheet] = useDialog();
  const [isOpenImportDialog, handleOpenImportDialog, handleCloseImportDialog] = useDialog();

  const { getSelectedIds } = useInventorySelection();
  const selectedIds = getSelectedIds();

  const { filters } = useUrlFilters();
  const { query } = useUrlQuery();

  const exportFilters = {
    status: filters.status as ProductStatus[] | undefined,
    warehouse: filters.warehouse as string[] | undefined,
  };

  return (
    <div className="flex items-center gap-2">
      <ExportDropdown selectedIds={selectedIds} filters={exportFilters} query={query} />

      <Button variant="outline" onClick={handleOpenImportDialog}>
        <Upload className="h-4 w-4" />
        {t('importProducts.title')}
      </Button>

      <Sheet
        open={isOpenCreateProductSheet}
        onOpenChange={() => {
          if (isOpenCreateProductSheet) {
            handleCloseCreateProductSheet();
          } else {
            handleOpenCreateProductSheet();
          }
        }}>
        <SheetTrigger asChild>
          <Button>
            <PlusIcon className="h-4 w-4" />
            {t('inventory.add')}
          </Button>
        </SheetTrigger>
        <CreateProductSheet open={isOpenCreateProductSheet} onClose={handleCloseCreateProductSheet} />
      </Sheet>

      <ImportProductsDialog open={isOpenImportDialog} onClose={handleCloseImportDialog} />
    </div>
  );
};

export default InventoryPageHeaderActions;
