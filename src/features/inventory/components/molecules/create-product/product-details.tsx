import { useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { FormControl, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { CreateProductEvent } from '@/features/inventory/utils/create-product-machine';
import { useCurrentLocale } from '@/locales/client';
import { useCategories } from '@/shared/hooks/query/use-categories';

import { CreateProductFormValues } from '../../organisms/create-product-sheet/create-product-sheet';

interface Props {
  send: (event: CreateProductEvent) => void;
}

const ProductDetails = ({ send }: Props) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductFormValues>();

  const currentLocale = useCurrentLocale();

  const { data: categoriesData } = useCategories();

  const categoryId = watch('categoryId');

  const name = watch('name');

  const sku = watch('sku');

  const nextButtonDisabled =
    !categoryId || !name || !sku || !!errors.name || !!errors.sku || !!errors.categoryId || !!errors.brand;

  return (
    <StepContent>
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 w-full">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="sku"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>SKU *</FormLabel>
                <FormControl>
                  <Input placeholder="Product sku" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 w-full">
          <div className="w-full">
            {errors?.name?.message ? <FormMessage>{errors?.name?.message}</FormMessage> : null}
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="flex flex-col gap-2 w-full">
                <FormLabel>Category *</FormLabel>
                <Select
                  value={value?.toString() || ''}
                  defaultValue={value?.toString() || ''}
                  onValueChange={e => {
                    onChange(e);
                    setValue('products', [], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                  }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    {categoriesData?.map(category => (
                      <SelectItem key={category.id} value={category.id?.toString()}>
                        {category?.translations?.[currentLocale] || category?.translations?.en || '-'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error?.message ? <FormMessage>{error?.message}</FormMessage> : null}
              </div>
            )}
          />
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" {...field} />
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

      <StepNavigatorButtons onNext={() => send({ type: 'NEXT' })} nextDisabled={nextButtonDisabled} />
    </StepContent>
  );
};

export default ProductDetails;
