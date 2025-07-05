import { CategoryEnum } from './enum/category';

export interface ProductSuggestion {
  id: number;
  title: string;
  sku: string;
  brand: string;
  category: CategoryEnum;
  image: string;
  createdAt: string;
  updatedAt: string;
}
