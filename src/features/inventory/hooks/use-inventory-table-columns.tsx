import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Badge } from '@/components/ui/badge';
import { dateFormats } from '@/constants/date-formats';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { CategoryEnum } from '@/shared/api/types/enum/category';
import { Language } from '@/types/enum/language';
import { SizeUnit } from '@/types/enum/size-unit';

import { ProductStatus } from '../api/types/enum/product-status';
import { Product } from '../api/types/products';
import { productStatusTranslations } from '../constants/product-status';

export interface InventoryActionSlotPayload {
  id: number;
}

export const useInventoryTableColumns = (actionsSlot: (payload: InventoryActionSlotPayload) => ReactNode) => {
  const t = useI18n();

  const currentLocale = useCurrentLocale();

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      meta: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.name')} />;
      },
      cell: ({ getValue, row }) => {
        const imageUrl = row.original.imageUrl;

        return (
          <div className="flex items-center gap-4">
            <Image
              src={imageUrl}
              alt={''}
              width={200}
              height={200}
              className="rounded-md object-cover min-w-10 min-h-10 max-w-10 max-h-10"
            />
            <p>{(getValue() as string) || '-'}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'size',
      meta: 'size',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.size')} />;
      },
      cell: ({ row }) => {
        const size = row.original.size;
        const sizeUnit = row.original.sizeUnit;
        const category = row.original.category;

        return (
          <p>
            {category.type === CategoryEnum.SNEAKERS && sizeUnit !== SizeUnit.EU ? (
              <span className="mr-0.5">{sizeUnit}</span>
            ) : null}
            {size}
          </p>
        );
      },
    },
    {
      accessorKey: 'sku',
      meta: 'sku',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.sku')} />;
      },
    },
    {
      accessorKey: 'category',
      meta: 'category',
      enableHiding: false,
      filterFn: (rows, columnId, filterValue) => {
        const category = rows.getValue(columnId) as { id: string; name: string; type: CategoryEnum };

        return filterValue.includes(category.type.toString());
      },
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.category')} />;
      },
      cell: ({ cell }) => {
        const category = cell.getValue() as { id: string; translations: Record<Language, string>; type: CategoryEnum };

        return <p>{category.translations?.[currentLocale] || '-'}</p>;
      },
    },
    {
      accessorKey: 'status',
      meta: 'status',
      enableHiding: false,
      filterFn: (rows, columnId, filterValue) => {
        const status = rows.getValue(columnId) as ProductStatus;

        return filterValue.includes(status.toString());
      },
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.status')} />;
      },
      cell: ({ cell }) => {
        const status = cell.getValue() as ProductStatus;

        return (
          <Badge variant={status === ProductStatus.IN_STOCK ? 'success' : 'warning'} className="capitalize">
            {t(productStatusTranslations[status])}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'brand',
      meta: 'brand',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.brand')} />;
      },
      cell: ({ getValue }) => {
        return <p>{(getValue() as string) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchasePrice',
      meta: 'purchasePrice',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchasePrice')} />;
      },
      cell: ({ getValue }) => {
        return <p>{(getValue() as number) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchasePlace',
      meta: 'purchasePlace',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchasePlace')} />;
      },
      cell: ({ getValue }) => {
        return <p>{(getValue() as string) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchaseDate',
      meta: 'purchaseDate',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchaseDate')} />;
      },
      cell: ({ getValue }) => {
        return getValue() ? (
          <FormatDate
            date={new Date(getValue() as string)}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'createdAt',
      meta: 'createdAt',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.createdAt')} />;
      },
      cell: ({ getValue }) => {
        return getValue() ? (
          <FormatDate
            date={new Date(getValue() as string)}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return actionsSlot({
          id: product.id,
        });
      },
    },
  ];

  return columns;
};
