const express = require('express');
const router = express.Router();
const { sendMessageToAI } = require('../controllers/chatController');
const verifyToken = require('../middleware/authMiddleware');

// ✅ Use this only
router.post('/', verifyToken, sendMessageToAI);

module.exports = router;
