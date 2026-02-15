export interface ExportSalesParams {
  format: 'csv' | 'xlsx';
  scope: 'all' | 'selected';
  selectedIds?: number[];
  filters?: {
    profitPositive?: boolean;
    dateRange?: { from: string; to: string };
  };
  query?: string;
  locale?: string;
}
