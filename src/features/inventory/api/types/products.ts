import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';

export interface Product {
  id: number;
  name: string;
  sku: string;
  purchasePrice: number;
  purchaseDate: string;
  status: ProductStatus;
  brand: string;
  categoryId: number;
  purchasePlace: string;
  size: string;
  sizeUnit: string;
  invoiceUrl: string;
  imagesUrls: string[];
  createdAt: string;
  updatedAt: string;
}
