const express = require('express');
const router = express.Router();

router.use('/quiz', require('./create/quiz'));
router.use('/question', require('./create/question'));

module.exports = router;