import { SortDirection } from '@tanstack/react-table';

export const salesKeys = {
  all: ['sales'],
  lists: () => [...salesKeys.all, 'list'],
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
  }) => [...salesKeys.lists(), { offset, limit, query, sortBy, sortDirection }],
  details: (id: number) => [...salesKeys.lists(), 'detail', id],
  detail: (id: number) => [...salesKeys.details(id)],
};
