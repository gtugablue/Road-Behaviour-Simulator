const express = require('express');
const connection = require('../database/db');
const router = express.Router();

router.use('/create', require('./create'));


module.exports = router;