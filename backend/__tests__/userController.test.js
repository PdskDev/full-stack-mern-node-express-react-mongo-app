import { registerUser } from '../controllers/userController';

//Mock User model functions
jest.mock('../models/userModel.js', () => {
  const mockUser = {
    _id: 'user_id',
    name: 'NadetDev',
    email: 'nadetdev@gmail.com',
  };

  return {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockUser),
  };
});

//Mock JWY & Bcrypt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockResolvedValue('mock-token'),
}));

const bcrypt = require('bcryptjs');
bcrypt.genSalt = jest.fn().mockResolvedValue('mock-token');
bcrypt.hash = jest.fn().mockResolvedValue('mock-hashed-password');

let {
  generateJWTtoken,
  securePassword,
} = require('../middleware/securityHandler');

securePassword = jest.fn().mockResolvedValue('mock-hashed-password');
generateJWTtoken = jest.fn().mockResolvedValue('mock-token');

test('should register new user', async () => {
  const req = {
    body: {
      name: 'NadetDev',
      email: 'nadetdev@gmail.com',
      password: 'password',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await registerUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});

test('should return 400 error if any field is missing', async () => {
  const req = {
    body: {
      name: 'NadetDev',
      email: '',
      password: 'password',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(registerUser(req, res)).rejects.toThrow(
    'All fields are required'
  );
  expect(res.status).toHaveBeenCalledWith(400);
});
