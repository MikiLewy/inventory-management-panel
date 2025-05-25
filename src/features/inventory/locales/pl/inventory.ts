export default {
  title: 'Magazyn',
  add: 'Dodaj przedmiot',
  table: {
    name: 'Nazwa',
    size: 'Rozmiar',
    sizeUnit: 'Jednostka rozmiaru',
    sku: 'SKU',
    category: 'Kategoria',
    status: 'Status',
    brand: 'Marka',
    purchasePrice: 'Cena zakupu',
    purchaseDate: 'Data zakupu',
    purchasePlace: 'Miejsce zakupu',
    createdAt: 'Data dodania',
  },
  productStatus: {
    inStock: 'W magazynie',
    inDelivery: 'W transporcie',
  },
  categoryStatus: {
    sneakers: 'Buty',
    clothing: 'Ubrania',
    collectibles: 'Kolekcjonerskie',
    accessories: 'Akcesoria',
    other: 'Inne',
  },
} as const;
