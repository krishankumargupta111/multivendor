export interface CartItem {
  sellingPrice: number;
  mrpPrice: number;
}

export const sumCartItemSellingPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.sellingPrice;
  }, 0);
};

export const sumCartItemMrpPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.mrpPrice;
  }, 0);
};