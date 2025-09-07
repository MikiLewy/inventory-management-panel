import Page from '@/components/organisms/page/page';
import { prefetchProducts } from '@/features/inventory/api/lib/products.prefetch';
import { prefetchWarehouses } from '@/features/warehouse/api/lib/warehouse.prefetch';
import { getI18n } from '@/locales/server';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';
import { prefetchCategories } from '@/shared/api/lib/categories.prefetch';

import InventoryPageHeaderActions from '../../organisms/inventory-page-header-actions';

import ClientInventory from './inventory.client';

const ServerInventory = async () => {
  const t = await getI18n();

  return (
    <Page>
      <Page.Header title={t('inventory.title')}>
        <InventoryPageHeaderActions />
      </Page.Header>
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[prefetchCategories, prefetchProducts, prefetchWarehouses]}>
          <ClientInventory />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerInventory;
