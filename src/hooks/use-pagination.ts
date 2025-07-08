import { SetStateAction, Dispatch, useState } from 'react';

import { calculatePaginationOffset } from '@/utils/calculate-pagination-offset';

interface Pagination {
  offset: number;
  limit: number;
  pageIndex: number;
  onPaginationChange: Dispatch<SetStateAction<{ pageIndex: number; pageSize: number }>>;
}

export const usePagination = (initialOffset: number = 0, initialLimit: number = 10): Pagination => {
  const [pagination, setPagination] = useState({
    pageIndex: initialOffset,
    pageSize: initialLimit,
  });

  const { pageIndex, pageSize } = pagination;

  return {
    offset: calculatePaginationOffset(pageIndex, pageSize),
    pageIndex,
    limit: pageSize,
    onPaginationChange: setPagination,
  };
};
