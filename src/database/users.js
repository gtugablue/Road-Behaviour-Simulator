var express = require('express');
var db = require('./db');

var createUser = function (id, name, callback) {

  db.query("INSERT INTO users SET ?", {
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
  db.query("Select * from users where idUser = ?", [id], function (error, results, fields) {
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