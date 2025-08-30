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
    filters,
  }: {
    offset: number;
    limit: number;
    query?: string;
    sortBy?: string;
    sortDirection?: SortDirection;
    filters?: {
      dateRange?: {
        from: Date;
        to: Date;
      };
    };
  }) => [...productsKeys.lists(), { offset, limit, query, sortBy, sortDirection, filters }],
  details: (id: number) => [...productsKeys.lists(), 'detail', id],
  detail: (id: number) => [...productsKeys.details(id)],
};
