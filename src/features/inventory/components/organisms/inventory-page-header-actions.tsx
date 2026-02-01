'use client';

import { PlusIcon, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useDialog } from '@/hooks/use-dialog';
import { useI18n } from '@/locales/client';

import { CreateProductSheet } from './create-product-sheet/create-product-sheet';
import { ImportProductsDialog } from './dialogs/import-products';

const InventoryPageHeaderActions = () => {
  const t = useI18n();

  const [isOpenCreateProductSheet, handleOpenCreateProductSheet, handleCloseCreateProductSheet] = useDialog();
  const [isOpenImportDialog, handleOpenImportDialog, handleCloseImportDialog] = useDialog();

  return (
    <div className="flex items-center gap-2">
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
