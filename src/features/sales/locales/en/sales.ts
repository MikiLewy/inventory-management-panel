export default {
  title: 'Sales',
  revertSale: 'Revert sale',
  profitPositive: 'Positive',
  profitNegative: 'Negative',
  table: {
    name: 'Name',
    size: 'Size',
    sizeUnit: 'Size unit',
    sku: 'SKU',
    category: 'Category',
    brand: 'Brand',
    purchasePrice: 'Purchase price',
    purchaseDate: 'Purchase date',
    purchasePlace: 'Purchase place',
    soldPrice: 'Sold price',
    soldDate: 'Sold date',
    soldPlace: 'Sold place',
    profit: 'Profit',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
  },
  dialog: {
    revertSales: {
      title: 'Revert sale',
      titleMultiple: 'Revert sales',
      description:
        'Are you sure you want to revert sale of {productName}? All information about the sale will be lost and the product will be added back to the inventory.',
      descriptionMultiple:
        'Are you sure you want to revert the selected sales? All information about the sales will be lost and the products will be added back to the inventory.',
      confirmButton: 'Yes, revert',
      'success#one': 'Sale reverted successfully',
      'success#other': 'Sales reverted successfully',
    },
    remove: {
      title: 'Remove sale',
      titleMultiple: 'Remove sales',
      description:
        'Are you sure you want to remove sale of {productName}? All information about the sale will be lost.',
      descriptionMultiple:
        'Are you sure you want to remove the selected sales? All information about the sales will be lost.',
      confirmButton: 'Yes, remove',
      'success#one': 'Sale removed successfully',
      'success#other': 'Sales removed successfully',
    },
    duplicateSale: {
      title: 'Duplicate sale',
      success: 'Sale duplicated successfully',
    },
  },
} as const;
