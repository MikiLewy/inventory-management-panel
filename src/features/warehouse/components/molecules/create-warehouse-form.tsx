import { useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { FormControl, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/locales/client';

import { useCreateWarehouse } from '../../hooks/mutation/use-create-warehouse';
import { useUpdateWarehouse } from '../../hooks/mutation/use-update-warehouse';
import { CreateWarehouseFormValues } from '../organisms/create-warehouse-sheet/create-warehouse-sheet';

interface Props {
  onClose: () => void;
  selectedWarehouseId?: number;
}

const CreateWarehouseForm = ({ onClose, selectedWarehouseId }: Props) => {
  const t = useI18n();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateWarehouseFormValues>();

  const name = watch('name');

  const nextButtonDisabled = !name || !!errors.name;

  const { mutate: createWarehouse, isPending } = useCreateWarehouse();

  const { mutate: updateWarehouse, isPending: isUpdating } = useUpdateWarehouse();

  const onSubmit = (values: CreateWarehouseFormValues) => {
    if (selectedWarehouseId) {
      updateWarehouse(
        { id: selectedWarehouseId, warehouse: values },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      createWarehouse(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <StepContent>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <FormField
              control={control}
              name="name"
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="w-full mb-3">
                    <FormLabel>{t('warehouse.dialog.add.name')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('warehouse.dialog.add.namePlaceholder')} {...field} {...fieldState} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex gap-4 w-full">
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('warehouse.dialog.add.address')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('warehouse.dialog.add.addressPlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="postCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('warehouse.dialog.add.postCode')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('warehouse.dialog.add.postCodePlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                {errors?.address?.message ? <FormMessage>{errors?.address?.message}</FormMessage> : null}
              </div>
              <div className="w-full">
                {errors?.postCode?.message ? <FormMessage>{errors?.postCode?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <FormField
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('warehouse.dialog.add.city')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('warehouse.dialog.add.cityPlaceholder')}
                        onChange={onChange}
                        value={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('warehouse.dialog.add.country')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('warehouse.dialog.add.countryPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                {errors?.city?.message ? <FormMessage>{errors?.city?.message}</FormMessage> : null}
              </div>
              <div className="w-full">
                {errors?.country?.message ? <FormMessage>{errors?.country?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <StepNavigatorButtons
        onNext={handleSubmit(onSubmit)}
        nextIsSubmitting={isPending || isUpdating}
        onNextTitle={t('common.button.submit')}
        nextDisabled={nextButtonDisabled}
      />
    </StepContent>
  );
};

export default CreateWarehouseForm;
