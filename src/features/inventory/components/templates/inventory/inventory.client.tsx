'use client';

import { Tag, Trash } from 'lucide-react';
import { useCallback, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import BulkActionsBubble from '@/components/atoms/bulk-actions-bubble';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import {
  InventoryActionSlotPayload,
  useInventoryTableColumns,
} from '@/features/inventory/hooks/use-inventory-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useSelection } from '@/hooks/use-selection';
import { useUrlPagination } from '@/hooks/use-url-pagination';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useUrlSort } from '@/hooks/use-url-sort';
import { useI18n } from '@/locales/client';

import MarkProductsAsSoldDialog from '../../organisms/dialogs/mark-products-as-sold/mark-products-as-sold';
import RemoveProductDialog from '../../organisms/dialogs/remove-product-dialog';
import { EditProductSheet } from '../../organisms/edit-product-sheet/edit-product-sheet';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { offset, limit, pageIndex, onPaginationChange } = useUrlPagination();

  const { sortBy, sortDirection, onSortChange } = useUrlSort('updated_at', 'desc');

  const { data: productsData } = useProducts({ offset, limit, query, sortBy, sortDirection });

  const [selectedProduct, setSelectedProduct] = useState<InventoryActionSlotPayload | null>(null);

  const [isOpenRemoveProductDialog, handleOpenRemoveProductDialog, handleCloseRemoveProductDialog] = useDialog();

  const [isOpenEditProductSheet, handleOpenEditProductSheet, handleCloseEditProductSheet] = useDialog();

  const { selectedRows, setSelectedRows, handleClearSelected } = useSelection();

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

  const [isOpenMarkAsSoldDialog, handleOpenMarkAsSoldDialog, handleCloseMarkAsSoldDialog] = useDialog();

  const onCancelMarkAsSoldDialog = () => {
    handleCloseMarkAsSoldDialog();
    handleClearSelected();
  };

  const onCancelRemoveProductDialog = () => {
    handleCloseRemoveProductDialog();
    handleClearSelected();
  };

  const columns = useInventoryTableColumns(actionsSlot);

  return (
    <div>
      <DataTable
        columns={columns}
        data={productsData?.resources ?? []}
        search={{ query, handleChangeQuery: onQueryChange }}
        pagination={{
          pageIndex,
          pageSize: limit,
          totalItems: productsData?.total ?? 0,
          onPaginationChange,
        }}
        sortable={{
          sortBy,
          sortDirection,
          onSortChange,
        }}
        selectable={{
          rowSelection: selectedRows,
          setRowSelection: setSelectedRows,
        }}
      />
      <BulkActionsBubble
        isOpen={Object.keys(selectedRows).length > 0}
        onClose={handleClearSelected}
        actions={[
          {
            key: 'mark-as-sold',
            icon: <Tag />,
            label: t('inventory.markAsSold'),
            onClick: handleOpenMarkAsSoldDialog,
          },
          {
            key: 'remove',
            icon: <Trash />,
            destructive: true,
            label: t('common.button.remove'),
            onClick: handleOpenRemoveProductDialog,
          },
        ]}
        selectedItemsCount={Object.keys(selectedRows).length}
      />
      <RemoveProductDialog
        open={isOpenRemoveProductDialog}
        onClose={onCancelRemoveProductDialog}
        selectedProductIds={selectedProduct ? [selectedProduct.id] : Object.keys(selectedRows).map(key => Number(key))}
        selectedProductName={selectedProduct?.name}
      />
      <EditProductSheet
        open={isOpenEditProductSheet}
        onClose={handleCloseEditProductSheet}
        selectedProductId={selectedProduct?.id || 0}
      />
      <MarkProductsAsSoldDialog
        open={isOpenMarkAsSoldDialog}
        onClose={onCancelMarkAsSoldDialog}
        selectedProductsIds={Object.keys(selectedRows)}
      />
    </div>
  );
};

export default ClientInventory;
