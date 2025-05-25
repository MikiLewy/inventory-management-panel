import { parseAsIndex, parseAsInteger, useQueryStates } from 'nuqs';

import { Pagination } from '@/types/interfaces/pagination';

export const useUrlPagination = (initialPage: number = 0, initialPerPage: number = 10): Pagination => {
  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsIndex.withDefault(initialPage),
      pageSize: parseAsInteger.withDefault(initialPerPage),
    },
    {
      urlKeys: {
        pageIndex: 'page',
        pageSize: 'perPage',
      },
      history: 'push',
    },
  );

  const { pageIndex, pageSize } = pagination;

  return {
    page: pageIndex + 1,
    perPage: pageSize,
    onPaginationChange: setPagination,
  };
};
