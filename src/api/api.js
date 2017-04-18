const express = require('express');
const router = express.Router();

router.use('/quiz', require('./create/quiz'));

module.exports = router;