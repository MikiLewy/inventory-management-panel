'use client';

import { useRemoveProduct } from '@/features/inventory/hooks/mutation/use-remove-product';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedProductId: number;
}

const RemoveProductDialog = ({ open, onClose, selectedProductId }: Props) => {
  const t = useI18n();

  const { mutateAsync, isPending } = useRemoveProduct();

  const onSubmit = async () => {
    await mutateAsync(selectedProductId, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={t('inventory.dialog.remove.title')}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={!selectedProductId}
      confirmButtonText={t('common.button.yesRemove')}
      scrollable>
      <p>{t('inventory.dialog.remove.description')}</p>
    </Dialog>
  );
};

export default RemoveProductDialog;
