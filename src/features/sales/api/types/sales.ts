import { InferResultType } from '@/types/infer-db-result-type';

export type Sale = InferResultType<
  'sales',
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
