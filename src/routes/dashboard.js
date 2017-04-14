var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');
var config = require('./../configuration/config');
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;

/* GET dashboard page. */
router.get('/', function (req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if (!authenticated) {
        return;
    }

    var page_breadcrumb = [
        new BreadcrumbItem("Home", "/"),
        new BreadcrumbItem("Dashboard")
    ];

    res.render('dashboard', {
        layout: 'layout',
        title: config.app_title,
        includeCustomStyle: true,
        breadcrumb: page_breadcrumb,
        user_name: req.user.displayName,
        user_firstname: req.user.displayName.split(" ")[0]
    });
});

module.exports = router;
