var express = require('express');
var db = require('./db');

var getCountries = function (callback) {
    db.query('SELECT countryName FROM Countries', [], function (error, results) {
        callback(error, results);
    });
};

module.exports = {
    getCountries: getCountries
};
