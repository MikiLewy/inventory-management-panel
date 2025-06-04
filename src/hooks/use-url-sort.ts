import { SortDirection } from '@tanstack/react-table';
import { parseAsString, parseAsStringLiteral, ParserBuilder, SetValues, useQueryStates } from 'nuqs';

interface ReturnType {
  sortBy: string;
  sortDirection: SortDirection;
  onSortChange: SetValues<{
    sortBy: Omit<ParserBuilder<string>, 'parseServerSide'> & {
      readonly defaultValue: string;
      parseServerSide(value: string | string[] | undefined): string;
    };
    sortDirection: Omit<ParserBuilder<'asc' | 'desc'>, 'parseServerSide'> & {
      readonly defaultValue: NonNullable<'asc' | 'desc'>;
      parseServerSide(value: string | string[] | undefined): NonNullable<'asc' | 'desc'>;
    };
  }>;
}

export const useUrlSort = (initialSortBy: string, initialSortDirection: SortDirection): ReturnType => {
  const [sort, setSort] = useQueryStates(
    {
      sortBy: parseAsString.withDefault(initialSortBy),
      sortDirection: parseAsStringLiteral(['asc', 'desc']).withDefault(initialSortDirection),
    },
    {
      history: 'push',
    },
  );

  const { sortBy, sortDirection } = sort;

  return {
    sortBy,
    sortDirection,
    onSortChange: setSort,
  };
};
