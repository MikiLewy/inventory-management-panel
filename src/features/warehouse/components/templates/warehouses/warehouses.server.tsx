import Page from '@/components/organisms/page/page';
import { getI18n } from '@/locales/server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import { prefetchWarehouses } from '../../../api/lib/warehouse.prefetch';
import WarehousesPageHeaderActions from '../../organisms/warehouses-page-header-actions';

import ClientWarehouses from './warehouses.client';

async function ServerWarehouses() {
  const t = await getI18n();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">{t('warehouse.title')}</h3>
        <WarehousesPageHeaderActions />
      </div>
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[prefetchWarehouses]}>
          <ClientWarehouses />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </div>
  );
}

export default ServerWarehouses;
