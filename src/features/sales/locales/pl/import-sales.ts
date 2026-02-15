export default {
  title: 'Importuj Sprzedaże',
  description: 'Prześlij plik CSV lub Excel, aby zaimportować sprzedaże zbiorczo.',
  import: 'Importuj',
  success: 'Zaimportowano {count} sprzedaży',
  partialSuccess: 'Zaimportowano {success}, niepowodzeń: {failed}',
  error: 'Nie udało się zaimportować sprzedaży',
  validation: {
    nameRequired: 'Nazwa jest wymagana',
    skuRequired: 'SKU jest wymagane',
    sizeRequired: 'Rozmiar jest wymagany',
    purchasePriceRequired: 'Cena zakupu jest wymagana',
    soldPriceRequired: 'Cena sprzedaży jest wymagana',
    pricePositive: 'Cena musi być liczbą dodatnią',
    invalidDate: 'Nieprawidłowy format daty (użyj YYYY-MM-DD)',
    invalidSizeUnit: 'Nieprawidłowa jednostka rozmiaru. Użyj: EU, US, UK lub CM',
    categoryNotFound: 'Nie znaleziono kategorii "{name}"',
  },
} as const;
