import { parseAsString, useQueryState } from 'nuqs';

interface ReturnValues {
  query: string;
  handleChangeQuery: (query: string) => void;
}

export const useUrlQuery = (): ReturnValues => {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''));

  return { query, handleChangeQuery: setQuery };
};
