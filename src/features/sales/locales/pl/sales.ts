export default {
  title: 'Sprzedaże',
  revertSale: 'Cofnij sprzedaż',
  table: {
    name: 'Nazwa',
    size: 'Rozmiar',
    sizeUnit: 'Jednostka rozmiaru',
    sku: 'SKU',
    category: 'Kategoria',
    brand: 'Marka',
    purchasePrice: 'Cena zakupu',
    purchaseDate: 'Data zakupu',
    purchasePlace: 'Miejsce zakupu',
    soldPrice: 'Cena sprzedaży',
    soldDate: 'Data sprzedaży',
    soldPlace: 'Miejsce sprzedaży',
    profit: 'Profit',
    createdAt: 'Data utworzenia',
    updatedAt: 'Data aktualizacji',
  },
  dialog: {
    revertSales: {
      title: 'Cofnij sprzedaż',
      titleMultiple: 'Cofnij sprzedaże',
      description:
        'Czy na pewno chcesz cofnąć sprzedaż produktu {productName}? Wszystkie informacje o sprzedaży zostaną utracone i produkt zostanie dodany z powrotem do magazynu.',
      descriptionMultiple:
        'Czy na pewno chcesz cofnąć wybrane sprzedaże? Wszystkie informacje o sprzedaży zostaną utracone i produkty zostaną dodane z powrotem do magazynu.',
      confirmButton: 'Tak, cofnij',
      'success#one': 'Sprzedaż została pomyślnie cofnięta',
      'success#other': 'Sprzedaże zostały pomyślnie cofnięte',
    },
    remove: {
      title: 'Usuń sprzedaż',
      titleMultiple: 'Usuń sprzedaże',
      description:
        'Czy na pewno chcesz usunąć sprzedaż produktu {productName}? Wszystkie informacje o sprzedaży zostaną utracone.',
      descriptionMultiple:
        'Czy na pewno chcesz usunąć wybrane sprzedaże? Wszystkie informacje o sprzedaży zostaną utracone.',
      confirmButton: 'Tak, usuń',
      'success#one': 'Sprzedaż została pomyślnie usunięta',
      'success#other': 'Sprzedaże zostały pomyślnie usunięte',
    },
    duplicateSale: {
      title: 'Duplikuj sprzedaż',
      success: 'Sprzedaż została pomyślnie skopiowana',
    },
  },
} as const;
