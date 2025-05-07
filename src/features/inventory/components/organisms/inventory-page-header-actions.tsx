'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/locales/client';

export function InventoryPageHeaderActions() {
  const t = useI18n();

  return (
    <>
      <Button>
        <PlusIcon className="w-4 h-4" />
        {t('inventory.add')}
      </Button>
    </>
  );
}
