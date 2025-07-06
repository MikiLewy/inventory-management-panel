'use client';

import { PlusIcon } from 'lucide-react';
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
import { useI18n } from '@/locales/client';

import { CreateNewSaleSheet } from './create-new-sale-sheet/create-new-sale-sheet';
import { CreateSaleFromInventorySheet } from './create-sale-from-inventory-sheet/create-sale-from-inventory-sheet';

const SalesPageHeaderActions = () => {
  const t = useI18n();

  const saleCreationType = useRef<'new' | 'inventory'>('new');

  const [isOpenCreateSaleSheet, handleOpenCreateSaleSheet, handleCloseCreateSaleSheet] = useDialog();

  return (
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
            <PlusIcon className="w-4 h-4" />
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
  );
};

export default SalesPageHeaderActions;
