var express = require('express');
var router = express.Router();

/* GET question page. */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'Express', id:req.params.id, layout: 'quiz' });
});

module.exports = router;
