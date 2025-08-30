export const calculatePaginationOffset = (pageIndex: number, pageSize: number) => {
  return pageIndex * pageSize;
};
