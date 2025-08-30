export const calculateSaleProfit = (soldPrice: number, purchasePrice: number) => {
  return (soldPrice || 0) - (purchasePrice || 0);
};
