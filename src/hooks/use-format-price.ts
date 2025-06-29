interface ReturnType {
  formatPrice: (amount: number, language?: string) => string;
}

export const useFormatPrice = (): ReturnType => {
  // TODO: IMPLEMENT CURRENCY
  const currency = 'PLN';

  const formatPrice = (amount: number, language: string = 'pl') => {
    const formatter = new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  return { formatPrice };
};
