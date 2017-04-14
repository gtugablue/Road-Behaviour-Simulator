var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    auth.ensureAuthenticated(req, res, next);
    res.render('index', {
        title: 'Traffic Priority Simulator',
        subtitle: 'A simulation tool for driver decision analysis'
    });
});

module.exports = router;
