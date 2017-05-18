const express = require('express');
const router = express.Router();

router.use('/quiz', require('./quiz'));
router.use('/scene', require('./scene'));

module.exports = router;