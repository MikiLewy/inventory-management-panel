import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { LoadingButton } from '@/components/atoms/loading-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormControl, FormMessage, FormLabel, FormItem, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateWarehouse } from '@/features/warehouse/hooks/mutation/use-create-warehouse';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';

import { DialogActions } from '../../dialog';

import { useOnboardingSchema } from './schema/onboarding-schema';

const defaultValues = {
  name: '',
  address: '',
  postCode: '',
  city: '',
  country: '',
};

const OnboardingDialog = ({ open, onClose }: DialogActions) => {
  const t = useI18n();

  const validationSchema = useOnboardingSchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const {
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form]);

  const { mutate, isPending } = useCreateWarehouse();

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    mutate(values, {
      onSuccess: () => {
        onClose?.();
      },
    });
  };

  const name = form.watch('name');

  const isSubmitButtonDisabled = !name || !!errors.name;

  return (
    <Dialog open={open} defaultOpen={open} modal>
      <DialogContent hideCloseButton className={cn('overflow-y-auto max-h-[550px] sm:max-h-[700px]', 'lg:max-w-2xl ')}>
        <DialogHeader>
          <DialogTitle>{t('warehouse.dialog.add.title')}</DialogTitle>
          <DialogDescription>{t('common.onboarding.addWarehouseDescription')}</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
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
          <DialogFooter>
            <LoadingButton onClick={form.handleSubmit(onSubmit)} loading={isPending} disabled={isSubmitButtonDisabled}>
              {t('common.onboarding.addWarehouseButton')}
            </LoadingButton>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
