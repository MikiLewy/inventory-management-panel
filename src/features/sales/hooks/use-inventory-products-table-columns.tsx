import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/features/inventory/api/types/products';
import { useI18n } from '@/locales/client';
import { CategoryType } from '@/server/db/types/enum/category-type';
import { SizeUnit } from '@/types/enum/size-unit';

export const useInventoryProductsTableColumns = () => {
  const t = useI18n();

  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      meta: t('inventory.table.name'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.name')} />;
      },
      cell: ({ row }) => {
        const name = row.original.name;
        const imageUrl = row.original.imageUrl;

        return (
          <div className="flex items-center gap-4 overflow-hidden">
            <Image
              src={imageUrl || ''}
              alt={name}
              height={120}
              width={120}
              className="rounded-md border object-contain object-center bg-white min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px]"
            />
            <p>{name || '-'}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'size',
      meta: t('inventory.table.size'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.size')} />;
      },
      cell: ({ row }) => {
        const size = row.original.size;
        const sizeUnit = row.original.sizeUnit;
        const category = row.original.category;

        return (
          <p>
            {category?.type === CategoryType.SNEAKERS && sizeUnit !== SizeUnit.EU ? (
              <span className="mr-0.5">{sizeUnit}</span>
            ) : null}
            {size}
          </p>
        );
      },
    },
    {
      accessorKey: 'sku',
      meta: t('inventory.table.sku'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.sku')} />;
      },
    },
  ];

  return columns;
};
