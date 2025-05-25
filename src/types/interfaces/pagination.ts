import { ParserBuilder } from 'nuqs';
import { SetValues } from 'nuqs';

export interface Pagination {
  page: number;
  perPage: number;
  onPaginationChange: SetValues<{
    pageIndex: Omit<ParserBuilder<number>, 'parseServerSide'> & {
      readonly defaultValue: number;
      parseServerSide(value: string | string[] | undefined): number;
    };
    pageSize: Omit<ParserBuilder<number>, 'parseServerSide'> & {
      readonly defaultValue: number;
      parseServerSide(value: string | string[] | undefined): number;
    };
  }>;
}
