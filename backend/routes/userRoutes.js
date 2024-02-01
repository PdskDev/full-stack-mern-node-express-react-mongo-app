const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  getCurrentUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authHandler');

//register user
router.post('/', registerUser);

//login user
router.post('/login', loginUser);

//get current user
router.get('/current', protect, getCurrentUser);

module.exports = router;
