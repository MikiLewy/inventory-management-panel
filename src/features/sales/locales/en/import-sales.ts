export default {
  title: 'Import Sales',
  description: 'Upload a CSV or Excel file to import sales in bulk.',
  import: 'Import',
  success: '{count} sales imported successfully',
  partialSuccess: '{success} imported, {failed} failed',
  error: 'Failed to import sales',
  validation: {
    nameRequired: 'Name is required',
    skuRequired: 'SKU is required',
    sizeRequired: 'Size is required',
    purchasePriceRequired: 'Purchase price is required',
    soldPriceRequired: 'Sold price is required',
    pricePositive: 'Price must be a positive number',
    invalidDate: 'Invalid date format (use YYYY-MM-DD)',
    invalidSizeUnit: 'Invalid size unit. Use: EU, US, UK, or CM',
    categoryNotFound: 'Category "{name}" not found',
  },
} as const;
