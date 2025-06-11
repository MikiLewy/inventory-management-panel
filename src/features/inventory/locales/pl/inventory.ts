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
    createdAt: 'Utworzono',
    updatedAt: 'Zaktualizowano',
  },
  productStatus: {
    inStock: 'W magazynie',
    inDelivery: 'W dostawie',
  },
  categoryStatus: {
    sneakers: 'Buty',
    clothing: 'Odzież',
    collectibles: 'Kolekcjonerskie',
    accessories: 'Akcesoria',
    other: 'Inne',
  },
  dialog: {
    remove: {
      title: 'Usuń produkt',
      description: 'Czy na pewno chcesz usunąć ten produkt?',
      success: 'Produkt został pomyślnie usunięty',
    },
  },
} as const;
