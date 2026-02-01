'use client';

import { useI18n } from '@/locales/client';

import { ImportError } from '../../../../../types/payload/import-products';

interface Props {
  errors: ImportError[];
  maxDisplay?: number;
}

export const ImportErrorsTable = ({ errors, maxDisplay = 10 }: Props) => {
  const t = useI18n();

  const displayedErrors = errors.slice(0, maxDisplay);
  const remainingCount = errors.length - maxDisplay;

  if (errors.length === 0) return null;

  return (
    <div className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-4">
      <h4 className="mb-2 font-medium text-destructive">{t('importProducts.errors.title')}</h4>
      <div className="max-h-48 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-destructive/20">
              <th className="py-1 pr-4 text-left font-medium">{t('importProducts.errors.row')}</th>
              <th className="py-1 text-left font-medium">{t('importProducts.errors.message')}</th>
            </tr>
          </thead>
          <tbody>
            {displayedErrors.map((error, index) => (
              <tr key={index} className="border-b border-destructive/10 last:border-0">
                <td className="py-1 pr-4 text-muted-foreground">{error.row}</td>
                <td className="py-1 text-destructive">{error.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {remainingCount > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {t('importProducts.errors.moreErrors', { count: remainingCount })}
          </p>
        )}
      </div>
    </div>
  );
};
