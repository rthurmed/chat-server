const express = require('express');
const verifyJWT = require('../security/jwt').verifyJWT
const { register, login, logout, me } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyJWT, logout);
router.get('/me', verifyJWT, me);

module.exports = router;