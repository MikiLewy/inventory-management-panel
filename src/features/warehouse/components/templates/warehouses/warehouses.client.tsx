'use client';

import { useCallback, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { Sheet } from '@/components/ui/sheet';
import { useWarehouses } from '@/features/warehouse/hooks/query/use-warehouses';
import {
  useWarehousesTableColumns,
  WarehousesActionSlotPayload,
} from '@/features/warehouse/hooks/use-warehouses-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useI18n } from '@/locales/client';

import { CreateWarehouseSheet } from '../../organisms/create-warehouse-sheet/create-warehouse-sheet';
import RemoveWarehouseDialog from '../../organisms/dialogs/remove-warehouse-dialog';

const ClientWarehouses = () => {
  const t = useI18n();

  const { data: warehousesData, isLoading } = useWarehouses();

  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehousesActionSlotPayload | null>(null);

  const [isOpenRemoveWarehouseDialog, handleOpenRemoveWarehouseDialog, handleCloseRemoveWarehouseDialog] = useDialog();

  const [isOpenEditWarehouseDialog, handleOpenEditWarehouseDialog, handleCloseEditWarehouseDialog] = useDialog();

  const actionsSlot = useCallback(
    (payload: WarehousesActionSlotPayload) => {
      const actions: Action[] = [
        {
          key: 'edit',
          label: t('common.button.edit'),
          onClick: () => {
            handleOpenEditWarehouseDialog();
            setSelectedWarehouse(payload);
          },
        },
        {
          key: 'remove',
          label: t('common.button.remove'),
          disabled: warehousesData?.length === 1 || !warehousesData,
          tooltipTitle: t('warehouse.youMustHaveAtLeastOneWarehouse'),
          onClick: () => {
            handleOpenRemoveWarehouseDialog();
            setSelectedWarehouse(payload);
          },
        },
      ];

      return <ActionsTableMenu actions={actions} />;
    },
    [t, handleOpenEditWarehouseDialog, handleOpenRemoveWarehouseDialog, warehousesData],
  );

  const columns = useWarehousesTableColumns(actionsSlot);

  return (
    <div>
      <DataTable columns={columns} data={warehousesData || []} isLoading={isLoading} />

      <Sheet
        open={isOpenEditWarehouseDialog}
        onOpenChange={() => {
          if (isOpenEditWarehouseDialog) {
            handleCloseEditWarehouseDialog();
          } else {
            handleOpenEditWarehouseDialog();
          }
        }}>
        <CreateWarehouseSheet
          open={isOpenEditWarehouseDialog}
          onClose={handleCloseEditWarehouseDialog}
          selectedWarehouseId={selectedWarehouse?.id || 0}
        />
      </Sheet>
      <RemoveWarehouseDialog
        open={isOpenRemoveWarehouseDialog}
        onClose={handleCloseRemoveWarehouseDialog}
        selectedWarehouseId={selectedWarehouse?.id || 0}
        selectedWarehouseName={selectedWarehouse?.name}
      />
    </div>
  );
};

export default ClientWarehouses;
