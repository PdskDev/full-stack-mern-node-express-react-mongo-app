const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const appMessage = require('../messages/appMessage');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(appMessage.user.error.all_fields_required);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(appMessage.user.error.user_exists);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({
      message: appMessage.user.success.user_created,
      user: { _id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } else {
    res.status(400);
    throw new Error(appMessage.user.error.invalid_data);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error(appMessage.user.error.all_fields_required);
  }

  const userToLogin = await User.findOne({ email });

  if (userToLogin && (await bcrypt.compare(password, userToLogin.password))) {
    res.status(200).json({
      message: appMessage.user.success.user_login,
      user: {
        _id: userToLogin.id,
        name: userToLogin.name,
        email: userToLogin.email,
      },
    });
  } else {
    res.status(400);
    throw new Error(appMessage.user.error.invalid_data);
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get current user' });
});

module.exports = { registerUser, loginUser, getCurrentUser };
