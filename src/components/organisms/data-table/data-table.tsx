'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortDirection,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Options, ParserBuilder, SetValues } from 'nuqs';
import { Dispatch, SetStateAction } from 'react';

import SearchBar from '@/components/molecules/search-bar';
import { Table } from '@/components/organisms/table/table';
import { TablePagination } from '@/components/organisms/table/table-pagination';
import { TableViewOptions } from '@/components/organisms/table/table-view-options';
import { FilterValue } from '@/hooks/use-url-filters';
import { useViewSettings, View } from '@/store/views-settings';

import { TableFacetedFilter } from '../table/table-faceted-filters';

type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPaginationChange:
    | SetValues<{
        pageIndex: Omit<ParserBuilder<number>, 'parseServerSide'> & {
          readonly defaultValue: number;
          parseServerSide(value: string | string[] | undefined): number;
        };
        pageSize: Omit<ParserBuilder<number>, 'parseServerSide'> & {
          readonly defaultValue: number;
          parseServerSide(value: string | string[] | undefined): number;
        };
      }>
    | Dispatch<SetStateAction<{ pageIndex: number; pageSize: number }>>;
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

type Selectable = {
  rowSelection: RowSelectionState;
  setRowSelection: OnChangeFn<RowSelectionState>;
};

type FacetedFilters = {
  id: string;
  title: string;
  options: {
    label: string;
    value: FilterValue;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  pagination?: Pagination;
  search?: Search;
  facetedFilters?: FacetedFilters[];
  sortable?: Sortable;
  selectable?: Selectable;
  view?: View;
}

export function DataTable<TData extends { id: number | string }, TValue>({
  columns,
  data,
  pagination,
  search,
  sortable,
  selectable,
  view,
  isLoading,
  facetedFilters,
}: TableProps<TData, TValue>) {
  const { viewsSettings, setHiddenColumn } = useViewSettings();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: pagination?.totalItems ?? 10,
    onPaginationChange: pagination?.onPaginationChange,
    // @ts-expect-error tanstack table throws an error but we need to pass here specific function that does not match the type but works properly
    onSortingChange: sortable?.onSortChange,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: visibility => {
      if (!view) return;
      setHiddenColumn(
        view,
        // @ts-expect-error visibility is callable function but typescript does not know that
        Object.keys(visibility())?.[0] || '',
      );
    },
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: selectable?.setRowSelection,
    getRowId: row => row.id.toString(),
    state: {
      sorting: sortable ? [{ id: sortable.sortBy, desc: sortable.sortDirection === 'desc' }] : [],
      columnVisibility: view
        ? viewsSettings[view].hiddenColumns.reduce((acc, column) => {
            acc[column] = false;
            return acc;
          }, {} as VisibilityState)
        : {},
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
      rowSelection: selectable?.rowSelection,
    },
  });

  return (
    <div className="flex flex-col grow gap-3">
      <div className="flex items-center py-2 gap-2">
        {search ? <SearchBar query={search.query} handleChangeQuery={search.handleChangeQuery} /> : null}
        <div className="flex items-center gap-2">
          {facetedFilters?.map(filter => (
            <TableFacetedFilter key={filter.title} id={filter.id} title={filter.title} options={filter.options} />
          ))}
        </div>
        {view ? <TableViewOptions table={table} /> : null}
      </div>
      <Table isLoading={isLoading} columnsLength={columns.length} table={table} />
      {pagination ? <TablePagination table={table} /> : null}
    </div>
  );
}
