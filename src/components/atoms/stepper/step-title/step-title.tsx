'use client';

import { twMerge } from 'tailwind-merge';

import { useI18n } from '@/locales/client';

interface Props {
  step: string;
  title: string;
  isInactive?: boolean;
}

const StepTitle = ({ step, title, isInactive }: Props) => {
  const t = useI18n();

  const mergedStepClassName = twMerge(`text-md`, isInactive ? 'text-black/60 dark:text-white/60' : '');

  const mergedTitleClassName = twMerge(
    `text-sm text-black/70 dark:text-white/70`,
    isInactive ? 'text-black/60 dark:text-white/60' : '',
  );

  return (
    <div className="flex flex-col gap-1">
      <h4 className={mergedStepClassName}>
        {t('common.step', {
          step,
        })}
      </h4>
      {title ? <p className={mergedTitleClassName}>{title}</p> : null}
    </div>
  );
};

export default StepTitle;
