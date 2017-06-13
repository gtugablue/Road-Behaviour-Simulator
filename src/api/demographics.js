"use strict";
const express = require('express');
const router = express.Router();
const quiz = require('../database/quiz');
const json2csv = require('json2csv');
var Archiver = require('archiver');
var auth = require('./../utils/auth');
var demographicsDB = require('./../database/demographics');

var auth = require('../utils/auth');

router.post('/', function (req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if (!authenticated) {
        return;
    }

    var birthday = req.body.birthday;

    var gender = parseInt(req.body.gender);


    var country_str = req.body.country;
    var education_str = req.body.education;

    var driver_license = false;

    var driver_experience;
    if (typeof req.body.driver_license != 'undefined') {
        driver_license = true;
        driver_experience = req.body.driver_experience;
    }

    demographicsDB.getEducationLevelID(education_str, function (error, levelResult) {
        if (error != null) {
            console.log(error);
            return;
        }
        demographicsDB.getCountryID(country_str, function (error, countryResult) {
            if (error != null) {
                console.log(error);
                return;
            }
            var country = countryResult[0].idCountry;
            var education = levelResult[0].idLevel;

            demographicsDB.createDemographics(req.user.id, birthday, gender, country, education, driver_license, driver_experience,
                function (error, results) {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    res.redirect(req.session.redirectQuiz || "/dashboard");
                });
        });
    });

});

module.exports = router;