var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');
var config = require('./../configuration/config');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if(!authenticated)
        return;

    res.render('dashboard', {
        layout: 'layout',
        title: config.app_title,
        includeCustomStyle: true,
        username: req.user.displayName
    });
});

module.exports = router;
