'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { useDialog } from '@/hooks/use-dialog';
import { useI18n } from '@/locales/client';

import { CreateWarehouseSheet } from './create-warehouse-sheet/create-warehouse-sheet';

const WarehousesPageHeaderActions = () => {
  const t = useI18n();

  const [isOpenCreateWarehouseSheet, handleOpenCreateWarehouseSheet, handleCloseCreateWarehouseSheet] = useDialog();

  return (
    <Sheet
      open={isOpenCreateWarehouseSheet}
      onOpenChange={() => {
        if (isOpenCreateWarehouseSheet) {
          handleCloseCreateWarehouseSheet();
        } else {
          handleOpenCreateWarehouseSheet();
        }
      }}>
      <Button onClick={handleOpenCreateWarehouseSheet}>
        <PlusIcon className="w-4 h-4" />
        {t('warehouse.add')}
      </Button>

      <CreateWarehouseSheet open={isOpenCreateWarehouseSheet} onClose={handleCloseCreateWarehouseSheet} />
    </Sheet>
  );
};

export default WarehousesPageHeaderActions;
