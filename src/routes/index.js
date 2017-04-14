var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: config.app_title,
    subtitle: 'A simulation tool for driver decision analysis',
    isAuthenticated: req.isAuthenticated()
  });
});

module.exports = router;
