const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {
  generateJWTtoken,
  securePassword,
} = require('../middleware/securityHandler');
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

  const hashedPassword = await securePassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      message: appMessage.user.success.user_created,
      user: {
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateJWTtoken(newUser.id),
      },
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
        token: generateJWTtoken(userToLogin.id),
      },
    });
  } else {
    res.status(400);
    throw new Error(appMessage.user.error.invalid_data);
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    message: 'Current user',
    user: {
      id: _id,
      name,
      email,
    },
  });
});

module.exports = { registerUser, loginUser, getCurrentUser };
