var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var errors = require('./../utils/errors');
var ErrorMessage = errors.ErrorMessage;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: config.app_title,
    errors: errors.getErrors(),
    subtitle: 'A simulation tool for driver decision analysis',
    isAuthenticated: req.isAuthenticated(),
    noGlobalStyle: true,
    hideCustomFooter: true,
    customStyles: ['landing-page'],
    layout: 'layout'
  });
});

module.exports = router;
