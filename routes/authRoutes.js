// routes/authRoutes.js
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // For now, just respond with dummy success
  res.status(200).json({ message: 'Login successful', email });
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // For now, just respond with dummy success
  res.status(201).json({ message: 'Signup successful', email });
});

module.exports = router;
