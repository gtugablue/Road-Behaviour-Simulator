var express = require('express');
var router = express.Router();

/* GET question page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'quiz' });
});

module.exports = router;
