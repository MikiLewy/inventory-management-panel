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
import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { productStatusTranslations } from '@/features/inventory/constants/product-status';
import { useEditProduct } from '@/features/inventory/hooks/mutation/use-update-product';
import { useProduct } from '@/features/inventory/hooks/query/use-product';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { SizeUnit } from '@/types/enum/size-unit';

import { useEditProductSchema } from './schema/edit-product-schema';

export interface FormValues {
  name: string;
  sku: string;
  status: ProductStatus;
  categoryId: number | undefined;
  sizeUnit: SizeUnit;
  brand?: string | undefined;
  imageUrl?: string | undefined;
  size: string;
  purchasePrice: number;
  purchasePlace?: string | undefined;
  purchaseDate?: Date | undefined;
}

const defaultValues: FormValues = {
  name: '',
  sku: '',
  status: ProductStatus.IN_STOCK,
  brand: undefined,
  categoryId: undefined,
  sizeUnit: SizeUnit.EU,
  imageUrl: undefined,
  size: '',
  purchasePrice: 0,
  purchasePlace: undefined,
  purchaseDate: undefined,
};

interface Props {
  open: boolean;
  onClose: () => void;
  selectedProductId: number;
}

export function EditProductSheet({ open, onClose, selectedProductId }: Props) {
  const t = useI18n();

  const currentLocale = useCurrentLocale();

  const validationSchema = useEditProductSchema();

  const { data: productData } = useProduct({ id: selectedProductId || 0, enabled: !!selectedProductId });

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
      if (productData) {
        form.reset(
          {
            ...productData,
            brand: productData.brand || '',
            sizeUnit: productData.sizeUnit as SizeUnit,
            size: productData.size,
            purchasePrice: productData.purchasePrice,
            purchasePlace: productData.purchasePlace,
            purchaseDate: new Date(productData.purchaseDate),
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
  }, [open, productData]);

  const { mutate: updateProduct, isPending } = useEditProduct();

  const onSubmit = (values: FormValues) => {
    updateProduct(
      {
        id: selectedProductId,
        payload: {
          ...values,
          status: values.status as ProductStatus,
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
          <SheetTitle>{selectedProductId ? t('createProduct.editTitle') : t('createProduct.title')}</SheetTitle>
          <SheetDescription>{t('createProduct.editDescription')}</SheetDescription>
        </SheetHeader>
        <div className="mx-4 flex flex-col gap-4 grow">
          <FormProvider {...form}>
            <div className="flex flex-col gap-1">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full mb-3">
                    <FormLabel>{t('createProduct.steps.productDetails.name')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('createProduct.steps.productDetails.namePlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-4 w-full">
                <FormField
                  name="categoryId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2 w-full">
                      <FormLabel>{t('createProduct.steps.productDetails.category')} *</FormLabel>
                      <Select
                        value={value?.toString() || ''}
                        defaultValue={value?.toString() || ''}
                        onValueChange={e => {
                          onChange(e);
                        }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('createProduct.steps.productDetails.categoryPlaceholder')} />
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
                <FormField
                  control={control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('createProduct.steps.productDetails.sku')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('createProduct.steps.productDetails.skuPlaceholder')} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  {errors?.categoryId?.message ? <FormMessage>{errors?.categoryId?.message}</FormMessage> : null}
                </div>
                <div className="w-full">
                  {errors?.sku?.message ? <FormMessage>{errors?.sku?.message}</FormMessage> : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
                <FormField
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2 w-full">
                      <FormLabel>{t('createProduct.steps.productDetails.status')} *</FormLabel>
                      <Select
                        value={value?.toString() || ''}
                        defaultValue={value?.toString() || ''}
                        onValueChange={e => {
                          onChange(e);
                        }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('createProduct.steps.productDetails.statusPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          {Object.values(ProductStatus).map(status => (
                            <SelectItem key={status} value={status}>
                              {t(productStatusTranslations[status])}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <FormField
                  control={control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('createProduct.steps.productDetails.brand')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('createProduct.steps.productDetails.brandPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  {errors?.status?.message ? <FormMessage>{errors?.status?.message}</FormMessage> : null}
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
                  name="size"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('createProduct.steps.sizeAndPrice.size')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('createProduct.steps.sizeAndPrice.sizePlaceholder')} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('createProduct.steps.sizeAndPrice.price')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('createProduct.steps.sizeAndPrice.pricePlaceholder')} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  {errors?.purchasePrice?.message ? <FormMessage>{errors?.purchasePrice?.message}</FormMessage> : null}
                </div>
                <div className="w-full">
                  {errors?.purchaseDate?.message ? <FormMessage>{errors?.purchaseDate?.message}</FormMessage> : null}
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
                      <FormLabel>{t('createProduct.steps.sizeAndPrice.purchasePlace')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('createProduct.steps.sizeAndPrice.purchasePlacePlaceholder')}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t('createProduct.steps.sizeAndPrice.purchaseDate')}</FormLabel>
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
                  {errors?.purchasePrice?.message ? <FormMessage>{errors?.purchasePrice?.message}</FormMessage> : null}
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
