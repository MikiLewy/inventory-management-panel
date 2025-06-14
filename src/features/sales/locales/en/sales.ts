export default {
  title: 'Sales',
  revertSales: 'Revert sale',
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
      title: 'Revert sales',
      description:
        'Are you sure you want to revert the selected sales? All information about the sales will be lost and the products will be added back to the inventory.',
      confirmButton: 'Yes, revert',
      'success#one': 'Sale reverted successfully',
      'success#other': 'Sales reverted successfully',
    },
  },
} as const;
