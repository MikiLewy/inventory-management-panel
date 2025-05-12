'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { Sheet } from '@/components/ui/sheet';
import { useDialog } from '@/hooks/use-dialog';
import { useI18n } from '@/locales/client';

import { CreateProductSheet } from './create-product-sheet/create-product-sheet';

const InventoryPageHeaderActions = () => {
  const t = useI18n();

  const [isOpenCreateProductSheet, handleOpenCreateProductSheet, handleCloseCreateProductSheet] = useDialog();

  return (
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
          <PlusIcon className="w-4 h-4" />
          {t('inventory.add')}
        </Button>
      </SheetTrigger>
      <CreateProductSheet open={isOpenCreateProductSheet} onClose={handleCloseCreateProductSheet} />
    </Sheet>
  );
};

export default InventoryPageHeaderActions;
