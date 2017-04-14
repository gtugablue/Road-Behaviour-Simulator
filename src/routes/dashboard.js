var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if(!authenticated)
        return;

    res.render('dashboard', {
        layout: 'layout',
        username: req.user.displayName
    });
});

module.exports = router;
