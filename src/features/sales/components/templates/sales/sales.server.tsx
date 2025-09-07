import Page from '@/components/organisms/page/page';
import { prefetchProducts } from '@/features/inventory/api/lib/products.prefetch';
import { prefetchSales } from '@/features/sales/api/lib/sales.prefetch';
import { prefetchWarehouses } from '@/features/warehouse/api/lib/warehouse.prefetch';
import { getI18n } from '@/locales/server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';
import { prefetchCategories } from '@/shared/api/lib/categories.prefetch';

import SalesPageHeaderActions from '../../organisms/sales-page-header-actions';

import ClientSales from './sales.client';

const ServerSales = async () => {
  const t = await getI18n();

  return (
    <Page>
      <Page.Header title={t('sales.title')}>
        <SalesPageHeaderActions />
      </Page.Header>
      <Page.ContentContainer>
        <HydrationBoundaryProvider
          prefetchDataFunctions={[prefetchSales, prefetchProducts, prefetchCategories, prefetchWarehouses]}>
          <ClientSales />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerSales;
