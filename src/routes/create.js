var express = require('express');
var router = express.Router();

/* GET question page. */
router.post('/', function(req, res, next) {
  console.log(req.body['question']);
  res.render('basic', { questions: req.body['question'], layout: 'create' });

});

module.exports = router;
