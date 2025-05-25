'use client';

import { useCallback, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import {
  InventoryActionSlotPayload,
  useInventoryTableColumns,
} from '@/features/inventory/hooks/use-inventory-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useUrlPagination } from '@/hooks/use-url-pagination';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useI18n } from '@/locales/client';
import { calculatePageIndex } from '@/utils/calculate-page-index';

import RemoveProductDialog from '../../organisms/dialogs/remove-product-dialog';
import { InventoryTable } from '../../organisms/inventory-table';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { page, perPage, onPaginationChange } = useUrlPagination();

  const { data: productsData } = useProducts({ page, perPage, query });

  const [selectedProduct, setSelectedProduct] = useState<InventoryActionSlotPayload | null>(null);

  const [isOpenRemoveProductDialog, handleOpenRemoveProductDialog, handleCloseRemoveProductDialog] = useDialog();

  const actionsSlot = useCallback((payload: InventoryActionSlotPayload) => {
    const actions: Action[] = [
      {
        key: 'remove',
        label: t('common.button.remove'),
        onClick: () => {
          handleOpenRemoveProductDialog();
          setSelectedProduct(payload);
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  }, []);

  const columns = useInventoryTableColumns(actionsSlot);

  return (
    <div>
      <InventoryTable
        columns={columns}
        data={productsData?.resources ?? []}
        search={{ query, handleChangeQuery }}
        pagination={{
          pageIndex: calculatePageIndex(page),
          pageSize: perPage,
          totalItems: productsData?.total ?? 0,
          onPaginationChange,
        }}
      />
      <RemoveProductDialog
        open={isOpenRemoveProductDialog}
        onClose={handleCloseRemoveProductDialog}
        selectedProductId={selectedProduct?.id || 0}
      />
    </div>
  );
};

export default ClientInventory;
