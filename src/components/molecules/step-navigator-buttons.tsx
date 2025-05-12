import { FC } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from '@/locales/client';

import { LoadingButton } from '../atoms/loading-button';
import { Button } from '../ui/button';

interface Props {
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextIsSubmitting?: boolean;
  backDisabled?: boolean;
  onNextTitle?: string;
  nextTooltipText?: string;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
}

export const StepNavigatorButtons: FC<Props> = ({
  onNext,
  onBack = null,
  nextDisabled = false,
  backDisabled = false,
  onNextTitle = null,
  nextTooltipText,
  nextIsSubmitting,
  buttonSize = 'default',
}) => {
  const t = useI18n();

  return (
    <div className="flex justify-end gap-2 mt-auto mb-6">
      {onBack ? (
        <Button
          color="primary"
          onClick={onBack}
          type="button"
          size={buttonSize}
          disabled={backDisabled}
          variant="ghost">
          {t('common.button.previousStep')}
        </Button>
      ) : null}
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <LoadingButton
                color="primary"
                size={buttonSize}
                type="button"
                disabled={nextDisabled}
                loading={nextIsSubmitting || false}
                onClick={onNext}
                variant="default">
                {onNextTitle ? onNextTitle : t('common.button.nextStep')}
              </LoadingButton>
            </span>
          </TooltipTrigger>
          {nextTooltipText ? (
            <TooltipContent side="right" className="flex items-center gap-4">
              {nextTooltipText}
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
