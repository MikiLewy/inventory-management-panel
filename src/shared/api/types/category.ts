import { CategoryEnum } from '@/shared/api/types/enum/category';
import { Language } from '@/types/enum/language';

export interface Category {
  id: number;
  type: CategoryEnum;
  translations: Record<Language, string>;
  createdAt: string;
}
