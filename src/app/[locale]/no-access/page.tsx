'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/api/actions/auth';
import { useI18n } from '@/locales/client';

const NoAccess = () => {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen bg-background-primary">
      <h1 className="text-primary font-medium text-2xl">{t('auth.login.noAccessToPanelError')}</h1>
      <Button
        onClick={async () => {
          await logout();
        }}
        size="lg">
        {t('common.logout')}
      </Button>
    </div>
  );
};

export default NoAccess;
