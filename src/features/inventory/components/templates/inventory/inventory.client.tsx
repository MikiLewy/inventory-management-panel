'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Product } from '@/features/inventory/api/types/products';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import { useCurrentLocale } from '@/locales/client';
import { useCategories } from '@/shared/hooks/query/use-categories';

import { InventoryTable } from '../../organisms/inventory-table';

const ClientInventory = () => {
  const currentLocale = useCurrentLocale();

  const { data } = useCategories();

  const { data: productsData } = useProducts({ page: 1, perPage: 10 });

  const columns: ColumnDef<Product>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'SKU',
      accessorKey: 'sku',
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => {
        const category = data?.find(category => category.id === row.original.categoryId);

        return category?.translations[currentLocale];
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;

        return status;
      },
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
    },
  ];

  return (
    <div>
      <InventoryTable columns={columns} data={productsData || []} />
    </div>
  );
};

export default ClientInventory;
