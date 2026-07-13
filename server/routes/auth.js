const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ success: false, error: 'Email already registered' });
  }

  const user = await User.create({ email, password, name, role: 'user' });
  res.status(201).json({ success: true, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ success: false, error: 'Invalid email or password' });
  }

  res.json({
    success: true,
    user: { id: user._id, email: user.email, name: user.name, role: user.role }
  });
});

module.exports = router;
