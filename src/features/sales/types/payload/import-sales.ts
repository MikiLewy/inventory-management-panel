export interface ImportSalePayload {
  name: string;
  sku: string;
  size: string;
  purchasePrice: number;
  soldPrice: number;
  purchaseDate?: string;
  soldDate?: string;
  soldPlace?: string;
  brand?: string;
  category?: string;
  purchasePlace?: string;
  sizeUnit?: string;
}
