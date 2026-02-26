export const calculateTotal = (items, tax, discount) => {
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const taxAmount = (subtotal * tax) / 100;
  return subtotal + taxAmount - discount;
};