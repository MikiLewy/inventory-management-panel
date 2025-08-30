import { parseAsIndex, parseAsInteger, useQueryStates } from 'nuqs';

import { Pagination } from '@/types/interfaces/pagination';
import { calculatePaginationOffset } from '@/utils/calculate-pagination-offset';

export const useUrlPagination = (initialOffset: number = 0, initialLimit: number = 10): Pagination => {
  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsIndex.withDefault(initialOffset),
      pageSize: parseAsInteger.withDefault(initialLimit),
    },
    {
      urlKeys: {
        pageIndex: 'pageIndex',
        pageSize: 'limit',
      },
      history: 'push',
    },
  );

  const { pageIndex, pageSize } = pagination;

  return {
    offset: calculatePaginationOffset(pageIndex, pageSize),
    pageIndex,
    limit: pageSize,
    onPaginationChange: setPagination,
  };
};
