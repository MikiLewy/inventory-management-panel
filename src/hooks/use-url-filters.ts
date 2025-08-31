import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

export type FilterValue = string | number | boolean;

interface ReturnValues {
  filters: Record<string, FilterValue[]>;
  setFilters: (filters: Record<string, FilterValue[]>) => void;
}

const columnFiltersSchema = z.record(z.string(), z.array(z.union([z.string(), z.number(), z.boolean()])));

export const useUrlFilters = (): ReturnValues => {
  const [filters, setFilters] = useQueryState('filters', parseAsJson(columnFiltersSchema.parse).withDefault({}));

  return { filters, setFilters };
};
