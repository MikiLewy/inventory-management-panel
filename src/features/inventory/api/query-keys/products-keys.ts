import { SortDirection } from '@tanstack/react-table';

export const productsKeys = {
  all: ['products'],
  lists: () => [...productsKeys.all, 'list'],
  list: ({
    offset,
    limit,
    query,
    sortBy,
    sortDirection,
  }: {
    offset: number;
    limit: number;
    query: string;
    sortBy: string;
    sortDirection: SortDirection;
  }) => [...productsKeys.lists(), { offset, limit, query, sortBy, sortDirection }],
};
