import { SortDirection } from '@tanstack/react-table';
import { Options, parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

interface ReturnType {
  sortBy: string;
  sortDirection: SortDirection;
  onSortChange: (
    value:
      | { desc: boolean; id: string }[]
      | ((old: { desc: boolean; id: string }[] | null) => { desc: boolean; id: string }[] | null)
      | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
}

const sortingSchema = z.array(
  z.object({
    id: z.string().default('updated_at'),
    desc: z.boolean().default(false),
  }),
);

export const useUrlSort = (initialSortBy: string, initialSortDirection: SortDirection): ReturnType => {
  const [sorting, setSorting] = useQueryState('sorting', parseAsJson(sortingSchema.parse));

  const sortBy = sorting ? sorting?.[0]?.id : initialSortBy;

  const sortDirection = sorting ? (sorting?.[0]?.desc ? 'desc' : 'asc') : initialSortDirection;

  return {
    sortBy,
    sortDirection,
    onSortChange: setSorting,
  };
};
