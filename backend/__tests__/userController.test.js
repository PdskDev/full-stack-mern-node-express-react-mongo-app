import { registerUser } from '../controllers/userController';

let {
  generateJWTtoken,
  securePassword,
} = require('../middleware/securityHandler');
const userModel = require('../models/userModel');

const mockUser = {
  _id: 'user_id',
  name: 'NadetDev',
  email: 'nadetdev@gmail.com',
};

//Mock JWY & Bcrypt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockResolvedValue('mock-token'),
}));

securePassword = jest.fn().mockResolvedValue('mock-hashed-password');
generateJWTtoken = jest.fn().mockResolvedValue('mock-token');

test('should register new user', async () => {
  userModel.findOne = jest.fn().mockResolvedValue(null);
  userModel.create = jest.fn().mockResolvedValue(mockUser);

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

test('should return 400 error if user already exist', async () => {
  userModel.findOne = jest.fn().mockResolvedValue(mockUser);

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

  await expect(registerUser(req, res)).rejects.toThrow('User already exists');
  expect(res.status).toHaveBeenCalledWith(400);
});
