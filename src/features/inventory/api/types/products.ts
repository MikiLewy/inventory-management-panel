import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { CategoryEnum } from '@/shared/api/types/enum/category';

export interface Product {
  id: number;
  name: string;
  sku: string;
  purchasePrice: number;
  purchaseDate: string;
  status: ProductStatus;
  brand: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    type: CategoryEnum;
  };
  purchasePlace: string;
  size: string;
  sizeUnit: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
