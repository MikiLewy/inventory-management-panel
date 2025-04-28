import Page from '@/components/organisms/page/page';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import ClientInventory from './inventory.client';

const ServerInventory = async () => {
  return (
    <Page>
      <Page.Header title="Inventory" />
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[]}>
          <ClientInventory />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerInventory;
