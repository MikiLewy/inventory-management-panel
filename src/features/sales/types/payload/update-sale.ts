import { SizeUnit } from '@/types/enum/size-unit';

export interface UpdateSalePayload {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  purchasePlace?: string | undefined;
  purchaseDate?: Date | undefined;
  brand?: string;
  categoryId: number;
  sizeUnit: SizeUnit;
  imageUrl?: string;
  soldDate?: Date | undefined;
  soldPrice: number;
  soldPlace?: string | undefined;
}
