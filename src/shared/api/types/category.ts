import { InferResultType } from '@/types/infer-db-result-type';

export type Category = InferResultType<'categories'> & {
  translations: Record<string, string>;
};
