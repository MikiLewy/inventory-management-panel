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
  }) => [...salesKeys.lists(), { offset, limit, query, sortBy, sortDirection, filters }],
  details: (id: number) => [...salesKeys.lists(), 'detail', id],
  detail: (id: number) => [...salesKeys.details(id)],
};
