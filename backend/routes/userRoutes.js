const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  getCurrentUser,
} = require('../controllers/userController');

//register user
router.post('/', registerUser);

//login user
router.post('/login', loginUser);

//get current user
router.get('/current', getCurrentUser);

module.exports = router;
