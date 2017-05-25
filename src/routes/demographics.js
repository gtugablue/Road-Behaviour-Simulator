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
var renderer = require('./../utils/renderer');

/* GET dashboard page. */
router.get('/', function (req, res, next) {
    if (!req.isAuthenticated()) {
        errors.addError(new ErrorMessage("Authentication", "You must be authenticated to access the requested page."));
        res.redirect('/');
        return;
    }

    users.getUserDemographicsByID(req.user.id, function (error, results) {
        if (results.length != 0) {
            errors.addError(new ErrorMessage("Demographics already filled.", "You can only fill the demographics form once."));
            res.redirect('/dashboard');
            return;
        }

        demographicsDB.getCountries(function (error, countriesResult) {
            if (typeof countriesResult != undefined) {
                demographicsDB.getEducationLevels(function (error, educationLevelsResult) {
                    if (typeof educationLevelsResult != undefined) {
                        var countries = [];
                        for (let country of countriesResult) {
                            countries.push(country.countryName);
                        }
                        var educationLevels = [];
                        for (let level of educationLevelsResult) {
                            educationLevels.push(level.description);
                        }

                        var page_breadcrumb = [
                            new BreadcrumbItem("Home", "/"),
                            new BreadcrumbItem("Demographics")
                        ];
                        renderer.render(res, 'demographics', {
                            user_id: req.user.id,
                            user_name: req.user.displayName,
                            user_firstname: req.user.displayName.split(" ")[0],
                            customStyles: ['demographics'],
                            countries: countries,
                            educationLevels: educationLevels
                        }, page_breadcrumb);
                    } else {
                        return;
                    }
                });
            } else {
                return;
            }
        });
    });
});

module.exports = router;
