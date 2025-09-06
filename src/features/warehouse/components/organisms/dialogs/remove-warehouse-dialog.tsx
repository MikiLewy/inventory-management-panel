'use client';

import { useRemoveWarehouse } from '@/features/warehouse/hooks/mutation/use-remove-warehouse';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedWarehouseId: number;
  selectedWarehouseName?: string;
}

const RemoveWarehouseDialog = ({ open, onClose, selectedWarehouseId, selectedWarehouseName }: Props) => {
  const t = useI18n();

  const { mutate, isPending } = useRemoveWarehouse();

  const onSubmit = () => {
    mutate(selectedWarehouseId, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={t('warehouse.dialog.remove.title')}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={!selectedWarehouseId}
      confirmButtonText={t('warehouse.dialog.remove.confirmButton')}
      scrollable>
      <p>
        {t('warehouse.dialog.remove.description', {
          warehouseName: selectedWarehouseName,
        })}
      </p>
    </Dialog>
  );
};

export default RemoveWarehouseDialog;
