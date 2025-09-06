import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';
import { useI18n } from '@/locales/client';

import { Warehouse } from '../api/types/warehouse';

export interface WarehousesActionSlotPayload {
  id: number;
  name: string;
}

export const useWarehousesTableColumns = (actionsSlot: (payload: WarehousesActionSlotPayload) => ReactNode) => {
  const t = useI18n();

  const columns: ColumnDef<Warehouse>[] = [
    {
      accessorKey: 'name',
      meta: t('warehouse.table.name'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.name')} />;
      },
      cell: ({ row }) => {
        const name = row.original.name;

        return <p>{name || '-'}</p>;
      },
    },
    {
      accessorKey: 'country',
      meta: t('warehouse.table.country'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.country')} />;
      },
      cell: ({ row }) => {
        const country = row.original.country;

        return <p>{country || '-'}</p>;
      },
    },
    {
      accessorKey: 'address',
      meta: t('warehouse.table.address'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.address')} />;
      },
      cell: ({ row }) => {
        const address = row.original.address;

        return <p>{address || '-'}</p>;
      },
    },
    {
      accessorKey: 'postCode',
      meta: t('warehouse.table.postCode'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.postCode')} />;
      },
      cell: ({ row }) => {
        const postCode = row.original.postCode;

        return <p>{postCode || '-'}</p>;
      },
    },
    {
      accessorKey: 'city',
      meta: t('warehouse.table.city'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.city')} />;
      },
      cell: ({ row }) => {
        const city = row.original.city;

        return <p>{city || '-'}</p>;
      },
    },
    {
      accessorKey: 'created_at',
      meta: t('warehouse.table.createdAt'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.createdAt')} />;
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
      meta: t('warehouse.table.updatedAt'),
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title={t('warehouse.table.updatedAt')} />;
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
      enableSorting: false,
      cell: ({ row }) => {
        const warehouse = row.original;

        return actionsSlot({
          id: warehouse.id,
          name: warehouse.name,
        });
      },
    },
  ];

  return columns;
};
