import Page from '@/components/organisms/page/page';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import InventoryPageHeaderActions from '../../organisms/inventory-page-header-actions';

import ClientInventory from './inventory.client';

const ServerInventory = async () => {
  return (
    <Page>
      <Page.Header title="Inventory">
        <InventoryPageHeaderActions />
      </Page.Header>
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[]}>
          <ClientInventory />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerInventory;
