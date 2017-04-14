const express = require('express');
const connection = require('../database/db');
const router = express.Router();

router.use('/question', require('./create/question'));
router.use('/quiz', require('./create/quiz'));


module.exports = router;