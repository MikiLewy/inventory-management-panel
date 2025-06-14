import { CategoryEnum } from '@/shared/api/types/enum/category';

export interface Sale {
  id: number;
  name: string;
  sku: string;
  purchasePrice: number;
  purchaseDate: string;
  brand: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    type: CategoryEnum;
  };
  purchasePlace: string;
  size: string;
  profit: number;
  soldPrice: number;
  soldDate: string;
  soldPlace: string;
  sizeUnit: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
