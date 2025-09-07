import Page from '@/components/organisms/page/page';
import { Warehouses } from '@/features/warehouse/index.server';
import { getI18n } from '@/locales/server';

export default async function SettingsPage() {
  const t = await getI18n();

  return (
    <Page>
      <Page.Header title={t('routes.settings')} />
      <Warehouses />
    </Page>
  );
}
