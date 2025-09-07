'use client';

import { flexRender, Table as TableInterface } from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import { Table as DataTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useI18n } from '@/locales/client';

interface TableProps<TData> {
  columnsLength: number;
  table: TableInterface<TData>;
  isLoading?: boolean;
}

export function Table<TData>({ columnsLength, table, isLoading }: TableProps<TData>) {
  const t = useI18n();

  return (
    <div className={`rounded-md border`}>
      {isLoading ? (
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-8" />
          ))}
        </div>
      ) : (
        <DataTable className={`${table.getRowModel().rows?.length ? 'border-collapse' : 'border-separate'}`}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className={cell.column.id === 'actions' ? 'text-right' : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsLength} className="h-24 text-center">
                  {t('common.noDataAvailable')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </DataTable>
      )}
    </div>
  );
}
