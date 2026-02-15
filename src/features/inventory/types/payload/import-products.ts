import { ProductStatus } from '@/server/db/types/enum/product-status';
import { SizeUnit } from '@/types/enum/size-unit';

export interface ImportProductPayload {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchaseDate?: string;
  status?: ProductStatus;
  brand?: string;
  category?: string;
  purchasePlace?: string;
  sizeUnit?: SizeUnit;
  warehouse?: string;
}
