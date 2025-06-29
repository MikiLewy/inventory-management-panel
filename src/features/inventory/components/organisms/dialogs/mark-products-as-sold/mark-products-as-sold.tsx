'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { DatePicker } from '@/components/molecules/date-picker';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useMarkProductsAsSold } from '@/features/inventory/hooks/mutation/use-mark-products-as-sold';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import { useI18n } from '@/locales/client';
import Dialog, { DialogActions } from '@components/organisms/dialog';

import { useMarkAsSoldSchema } from './schema/mark-products-as-sold';

interface Props extends DialogActions {
  selectedProductsIds: string[];
}

interface FormValues {
  products: {
    productId: number;
    soldPrice: number;
    soldPlace?: string;
    soldDate?: Date;
  }[];
}

const defaultValues: FormValues = {
  products: [
    {
      productId: 0,
      soldPrice: 0,
      soldPlace: '',
      soldDate: new Date(),
    },
  ],
};

const MarkProductsAsSoldDialog = ({ open, onClose, selectedProductsIds }: Props) => {
  const t = useI18n();

  const validationSchema = useMarkAsSoldSchema();

  const methods = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = methods;

  const { data: productData } = useProducts({ limit: 1, offset: 0, enabled: open });

  const { data: productsData } = useProducts({ limit: productData?.total || 10, offset: 0, enabled: open });

  const productToMarkAsSold = useMemo(() => {
    return productsData?.resources.filter(product => selectedProductsIds.includes(product.id.toString()));
  }, [productsData, selectedProductsIds]);

  const { fields, remove } = useFieldArray({
    control: methods.control,
    name: 'products',
  });

  const { mutate, isPending } = useMarkProductsAsSold();

  const onSubmit = (values: FormValues) => {
    mutate(
      values.products.map(product => ({
        id: product.productId,
        soldDate: product.soldDate || new Date(),
        soldPrice: product.soldPrice,
        soldPlace: product.soldPlace || '',
      })),
      { onSuccess: onClose },
    );
  };

  useEffect(() => {
    if (open && selectedProductsIds?.length > 0) {
      methods.reset({
        products: selectedProductsIds.map(id => ({
          productId: Number(id),
          soldPrice: 0,
          soldPlace: '',
          soldDate: new Date(),
        })),
      });
    } else {
      methods.reset(defaultValues);
    }
  }, [open, selectedProductsIds]);

  return (
    <Dialog
      title={t('inventory.dialog.markAsSold.title')}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitButtonLoading={isPending}
      description={t('inventory.dialog.markAsSold.description')}
      isSubmitButtonDisabled={!isValid || !isDirty}
      confirmButtonText={t('common.button.submit')}
      scrollable>
      <FormProvider {...methods}>
        {fields.map((field, index) => {
          const product = productToMarkAsSold?.find(product => product.id === field.productId);

          return (
            <div key={field.id} className="flex flex-col gap-1">
              <p className="text-sm font-medium mb-2">
                {product?.name} - {product?.size}
              </p>
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
                      <FormLabel>{t('inventory.dialog.markAsSold.soldDate')}</FormLabel>
                      <FormControl>
                        <DatePicker value={new Date(field.value || new Date())} onChange={field.onChange} />
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
              {fields?.length - 1 !== index ? <Separator className="my-4" /> : null}
            </div>
          );
        })}
      </FormProvider>
    </Dialog>
  );
};

export default MarkProductsAsSoldDialog;
