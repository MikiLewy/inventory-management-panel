'use client';

import { useRemoveProduct } from '@/features/inventory/hooks/mutation/use-remove-product';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

interface Props extends DialogActions {
  selectedProductIds: number[];
  selectedProductName?: string;
}

const RemoveProductDialog = ({ open, onClose, selectedProductIds, selectedProductName }: Props) => {
  const t = useI18n();

  const isRemovingMultipleProducts = selectedProductIds.length > 1;

  const { mutate, isPending } = useRemoveProduct();

  const onSubmit = () => {
    mutate(selectedProductIds, { onSuccess: onClose });
  };

  return (
    <Dialog
      title={
        isRemovingMultipleProducts ? t('inventory.dialog.remove.titleMultiple') : t('inventory.dialog.remove.title')
      }
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={selectedProductIds.length <= 0}
      confirmButtonText={t('inventory.dialog.remove.confirmButton')}
      scrollable>
      <p>
        {isRemovingMultipleProducts
          ? t('inventory.dialog.remove.descriptionMultiple')
          : t('inventory.dialog.remove.description', {
              productName: selectedProductName,
            })}
      </p>
    </Dialog>
  );
};

export default RemoveProductDialog;
