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
import { useUrlSort } from '@/hooks/use-url-sort';
import { useI18n } from '@/locales/client';

import RemoveProductDialog from '../../organisms/dialogs/remove-product-dialog';
import { EditProductSheet } from '../../organisms/edit-product-sheet/edit-product-sheet';
import { InventoryTable } from '../../organisms/inventory-table';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { offset, limit, onPaginationChange } = useUrlPagination();

  const { sortBy, sortDirection, onSortChange } = useUrlSort('updated_at', 'desc');

  const { data: productsData } = useProducts({ offset, limit, query, sortBy, sortDirection });

  const [selectedProduct, setSelectedProduct] = useState<InventoryActionSlotPayload | null>(null);

  const [isOpenRemoveProductDialog, handleOpenRemoveProductDialog, handleCloseRemoveProductDialog] = useDialog();

  const [isOpenEditProductSheet, handleOpenEditProductSheet, handleCloseEditProductSheet] = useDialog();

  const onQueryChange = useCallback(
    (query: string) => {
      handleChangeQuery(query);
      onPaginationChange({ pageIndex: 0, pageSize: limit });
    },
    [handleChangeQuery],
  );

  const actionsSlot = useCallback((payload: InventoryActionSlotPayload) => {
    const actions: Action[] = [
      {
        key: 'edit',
        label: t('common.button.edit'),
        onClick: () => {
          handleOpenEditProductSheet();
          setSelectedProduct(payload);
        },
      },
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
        search={{ query, handleChangeQuery: onQueryChange }}
        pagination={{
          pageIndex: offset,
          pageSize: limit,
          totalItems: productsData?.total ?? 0,
          onPaginationChange,
        }}
        sortable={{
          sortBy,
          sortDirection,
          onSortChange,
        }}
      />
      <RemoveProductDialog
        open={isOpenRemoveProductDialog}
        onClose={handleCloseRemoveProductDialog}
        selectedProductId={selectedProduct?.id || 0}
      />
      <EditProductSheet
        open={isOpenEditProductSheet}
        onClose={handleCloseEditProductSheet}
        selectedProductId={selectedProduct?.id || 0}
      />
    </div>
  );
};

export default ClientInventory;
