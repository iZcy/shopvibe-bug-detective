function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function applyDiscount(subtotal, couponCode) {
  if (couponCode === 'SAVE10') {
    return subtotal * 0.9;
  }
  return subtotal;
}

module.exports = { calculateTotal, applyDiscount };
