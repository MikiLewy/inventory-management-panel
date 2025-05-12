import { Plus, Trash } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { DatePicker } from '@/components/molecules/date-picker';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { Button } from '@/components/ui/button';
import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { FormControl, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { getSizesByCategories, sizeUnits } from '@/constants/sizes';
import { useCreateProduct } from '@/features/inventory/hooks/mutation/use-create-product';
import { CreateProductEvent } from '@/features/inventory/utils/create-product-machine';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';
import { CategoryEnum } from '@/shared/api/types/enum/category';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { SizeUnit } from '@/types/enum/size-unit';

import { CreateProductFormValues } from '../../organisms/create-product-sheet/create-product-sheet';

interface Props {
  send: (event: CreateProductEvent) => void;
  onClose: () => void;
}

const SizeAndPrice = ({ send, onClose }: Props) => {
  const t = useI18n();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useFormContext<CreateProductFormValues>();

  const sizeUnit = watch('sizeUnit');

  const categoryId = watch('categoryId');

  const { data: categories } = useCategories();

  const category = categories?.find(category => category.id === Number(categoryId));

  const euSizingType = watch('euSizingType');

  const products = watch('products');

  const sizes = getSizesByCategories(category?.type || CategoryEnum.SNEAKERS, euSizingType);

  const sizesByUnit = sizes[sizeUnit];

  const isSneakers = category?.type === CategoryEnum.SNEAKERS;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = (values: CreateProductFormValues) => {
    createProduct(
      {
        categoryId: values.categoryId ?? 0,
        name: values.name,
        sku: values.sku,
        products: values.products,
        status: values.status,
        sizeUnit: values.sizeUnit,
        brand: values.brand,
        imageUrl: values.imageUrl,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const nextDisabled = !isValid || !isDirty || products.length === 0;

  return (
    <StepContent>
      {isSneakers ? (
        <FormField
          name="sizeUnit"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="flex flex-col gap-2 w-full">
              <FormLabel>{t('createProduct.steps.sizeAndPrice.sizeUnit')} *</FormLabel>
              <Select
                value={value?.toString() || ''}
                defaultValue={value?.toString() || ''}
                onValueChange={e => {
                  onChange(e);
                  remove();
                }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('createProduct.steps.sizeAndPrice.sizeUnitPlaceholder')} />
                </SelectTrigger>
                <SelectContent side="bottom">
                  {sizeUnits.map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error?.message ? <FormMessage>{error?.message}</FormMessage> : null}
            </div>
          )}
        />
      ) : null}
      <Tabs defaultValue="standard">
        {isSneakers && sizeUnit === SizeUnit.EU ? (
          <TabsList className="w-[400px] mb-2">
            <TabsTrigger value="standard" onClick={() => setValue('euSizingType', 'standard')}>
              {t('createProduct.steps.sizeAndPrice.standard')}
            </TabsTrigger>
            <TabsTrigger value="adidas" onClick={() => setValue('euSizingType', 'adidas')}>
              {t('createProduct.steps.sizeAndPrice.adidas')}
            </TabsTrigger>
          </TabsList>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {sizesByUnit.map(size => {
            const isSizeInProducts = fields.some(field => field.size === size);

            return (
              <Button
                key={size}
                size="default"
                onClick={() => {
                  if (isSizeInProducts) {
                    remove(fields.findIndex(field => field.size === size));
                  } else {
                    append({ size, purchasePlace: '', purchaseDate: new Date(), purchasePrice: 0, quantity: 1 });
                  }
                }}
                className={cn(
                  isSizeInProducts ? 'bg-green-200 border-green-500 dark:bg-green-900 dark:border-green-600' : '',
                  'font-normal',
                  isSneakers ? 'w-14' : '',
                )}
                variant="outline">
                {size}
              </Button>
            );
          })}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    size="default"
                    onClick={() => {
                      append({
                        size: '',
                        purchasePlace: '',
                        purchaseDate: new Date(),
                        purchasePrice: 0,
                        quantity: 1,
                      });
                    }}
                    className={cn('font-normal', isSneakers ? 'w-14' : '')}
                    variant="secondary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t('createProduct.steps.sizeAndPrice.addCustomSize')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Tabs>
      <ScrollArea className={cn('max-h-[600px]', isSneakers ? 'max-h-[400px]' : '')}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1 mt-6">
            <div className="flex items-end gap-2 w-full">
              <FormField
                control={control}
                name={`products.${index}.size`}
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
                name={`products.${index}.purchasePrice`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createProduct.steps.sizeAndPrice.price')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('createProduct.steps.sizeAndPrice.pricePlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`products.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createProduct.steps.sizeAndPrice.quantity')} *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder={t('createProduct.steps.sizeAndPrice.quantityPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`products.${index}.purchasePlace`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createProduct.steps.sizeAndPrice.purchasePlace')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('createProduct.steps.sizeAndPrice.purchasePlacePlaceholder')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`products.${index}.purchaseDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('createProduct.steps.sizeAndPrice.purchaseDate')}</FormLabel>
                    <FormControl>
                      <DatePicker value={new Date(field.value || new Date())} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="default" variant="ghost" onClick={() => remove(index)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                {errors?.products?.[index]?.size?.message ? (
                  <FormMessage>{errors?.products?.[index]?.size?.message}</FormMessage>
                ) : null}
              </div>
              <div className="w-full">
                {errors?.products?.[index]?.purchasePrice?.message ? (
                  <FormMessage>{errors?.products?.[index]?.purchasePrice?.message}</FormMessage>
                ) : null}
              </div>
              <div className="w-full">
                {errors?.products?.[index]?.quantity?.message ? (
                  <FormMessage>{errors?.products?.[index]?.quantity?.message}</FormMessage>
                ) : null}
              </div>
              <div className="w-full">
                {errors?.products?.[index]?.purchasePlace?.message ? (
                  <FormMessage>{errors?.products?.[index]?.purchasePlace?.message}</FormMessage>
                ) : null}
              </div>
              <div className="w-full">
                {errors?.products?.[index]?.purchaseDate?.message ? (
                  <FormMessage>{errors?.products?.[index]?.purchaseDate?.message}</FormMessage>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <StepNavigatorButtons
        onNextTitle="Confirm"
        nextDisabled={nextDisabled}
        nextIsSubmitting={isPending}
        onNext={handleSubmit(onSubmit)}
        onBack={() => send({ type: 'BACK' })}
      />
    </StepContent>
  );
};

export default SizeAndPrice;
