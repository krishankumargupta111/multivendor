interface CartItem {
  sellingPrice: number;
  mrpPrice: number;
}

export const sumCartItemSellingPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.sellingPrice, 0);
};

export const sumCartItemMrpPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.mrpPrice, 0);
};