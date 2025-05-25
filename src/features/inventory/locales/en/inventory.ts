export default {
  title: 'Inventory',
  add: 'Add item',
  table: {
    name: 'Name',
    size: 'Size',
    sizeUnit: 'Size unit',
    sku: 'SKU',
    category: 'Category',
    status: 'Status',
    brand: 'Brand',
    purchasePrice: 'Purchase price',
    purchaseDate: 'Purchase date',
    purchasePlace: 'Purchase place',
    createdAt: 'Created at',
  },
  productStatus: {
    inStock: 'In stock',
    inDelivery: 'In delivery',
  },
  categoryStatus: {
    sneakers: 'Sneakers',
    clothing: 'Clothing',
    collectibles: 'Collectibles',
    accessories: 'Accessories',
    other: 'Other',
  },
  dialog: {
    remove: {
      title: 'Remove product',
      description: 'Are you sure you want to remove this product?',
      success: 'Product removed successfully',
    },
  },
} as const;
