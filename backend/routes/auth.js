const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword, nipt } = req.body;

  if (!name || !email || !password || !confirmPassword || !nipt) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const niptRegex = /^[A-Z]\d{8}[A-Z]$/;
  if (!niptRegex.test(nipt)) {
    return res.status(400).json({ error: 'Invalid NIPT format. e.g., M21326021Q' });
  }

  try {
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({ error: 'Business with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBusiness = new Business({
      name,
      email,
      password: hashedPassword,
      nipt,
    });

    await newBusiness.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    const business = await Business.findOne({ email });
    if (!business) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, userId: business._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;
