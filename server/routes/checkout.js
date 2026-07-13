const express = require('express');
const router = express.Router();
const { calculateTotal } = require('../services/cart');

router.post('/', async (req, res) => {
  const { items, shippingAddress } = req.body;

  const total = calculateTotal(items);

  const order = {
    items,
    total,
    shippingAddress,
    status: 'confirmed',
    createdAt: new Date()
  };

  res.status(201).json(order);
});

module.exports = router;
