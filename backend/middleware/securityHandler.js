const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { generateJWTtoken, securePassword };
