'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Options, ParserBuilder, SetValues } from 'nuqs';
import { useState } from 'react';

import ClientOnly from '@/components/molecules/client-only';
import SearchBar from '@/components/molecules/search-bar';
import { Table } from '@/components/organisms/table/table';
import { TablePagination } from '@/components/organisms/table/table-pagination';
import { TableViewOptions } from '@/components/organisms/table/table-view-options';
import { Button } from '@/components/ui/button';

type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPaginationChange: SetValues<{
    pageIndex: Omit<ParserBuilder<number>, 'parseServerSide'> & {
      readonly defaultValue: number;
      parseServerSide(value: string | string[] | undefined): number;
    };
    pageSize: Omit<ParserBuilder<number>, 'parseServerSide'> & {
      readonly defaultValue: number;
      parseServerSide(value: string | string[] | undefined): number;
    };
  }>;
};

type Search = {
  query: string;
  handleChangeQuery: (query: string) => void;
};

type Sortable = {
  sortBy: string;
  sortDirection: SortDirection;
  onSortChange: (
    value:
      | { desc: boolean; id: string }[]
      | ((old: { desc: boolean; id: string }[] | null) => { desc: boolean; id: string }[] | null)
      | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
};

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Pagination;
  search?: Search;
  sortable?: Sortable;
}

export function InventoryTable<TData, TValue>({
  columns,
  data,
  pagination,
  search,
  sortable,
}: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount: pagination?.totalItems ?? 10,
    onPaginationChange: pagination?.onPaginationChange,
    // @ts-expect-error tanstack table throws an error but we need to pass here specific function that does not match the type but works properly
    onSortingChange: sortable?.onSortChange,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting: sortable ? [{ id: sortable.sortBy, desc: sortable.sortDirection === 'desc' }] : [],
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col grow gap-3">
      <div className="flex items-center py-2 gap-2">
        {search ? <SearchBar query={search.query} handleChangeQuery={search.handleChangeQuery} /> : null}
        <div className="flex items-center gap-2">
          {isFiltered ? (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="text-sm px-2 lg:px-3">
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
        <TableViewOptions table={table} />
      </div>
      <ClientOnly>
        <Table columnsLength={columns.length} table={table} />
        {pagination ? <TablePagination table={table} /> : null}
      </ClientOnly>
    </div>
  );
}
