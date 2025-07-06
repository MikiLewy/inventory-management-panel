import { useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { AutocompleteInput } from '@/components/molecules/autocomplete-input';
import { DatePicker } from '@/components/molecules/date-picker';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { FormControl, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { useCreateSale } from '@/features/sales/hooks/mutation/use-create-sale';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { CategoryEnum } from '@/shared/api/types/enum/category';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { useProductSuggestions } from '@/shared/hooks/query/use-product-suggestions';

import { CreateSaleFormValues } from '../../organisms/create-new-sale-sheet/create-new-sale-sheet';

interface Props {
  onClose: () => void;
}

const CreateSingleSale = ({ onClose }: Props) => {
  const t = useI18n();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateSaleFormValues>();

  const currentLocale = useCurrentLocale();

  const { data: categoriesData } = useCategories();

  const categoryId = watch('categoryId');

  const name = watch('name');

  const sku = watch('sku');

  const nextButtonDisabled =
    !categoryId || !name || !sku || !!errors.name || !!errors.sku || !!errors.categoryId || !!errors.brand;

  const { data: productSuggestions, isLoading } = useProductSuggestions({ search: name, enabled: !!name });

  const onAutocompleteValueSelect = (value: {
    imageUrl: string;
    title: string;
    brand: string;
    category: string;
    id: number;
    sku: string;
  }) => {
    const category = categoriesData?.find(category => category.type === (value.category as CategoryEnum));
    setValue('name', value.title, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('sku', value.sku, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('brand', value.brand, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('categoryId', category?.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('imageUrl', value.imageUrl, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { mutate: createSale, isPending } = useCreateSale();

  const onSubmit = (values: CreateSaleFormValues) => {
    createSale(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <StepContent>
      <div className="flex flex-col gap-8">
        {/* Product details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold mb-4">{t('createSale.singleSale.productDetails')}</h2>
            <FormField
              control={control}
              name="name"
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="w-full mb-3">
                    <FormControl>
                      <AutocompleteInput
                        {...field}
                        name={field.name}
                        label={t('createSale.name')}
                        required
                        placeholder={t('createSale.namePlaceholder')}
                        onSearchValueChange={field.onChange}
                        onSelectedValueChange={onAutocompleteValueSelect}
                        searchValue={field.value}
                        isLoading={isLoading}
                        isDirty={fieldState.isDirty}
                        errorMessage={t('validation.required')}
                        items={
                          productSuggestions?.resources?.map(product => ({
                            imageUrl: product?.image,
                            title: product?.title,
                            brand: product?.brand || '',
                            category: product?.category as string,
                            id: product?.id,
                            sku: product?.sku,
                          })) ?? []
                        }
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <div className="flex gap-4 w-full">
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
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                {errors?.size?.message ? <FormMessage>{errors?.size?.message}</FormMessage> : null}
              </div>
              <div className="w-full">
                {errors?.sku?.message ? <FormMessage>{errors?.sku?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
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
                {errors?.categoryId?.message ? <FormMessage>{errors?.categoryId?.message}</FormMessage> : null}
              </div>
              <div className="w-full">
                {errors?.brand?.message ? <FormMessage>{errors?.brand?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
        </div>
        {/* Purchase details */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold mb-4">{t('createSale.singleSale.purchaseDetails')}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
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
                  name="purchaseDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <DatePicker
                            label={t('createSale.purchaseDate')}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
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
            <div className="flex flex-col gap-1 w-1/2">
              <FormField
                control={control}
                name="purchasePlace"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createSale.purchasePlace')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('createProduct.steps.sizeAndPrice.purchasePlacePlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex w-1/2">
                {errors?.purchasePlace?.message ? <FormMessage>{errors?.purchasePlace?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
        </div>
        {/* Sold details */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold mb-4">{t('createSale.singleSale.soldDetails')}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
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
                <FormField
                  control={control}
                  name="soldDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <DatePicker label={t('createSale.soldDate')} value={field.value} onChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  {errors?.soldPrice?.message ? <FormMessage>{errors?.soldPrice?.message}</FormMessage> : null}
                </div>
                <div className="w-full">
                  {errors?.soldDate?.message ? <FormMessage>{errors?.soldDate?.message}</FormMessage> : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-1/2">
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
              <div className="flex w-1/2">
                {errors?.soldPlace?.message ? <FormMessage>{errors?.soldPlace?.message}</FormMessage> : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepNavigatorButtons
        onNext={handleSubmit(onSubmit)}
        nextIsSubmitting={isPending}
        onNextTitle={t('common.button.submit')}
        nextDisabled={nextButtonDisabled}
      />
    </StepContent>
  );
};

export default CreateSingleSale;
