const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice) {
    filter.price = { $gt: parseFloat(minPrice) };
  }

  if (maxPrice) {
    filter.price = { ...filter.price, $lt: parseFloat(maxPrice) };
  }

  let sortOption = {};
  if (sort === 'price_asc') {
    sortOption.price = -1;
  } else if (sort === 'price_desc') {
    sortOption.price = 1;
  } else if (sort === 'newest') {
    sortOption.createdAt = -1;
  } else {
    sortOption.createdAt = -1;
  }

  const products = await Product.find(filter).sort(sortOption);
  res.json(products);
});

router.get('/search', async (req, res) => {
  const { q } = req.query;

  setTimeout(async () => {
    try {
      const products = await Product.find({
        name: { $regex: q || '', $options: 'i' }
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Search failed' });
    }
  }, 15000);
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', async (req, res) => {
  const product = new Product({ ...req.body, createdAt: new Date() });
  product.save();
  res.status(201).json(product);
});

module.exports = router;
