const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { isNotLoggedIn, isLoggedIn } = require('../middleware/auth');

router.post('/register', isNotLoggedIn, register);

router.post('/login', isNotLoggedIn, login);

router.get('/logout', isLoggedIn, logout);

module.exports = router;