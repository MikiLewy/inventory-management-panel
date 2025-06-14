'use client';

import { useCallback, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import BulkActionsBubble from '@/components/atoms/bulk-actions-bubble';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { InventoryActionSlotPayload } from '@/features/inventory/hooks/use-inventory-table-columns';
import { useSales } from '@/features/sales/hooks/query/use-sales';
import { useSalesTableColumns } from '@/features/sales/hooks/use-sales-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useSelection } from '@/hooks/use-selection';
import { useUrlPagination } from '@/hooks/use-url-pagination';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useUrlSort } from '@/hooks/use-url-sort';
import { useI18n } from '@/locales/client';

import RevertSalesDialog from '../../organisms/dialogs/revert-sales-dialog';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { offset, limit, pageIndex, onPaginationChange } = useUrlPagination();

  const { sortBy, sortDirection, onSortChange } = useUrlSort('updated_at', 'desc');

  const { data: salesData } = useSales({ offset, limit, query, sortBy, sortDirection });

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

  const [isOpenRevertSalesDialog, handleOpenRevertSalesDialog, handleCloseRevertSalesDialog] = useDialog();

  const onCancelRevertSalesDialog = () => {
    handleCloseRevertSalesDialog();
    handleClearSelected();
  };

  const columns = useSalesTableColumns(actionsSlot);

  return (
    <div>
      <DataTable
        columns={columns}
        data={salesData?.resources ?? []}
        search={{ query, handleChangeQuery: onQueryChange }}
        pagination={{
          pageIndex,
          pageSize: limit,
          totalItems: salesData?.total ?? 0,
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
            key: 'revert-sales',
            label: t('sales.revertSales'),
            onClick: () => {
              handleOpenRevertSalesDialog();
            },
          },
        ]}
        selectedItemsCount={Object.keys(selectedRows).length}
      />
      <RevertSalesDialog
        open={isOpenRevertSalesDialog}
        onClose={onCancelRevertSalesDialog}
        selectedSalesIds={Object.keys(selectedRows).map(key => Number(key))}
      />
    </div>
  );
};

export default ClientInventory;
