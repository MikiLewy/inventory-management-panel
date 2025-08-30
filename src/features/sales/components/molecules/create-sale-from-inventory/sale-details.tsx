import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { DatePicker } from '@/components/molecules/date-picker';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useMarkProductsAsSold } from '@/features/inventory/hooks/mutation/use-mark-products-as-sold';
import { CreateSaleEvent } from '@/features/sales/utils/create-sale-machine';
import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

import { CreateSaleFromInventoryFormValues } from '../../organisms/create-sale-from-inventory-sheet/create-sale-from-inventory-sheet';

interface Props {
  send: (event: CreateSaleEvent) => void;
  onClose: () => void;
  setSelectedRows: OnChangeFn<RowSelectionState>;
}

const SelectFromInventory = ({ send, onClose, setSelectedRows }: Props) => {
  const t = useI18n();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<CreateSaleFromInventoryFormValues>();

  const { fields, remove } = useFieldArray({
    name: 'products',
    control,
  });

  const products = watch('products');

  const { mutate: markAsSold, isPending } = useMarkProductsAsSold();

  const onSubmit = (values: CreateSaleFromInventoryFormValues) => {
    const transformedProducts = values.products.map(product => ({
      id: product.id,
      soldPrice: product.soldPrice,
      soldPlace: product.soldPlace || '',
      soldDate: product.soldDate || new Date(),
    }));

    markAsSold(transformedProducts, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const nextButtonDisabled = fields.length <= 0 || Object.keys(errors).length > 0;

  const handleBack = () => {
    const selectedRows = products.reduce(
      (acc, product) => {
        acc[product.id] = true;
        return acc;
      },
      {} as Record<number, boolean>,
    );

    setSelectedRows(selectedRows);
    send({ type: 'BACK' });
  };

  return (
    <StepContent>
      <div className="flex flex-col gap-8">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center  gap-2">
                <h5 className="text-lg font-semibold mb-2">
                  {field?.name} -{' '}
                  {field?.sizeUnit !== SizeUnit.EU ? <span className="mr-0.5">{field?.sizeUnit}</span> : null}
                  {field?.size}
                </h5>
              </div>
              <div className="flex items-end gap-2 w-full">
                <FormField
                  control={control}
                  name={`products.${index}.soldPrice`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('inventory.dialog.markAsSold.soldPrice')} *</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`products.${index}.soldPlace`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('inventory.dialog.markAsSold.soldPlace')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`products.${index}.soldDate`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <DatePicker
                          label={t('inventory.dialog.markAsSold.soldDate')}
                          value={new Date(field.value || new Date())}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {fields?.length > 1 ? (
                  <Button size="default" variant="ghost" onClick={() => remove(index)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  {errors?.products?.[index]?.soldPrice?.message ? (
                    <FormMessage>{errors?.products?.[index]?.soldPrice?.message}</FormMessage>
                  ) : null}
                </div>
                <div className="w-full">
                  {errors?.products?.[index]?.soldPlace?.message ? (
                    <FormMessage>{errors?.products?.[index]?.soldPlace?.message}</FormMessage>
                  ) : null}
                </div>
                <div className="w-full">
                  {errors?.products?.[index]?.soldDate?.message ? (
                    <FormMessage>{errors?.products?.[index]?.soldDate?.message}</FormMessage>
                  ) : null}
                </div>
              </div>
            </div>
            {index !== fields.length - 1 ? <Separator className="my-1" /> : null}
          </Fragment>
        ))}
      </div>

      <StepNavigatorButtons
        onBack={handleBack}
        onNext={handleSubmit(onSubmit)}
        onNextTitle={t('common.button.submit')}
        nextDisabled={nextButtonDisabled}
        nextIsSubmitting={isPending}
      />
    </StepContent>
  );
};

export default SelectFromInventory;
