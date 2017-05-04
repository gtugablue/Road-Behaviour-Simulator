const express = require('express');
const router = express.Router();

router.use('/quiz', require('./create/quiz'));
router.use('/scene', require('./create/scene'));

module.exports = router;