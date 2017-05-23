var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');
var config = require('./../configuration/config');
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;
var db = require('./../database/db');
var users = require('./../database/users');
var quiz = require('./../database/quiz');
var demographicsDB = require('./../database/demographics');
var errors = require('./../utils/errors');
var ErrorMessage = errors.ErrorMessage;

/* GET dashboard page. */
router.get('/', function (req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if (!authenticated) {
        return;
    }

    demographicsDB.getCountries(function (error, results) {
        if (typeof results != undefined) {
            var countries = [];
            for (let country of results) {
                countries.push(country.countryName);
            }
            res.render('demographics', {
                layout: 'layout',
                title: config.app_title,
                errors: errors.getErrors(),
                user_id: req.user.id,
                user_name: req.user.displayName,
                user_firstname: req.user.displayName.split(" ")[0],
                customStyles: ['demographics'],
                countries: countries
            });
        } else {
            return;
        }
    });
});

module.exports = router;
