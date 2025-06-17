const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authMiddleware');
const { uploadVideo } = require('../controllers/uploadController');

router.post('/', auth, upload.single('video'), uploadVideo);

module.exports = router;
