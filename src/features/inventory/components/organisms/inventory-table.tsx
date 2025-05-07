'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

import ClientOnly from '@/components/molecules/client-only';
import SearchBar from '@/components/molecules/search-bar';
import { Table } from '@/components/organisms/table/table';
import { TablePagination } from '@/components/organisms/table/table-pagination';
import { Button } from '@/components/ui/button';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function InventoryTable<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col grow gap-3">
      <div className="flex items-center py-2 gap-2">
        <SearchBar
          query={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          handleChangeQuery={value => table.getColumn('name')?.setFilterValue(value)}
        />
        <div className="flex items-center gap-2">
          {isFiltered ? (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="text-sm px-2 lg:px-3">
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
      <ClientOnly>
        <Table columnsLength={columns.length} table={table} />
        <TablePagination table={table} />
      </ClientOnly>
    </div>
  );
}
