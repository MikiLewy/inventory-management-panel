'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoadingButton } from '@/components/atoms/loading-button';
import { DatePicker } from '@/components/molecules/date-picker';
import { FormControl, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUpdateSale } from '@/features/sales/hooks/mutation/use-update-sale';
import { useSale } from '@/features/sales/hooks/query/use-sale';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { SizeUnit } from '@/types/enum/size-unit';

import { useEditSalesSchema } from './schema/edit-sales-schema';

export interface FormValues {
  name: string;
  sku: string;
  categoryId: number | undefined;
  sizeUnit: SizeUnit;
  brand?: string | undefined;
  imageUrl?: string | undefined;
  size: string;
  purchasePrice: number;
  purchasePlace?: string | undefined;
  purchaseDate?: Date | undefined;
  soldDate?: Date | undefined;
  soldPrice: number;
  soldPlace?: string | undefined;
}

const defaultValues: FormValues = {
  name: '',
  sku: '',
  brand: undefined,
  categoryId: undefined,
  sizeUnit: SizeUnit.EU,
  imageUrl: undefined,
  size: '',
  purchasePrice: 0,
  purchasePlace: undefined,
  purchaseDate: undefined,
  soldDate: undefined,
  soldPrice: 0,
  soldPlace: undefined,
};

interface Props {
  open: boolean;
  onClose: () => void;
  selectedSaleId: number;
}

export function EditSaleSheet({ open, onClose, selectedSaleId }: Props) {
  const t = useI18n();

  const currentLocale = useCurrentLocale();

  const validationSchema = useEditSalesSchema();

  const { data: saleData } = useSale({ id: selectedSaleId || 0, enabled: !!selectedSaleId });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    control,
    formState: { errors },
  } = form;

  const { data: categoriesData } = useCategories();

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues, {
        keepDirty: false,
        keepErrors: false,
        keepIsValid: false,
        keepTouched: false,
      });
    } else {
      if (saleData) {
        form.reset(
          {
            ...saleData,
            sizeUnit: saleData.sizeUnit as SizeUnit,
            purchaseDate: new Date(saleData.purchaseDate),
            soldDate: new Date(saleData.soldDate),
          },
          {
            keepDirty: false,
            keepErrors: false,
            keepIsValid: false,
            keepTouched: false,
          },
        );
      }
    }
  }, [open, saleData]);

  const { mutate: updateSale, isPending } = useUpdateSale();

  const onSubmit = (values: FormValues) => {
    updateSale(
      {
        id: selectedSaleId,
        payload: {
          ...values,
          categoryId: values.categoryId || 0,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        if (open) {
          onClose();
        }
      }}>
      <SheetContent className="min-w-4xl flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('createSale.editTitle')}</SheetTitle>
          <SheetDescription>{t('createSale.editDescription')}</SheetDescription>
        </SheetHeader>
        <div className="mx-4 flex flex-col gap-4 grow">
          <FormProvider {...form}>
            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createSale.name')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('createSale.namePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-4 w-full">
                  <FormField
                    control={control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.sku')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('createSale.skuPlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="categoryId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="flex flex-col gap-2 w-full">
                        <FormLabel>{t('createSale.category')} *</FormLabel>
                        <Select
                          value={value?.toString() || ''}
                          defaultValue={value?.toString() || ''}
                          onValueChange={e => {
                            onChange(e);
                          }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('createSale.categoryPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent side="bottom">
                            {categoriesData?.map(category => (
                              <SelectItem key={category.id} value={category.id?.toString()}>
                                {category?.translations?.[currentLocale] || category?.translations?.en || '-'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    {errors?.sku?.message ? <FormMessage>{errors?.sku?.message}</FormMessage> : null}
                  </div>
                  <div className="w-full">
                    {errors?.categoryId?.message ? <FormMessage>{errors?.categoryId?.message}</FormMessage> : null}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-4">
                  <FormField
                    control={control}
                    name="size"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.size')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('createSale.sizePlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.brand')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('createSale.brandPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    {errors?.size?.message ? <FormMessage>{errors?.size?.message}</FormMessage> : null}
                  </div>
                  <div className="w-full">
                    {errors?.brand?.message ? <FormMessage>{errors?.brand?.message}</FormMessage> : null}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-4 w-full">
                  <FormField
                    control={control}
                    name="purchasePlace"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.purchasePlace')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('createSale.purchasePlacePlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="purchaseDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.purchaseDate')}</FormLabel>
                        <FormControl>
                          <DatePicker value={new Date(field.value || new Date())} onChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    {errors?.purchaseDate?.message ? <FormMessage>{errors?.purchaseDate?.message}</FormMessage> : null}
                  </div>
                  <div className="w-full">
                    {errors?.purchasePrice?.message ? (
                      <FormMessage>{errors?.purchasePrice?.message}</FormMessage>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-4 w-full">
                  <FormField
                    control={control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.purchasePrice')} *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={t('createSale.purchasePricePlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="soldPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.soldPrice')} *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={t('createSale.soldPricePlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    {errors?.purchasePrice?.message ? (
                      <FormMessage>{errors?.purchasePrice?.message}</FormMessage>
                    ) : null}
                  </div>
                  <div className="w-full">
                    {errors?.soldPrice?.message ? <FormMessage>{errors?.soldPrice?.message}</FormMessage> : null}
                  </div>
                </div>
              </div>

              {/* <Separator className="my-2" /> */}

              <div className="flex flex-col gap-1">
                <div className="flex gap-4 w-full">
                  <FormField
                    control={control}
                    name="soldPlace"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.soldPlace')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('createSale.soldPlacePlaceholder')} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="soldDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('createSale.soldDate')}</FormLabel>
                        <FormControl>
                          <DatePicker value={new Date(field.value || new Date())} onChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    {errors?.soldPlace?.message ? <FormMessage>{errors?.soldPlace?.message}</FormMessage> : null}
                  </div>
                  <div className="w-full">
                    {errors?.soldDate?.message ? <FormMessage>{errors?.soldDate?.message}</FormMessage> : null}
                  </div>
                </div>
              </div>
            </div>
          </FormProvider>
        </div>
        <div className="flex justify-end gap-2 mt-auto mb-6 mx-4">
          <LoadingButton
            color="primary"
            type="button"
            disabled={!form.formState.isDirty || !form.formState.isValid}
            loading={isPending}
            onClick={form.handleSubmit(onSubmit)}
            variant="default">
            {t('common.button.edit')}
          </LoadingButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
