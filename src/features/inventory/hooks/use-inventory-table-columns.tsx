import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { dateFormats } from '@/constants/date-formats';
import { useFormatPrice } from '@/hooks/use-format-price';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { CategoryEnum } from '@/shared/api/types/enum/category';
import { Language } from '@/types/enum/language';
import { SizeUnit } from '@/types/enum/size-unit';

import { ProductStatus } from '../api/types/enum/product-status';
import { Product } from '../api/types/products';
import { productStatusTranslations } from '../constants/product-status';

export interface InventoryActionSlotPayload {
  id: number;
  name: string;
}

export const useInventoryTableColumns = (actionsSlot: (payload: InventoryActionSlotPayload) => ReactNode) => {
  const t = useI18n();

  const { formatPrice } = useFormatPrice();

  const currentLocale = useCurrentLocale();

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
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.name')} />;
      },
      cell: ({ row }) => {
        const name = row.original.name;
        const imageUrl = row.original.imageUrl;

        return (
          <div className="flex items-center gap-4 overflow-hidden">
            <Image
              src={imageUrl}
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
      meta: t('inventory.table.sku'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.sku')} />;
      },
    },
    {
      accessorKey: 'category',
      meta: t('inventory.table.category'),
      enableSorting: false,
      enableHiding: true,
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
      meta: t('inventory.table.status'),
      enableHiding: false,
      enableSorting: false,
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
      meta: t('inventory.table.brand'),
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.brand')} />;
      },
      cell: ({ getValue }) => {
        return <p>{(getValue() as string) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchase_price',
      meta: t('inventory.table.purchasePrice'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchasePrice')} />;
      },
      cell: ({ row }) => {
        const purchasePrice = row.original.purchasePrice;

        return <p>{formatPrice(purchasePrice) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchase_place',
      meta: t('inventory.table.purchasePlace'),
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchasePlace')} />;
      },
      cell: ({ row }) => {
        const purchasePlace = row.original.purchasePlace;

        return <p>{purchasePlace || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchase_date',
      meta: t('inventory.table.purchaseDate'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.purchaseDate')} />;
      },
      cell: ({ row }) => {
        const purchaseDate = row.original.purchaseDate;

        return purchaseDate ? (
          <FormatDate
            date={new Date(purchaseDate)}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'created_at',
      meta: t('inventory.table.createdAt'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.createdAt')} />;
      },
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;

        return createdAt ? (
          <FormatDate
            date={new Date(createdAt)}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'updated_at',
      meta: t('inventory.table.updatedAt'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('inventory.table.updatedAt')} />;
      },
      cell: ({ row }) => {
        const updatedAt = row.original.updatedAt;

        return updatedAt ? (
          <FormatDate
            date={new Date(updatedAt)}
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
          name: product.name,
        });
      },
    },
  ];

  return columns;
};
