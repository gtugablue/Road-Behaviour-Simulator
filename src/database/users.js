var express = require('express');
var db = require('./db');

var createUser = function (id, name, callback) {

  db.query("INSERT INTO Users SET ?", {
    idUser: id,
    name: name
  }, function (error, results, fields) {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, results);
  })
};

var getUserByID = function (id, callback) {
  db.query("Select * from Users where idUser = ?", [id], function (error, results, fields) {
    if (error) {
      console.log('e' + error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

var getUserDemographicsByID = function (id, callback) {
  db.query("Select Users.idUser, Users.name, UsersDemographics.birthDate," +
    "UsersDemographics.hasDriversLicense, UsersDemographics.drivingExperienceYears, " +
    "UsersDemographics.gender, UsersDemographics.country from Users, UsersDemographics " +
    "where Users.idUser = 1471574252873656 AND UsersDemographics.idUser = Users.idUser", [id], function (error, results, fields) {
      if (error) {
        console.log('e' + error);
        callback(error, null);
        return;
      }
      callback(null, results);
    });
};

module.exports.createUser = createUser;
module.exports.getUserByID = getUserByID;
module.exports.getUserDemographicsByID = getUserDemographicsByID;