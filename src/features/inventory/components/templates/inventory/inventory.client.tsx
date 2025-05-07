'use client';

import { useProducts } from '@/features/inventory/hooks/query/use-products';
import { useCategories } from '@/shared/hooks/query/use-categories';

import { InventoryTable } from '../../organisms/inventory-table';

const ClientInventory = () => {
  const { data } = useCategories();

  const { data: productsData } = useProducts({ page: 1, perPage: 10 });

  return (
    <div>
      <InventoryTable columns={[]} data={[]} />
    </div>
  );
};

export default ClientInventory;
