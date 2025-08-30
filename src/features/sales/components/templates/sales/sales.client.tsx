'use client';

import { RowSelectionState } from '@tanstack/react-table';
import { TrashIcon, Undo2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import BulkActionsBubble from '@/components/atoms/bulk-actions-bubble';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { useDuplicateSale } from '@/features/sales/hooks/mutation/use-duplicate-sale';
import { useSales } from '@/features/sales/hooks/query/use-sales';
import { SalesActionSlotPayload, useSalesTableColumns } from '@/features/sales/hooks/use-sales-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useSelection } from '@/hooks/use-selection';
import { useUrlPagination } from '@/hooks/use-url-pagination';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useUrlSort } from '@/hooks/use-url-sort';
import { useI18n } from '@/locales/client';

import RemoveSalesDialog from '../../organisms/dialogs/remove-sales-dialog';
import RevertSalesDialog from '../../organisms/dialogs/revert-sales-dialog';
import { EditSaleSheet } from '../../organisms/edit-sales-sheet/edit-sale-sheet';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { offset, limit, pageIndex, onPaginationChange } = useUrlPagination();

  const { sortBy, sortDirection, onSortChange } = useUrlSort('updated_at', 'desc');

  const { data: salesData, isLoading } = useSales({ offset, limit, query, sortBy, sortDirection });

  const [selectedSale, setSelectedSale] = useState<SalesActionSlotPayload | null>(null);

  const [isOpenRevertSalesDialog, handleOpenRevertSalesDialog, handleCloseRevertSalesDialog] = useDialog();

  const [isOpenRemoveSalesDialog, handleOpenRemoveSalesDialog, handleCloseRemoveSalesDialog] = useDialog();

  const onCancelRevertSalesDialog = () => {
    handleCloseRevertSalesDialog();
    setSelectedSale(null);
    handleClearSelected();
  };

  const onCancelRemoveSalesDialog = () => {
    handleCloseRemoveSalesDialog();
    setSelectedSale(null);
    handleClearSelected();
  };

  const [isOpenEditSaleSheet, handleOpenEditSaleSheet, handleCloseEditSaleSheet] = useDialog();

  const { selectedRows, setSelectedRows, handleClearSelected } = useSelection();

  const onQueryChange = useCallback(
    (query: string) => {
      handleChangeQuery(query);
      onPaginationChange({ pageIndex: 0, pageSize: limit });
    },
    [handleChangeQuery],
  );

  const { mutate: duplicateSale } = useDuplicateSale();

  const actionsSlot = useCallback((payload: SalesActionSlotPayload) => {
    const actions: Action[] = [
      {
        key: 'edit',
        label: t('common.button.edit'),
        onClick: () => {
          handleOpenEditSaleSheet();
          setSelectedSale(payload);
        },
      },
      {
        key: 'duplicate',
        label: t('sales.dialog.duplicateSale.title'),
        onClick: () => {
          duplicateSale(payload.id);
        },
      },
      {
        key: 'revert',
        label: t('sales.revertSale'),
        onClick: () => {
          handleOpenRevertSalesDialog();
          setSelectedSale(payload);
        },
      },
      {
        key: 'remove',
        label: t('common.button.remove'),
        onClick: () => {
          handleOpenRemoveSalesDialog();
          setSelectedSale(payload);
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  }, []);

  const columns = useSalesTableColumns(actionsSlot);

  const isAllItemsFromCurrentPageSelected = useMemo(() => {
    return salesData?.resources.every(sale => selectedRows[sale.id?.toString()]) ?? false;
  }, [selectedRows, salesData]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={salesData?.resources ?? []}
        search={{ query, handleChangeQuery: onQueryChange }}
        view="sales"
        isLoading={isLoading}
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
        onSelectAll={() =>
          setSelectedRows(prev => ({
            ...prev,
            ...(salesData?.resources.reduce((acc, sale) => {
              acc[sale.id?.toString()] = true;
              return acc;
            }, {} as RowSelectionState) || {}),
          }))
        }
        isAllItemsSelected={isAllItemsFromCurrentPageSelected}
        allItemsCount={salesData?.resources.length ?? 0}
        actions={[
          {
            key: 'revert-sales',
            icon: <Undo2 />,
            label: t('sales.revertSale'),
            onClick: handleOpenRevertSalesDialog,
          },
          {
            key: 'remove-sales',
            destructive: true,
            icon: <TrashIcon />,
            label: t('common.button.remove'),
            onClick: handleOpenRemoveSalesDialog,
          },
        ]}
        selectedItemsCount={Object.keys(selectedRows).length}
      />
      <EditSaleSheet
        open={isOpenEditSaleSheet}
        onClose={handleCloseEditSaleSheet}
        selectedSaleId={selectedSale?.id || 0}
      />
      <RevertSalesDialog
        open={isOpenRevertSalesDialog}
        onClose={onCancelRevertSalesDialog}
        selectedSalesIds={selectedSale ? [selectedSale.id] : Object.keys(selectedRows).map(key => Number(key))}
        selectedProductName={selectedSale?.productName}
      />
      <RemoveSalesDialog
        open={isOpenRemoveSalesDialog}
        onClose={onCancelRemoveSalesDialog}
        selectedSalesIds={selectedSale ? [selectedSale.id] : Object.keys(selectedRows).map(key => Number(key))}
        selectedProductName={selectedSale?.productName}
      />
    </div>
  );
};

export default ClientInventory;
