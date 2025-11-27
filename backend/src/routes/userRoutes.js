const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

router.post(
  '/signup',
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Signup validation errors:', errors.array());
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });

      const newUser = new User({ email, passwordHash: password });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User created successfully',
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({ message: error.message });
    }
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
module.exports.authenticateToken = authenticateToken;