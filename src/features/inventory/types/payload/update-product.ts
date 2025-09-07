import { SizeUnit } from '@/types/enum/size-unit';

import { ProductStatus } from '../../api/types/enum/product-status';

export interface UpdateProductPayload {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchasePlace?: string | undefined;
  purchaseDate?: Date | undefined;
  status: ProductStatus;
  brand?: string;
  categoryId: number;
  sizeUnit: SizeUnit;
  imageUrl?: string;
  warehouseId: number;
}
