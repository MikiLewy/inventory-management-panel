import { parseAsIndex, parseAsInteger, useQueryStates } from 'nuqs';

import { Pagination } from '@/types/interfaces/pagination';

export const useUrlPagination = (initialOffset: number = 0, initialLimit: number = 10): Pagination => {
  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsIndex.withDefault(initialOffset),
      pageSize: parseAsInteger.withDefault(initialLimit),
    },
    {
      urlKeys: {
        pageIndex: 'offset',
        pageSize: 'limit',
      },
      history: 'push',
    },
  );

  const { pageIndex, pageSize } = pagination;

  return {
    offset: pageIndex,
    limit: pageSize,
    onPaginationChange: setPagination,
  };
};
