const express = require('express');
const router = express.Router();
const { validateSignup } = require('../middleware/validateSignup');
const { signUp,login,logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate');

// Route for user signup
router.post('/signUp', validateSignup, signUp);
router.post('/login' ,login);
router.post('/logout', authenticate, logout);

module.exports = router;
