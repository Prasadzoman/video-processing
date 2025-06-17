const express = require('express');
const router = express.Router();
const { getVideoStatus } = require('../controllers/videoController'); // 🔁 FIXED PATH
const authenticate = require('../middlewares/authMiddleware');

router.get('/status/:videoId', authenticate, getVideoStatus);

module.exports = router;
