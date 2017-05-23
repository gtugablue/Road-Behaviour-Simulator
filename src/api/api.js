const express = require('express');
const router = express.Router();

router.use('/quiz', require('./quiz'));
router.use('/scene', require('./scene'));
router.use('/demographics', require('./demographics'));

module.exports = router;