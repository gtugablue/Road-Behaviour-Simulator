var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Traffic Priority Simulator',
    subtitle: 'A simulation tool for driver decision analysis'
  });
});

module.exports = router;
