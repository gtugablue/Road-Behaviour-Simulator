var express = require('express');
var db = require('./db');

var getCountries = function (callback) {
    db.query('SELECT countryName FROM Countries', [], function (error, results) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, results);
    });
};

var getEducationLevels = function (callback) {
    db.query('SELECT description FROM EducationLevels', [], function (error, results) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, results);
    });
};

var getEducationLevelID = function (description, callback) {
    db.query('SELECT idLevel FROM EducationLevels WHERE description = ?', [description], function (error, results) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, results);
    });
};

var getCountryID = function (name, callback) {
    db.query('SELECT idCountry FROM Countries WHERE countryName = ?', [name], function (error, results) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, results);
    });
};

var createDemographics = function (userID, birthday, gender, country, education, driver_license, driver_experience, callback) {
    var driver_exp = 0;
    if (typeof driver_experience !== undefined) {
        driver_exp = driver_experience;
    }

    db.query("INSERT INTO UsersDemographics VALUES (?, ?, ?, ?, ?, ?, ?)", [userID, birthday, driver_license ? 1 : 0,
        driver_exp, gender, country, education],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                callback(error, null);
                return;
            }
            callback(null, results);
        });
}

module.exports = {
    getCountries: getCountries,
    getEducationLevels: getEducationLevels,
    getEducationLevelID: getEducationLevelID,
    getCountryID: getCountryID,
    createDemographics: createDemographics
};
