import { SizeUnit } from '@/types/enum/size-unit';

import { ProductStatus } from '../../api/types/enum/product-status';

export interface CreateProductPayload {
  name: string;
  sku: string;
  products: {
    size: string;
    quantity: number;
    purchasePrice: number;
    purchasePlace: string | undefined;
    purchaseDate: string | undefined;
  }[];
  status: ProductStatus;
  brand?: string;
  categoryId: number;
  sizeUnit: SizeUnit;
  imageUrl?: string;
}
