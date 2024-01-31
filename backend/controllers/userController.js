const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get user register' });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get user login' });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get current user' });
});

module.exports = { registerUser, loginUser, getCurrentUser };
