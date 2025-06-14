import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { dateFormats } from '@/constants/date-formats';
import { useFormatPrice } from '@/hooks/use-format-price';
import { cn } from '@/lib/utils';
import { useCurrentLocale, useI18n } from '@/locales/client';
import { CategoryEnum } from '@/shared/api/types/enum/category';
import { Language } from '@/types/enum/language';
import { SizeUnit } from '@/types/enum/size-unit';

import { Sale } from '../api/types/sales';

export interface SalesActionSlotPayload {
  id: number;
  productName: string;
}

export const useSalesTableColumns = (actionsSlot: (payload: SalesActionSlotPayload) => ReactNode) => {
  const t = useI18n();

  const { formatPrice } = useFormatPrice();

  const currentLocale = useCurrentLocale();

  const columns: ColumnDef<Sale>[] = [
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
      meta: t('sales.table.name'),
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.name')} />;
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
      meta: t('sales.table.size'),
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.size')} />;
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
      meta: t('sales.table.sku'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.sku')} />;
      },
    },
    {
      accessorKey: 'soldPrice',
      meta: t('sales.table.soldPrice'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.soldPrice')} />;
      },
      cell: ({ row }) => {
        const soldPrice = row.original.soldPrice;

        return <p>{formatPrice(soldPrice) || '-'}</p>;
      },
    },
    {
      accessorKey: 'profit',
      meta: t('sales.table.profit'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.profit')} />;
      },
      cell: ({ row }) => {
        const profit = row.original.profit;

        const isProfitPositive = profit > 0;

        return (
          <p
            className={cn(
              isProfitPositive ? 'text-[#00A148] dark:text-[#56E57F]' : 'text-[#D60021] dark:text-[#FF9087]',
            )}>
            {formatPrice(profit) || '-'}
          </p>
        );
      },
    },
    {
      accessorKey: 'soldPlace',
      meta: t('sales.table.soldPlace'),
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.soldPlace')} />;
      },
      cell: ({ row }) => {
        const soldPlace = row.original.soldPlace;

        return <p>{soldPlace || '-'}</p>;
      },
    },
    {
      accessorKey: 'sold_date',
      meta: t('sales.table.soldDate'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.soldDate')} />;
      },
      cell: ({ row }) => {
        const soldDate = row.original.soldDate;

        return soldDate ? (
          <FormatDate
            date={new Date(soldDate)}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'purchase_price',
      meta: t('sales.table.purchasePrice'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.purchasePrice')} />;
      },
      cell: ({ row }) => {
        const purchasePrice = row.original.purchasePrice;

        return <p>{formatPrice(purchasePrice) || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchase_place',
      meta: t('sales.table.purchasePlace'),
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.purchasePlace')} />;
      },
      cell: ({ row }) => {
        const purchasePlace = row.original.purchasePlace;

        return <p>{purchasePlace || '-'}</p>;
      },
    },
    {
      accessorKey: 'purchase_date',
      meta: t('sales.table.purchaseDate'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.purchaseDate')} />;
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
      accessorKey: 'category',
      meta: t('sales.table.category'),
      enableSorting: false,
      enableHiding: false,
      filterFn: (rows, columnId, filterValue) => {
        const category = rows.getValue(columnId) as { id: string; name: string; type: CategoryEnum };

        return filterValue.includes(category.type.toString());
      },
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.category')} />;
      },
      cell: ({ cell }) => {
        const category = cell.getValue() as { id: string; translations: Record<Language, string>; type: CategoryEnum };

        return <p>{category.translations?.[currentLocale] || '-'}</p>;
      },
    },
    {
      accessorKey: 'brand',
      meta: t('sales.table.brand'),
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.brand')} />;
      },
      cell: ({ getValue }) => {
        return <p>{(getValue() as string) || '-'}</p>;
      },
    },
    {
      accessorKey: 'created_at',
      meta: t('sales.table.createdAt'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.createdAt')} />;
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
      meta: t('sales.table.updatedAt'),
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('sales.table.updatedAt')} />;
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
        const sale = row.original;

        return actionsSlot({
          id: sale.id,
          productName: sale.name,
        });
      },
    },
  ];

  return columns;
};
