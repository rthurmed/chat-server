const express = require('express');
const { list } = require('../controllers/messageController');

const router = express.Router();

/* GET messages */
router.get('/', list);

module.exports = router;