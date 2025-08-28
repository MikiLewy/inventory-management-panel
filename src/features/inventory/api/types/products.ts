import { InferResultType } from '@/types/infer-db-result-type';

export type Product = InferResultType<
  'products',
  {
    category: {
      columns: {
        id: true;
        translations: true;
        type: true;
      };
    };
  }
>;
